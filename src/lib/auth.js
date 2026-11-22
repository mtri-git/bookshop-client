// Client-side session: tokens live in localStorage and the browser calls the API
// directly. Pages that need the user are client-rendered (`ssr: false`), so none
// of this runs during SSR.
import { ApiError, apiFetch } from './api'

const ACCESS_KEY = 'bs_at'
const REFRESH_KEY = 'bs_rt'

const isBrowser = typeof window !== 'undefined'

function read(key) {
	if (!isBrowser) return null
	try {
		return window.localStorage.getItem(key)
	} catch {
		return null
	}
}

function write(key, value) {
	if (!isBrowser) return
	try {
		if (value) window.localStorage.setItem(key, value)
		else window.localStorage.removeItem(key)
	} catch {
		// storage blocked (private mode): the session just won't survive a reload
	}
}

export function setSession({ accessToken, refreshToken } = {}) {
	if (accessToken) write(ACCESS_KEY, accessToken)
	if (refreshToken) write(REFRESH_KEY, refreshToken)
}

export function clearSession() {
	write(ACCESS_KEY, null)
	write(REFRESH_KEY, null)
}

export const hasSession = () => Boolean(read(ACCESS_KEY) || read(REFRESH_KEY))

// Concurrent 401s share one refresh call
let refreshing = null
function refreshAccessToken() {
	const refreshToken = read(REFRESH_KEY)
	if (!refreshToken) return Promise.resolve(null)
	refreshing ??= apiFetch('/auth/token', { method: 'POST', body: { refreshToken } })
		.then(({ accessToken }) => {
			setSession({ accessToken })
			return accessToken
		})
		.catch((error) => {
			if (error.status === 401) clearSession()
			return null
		})
		.finally(() => {
			refreshing = null
		})
	return refreshing
}

// Calls an authenticated endpoint, refreshing the access token once on 401.
export async function authedFetch(path, options = {}) {
	const token = read(ACCESS_KEY) || (await refreshAccessToken())
	if (!token) throw new ApiError('Vui lòng đăng nhập để tiếp tục', 401)
	try {
		return await apiFetch(path, { ...options, token })
	} catch (error) {
		if (error.status !== 401) throw error
		const fresh = await refreshAccessToken()
		if (!fresh) throw error
		return apiFetch(path, { ...options, token: fresh })
	}
}

const str = (value, max = 200) => (typeof value === 'string' ? value.trim().slice(0, max) : '')

function requireFields(data, fields) {
	for (const field of fields) {
		if (!str(data?.[field], 500)) throw new Error('Vui lòng điền đầy đủ thông tin')
	}
}

async function fetchProfile() {
	const res = await authedFetch('/user/get-info')
	return res.data
}

async function startSession(tokens) {
	setSession(tokens)
	return fetchProfile()
}

// The signed-in user, or null. Never throws, so a failed profile call can't break a page.
export async function getMe() {
	if (!hasSession()) return null
	try {
		return await fetchProfile()
	} catch (error) {
		if (error.status === 401 || error.status === 404) clearSession()
		else console.error('getMe failed:', error.message)
		return null
	}
}

export async function login({ email, password }) {
	requireFields({ email, password }, ['email', 'password'])
	const res = await apiFetch('/auth/login', { method: 'POST', body: { email: str(email), password: String(password) } })
	return startSession(res.data)
}

export async function loginWithGoogle({ credential }) {
	requireFields({ credential }, ['credential'])
	const res = await apiFetch('/auth/google', { method: 'POST', body: { credential } })
	return startSession(res.data)
}

export async function register({ email, password, fullname }) {
	requireFields({ email, password, fullname }, ['email', 'password', 'fullname'])
	const body = { email: str(email), password: String(password), fullname: str(fullname, 100) }
	await apiFetch('/auth/register', { method: 'POST', body })
	// Sign the new user straight in
	return login({ email: body.email, password: body.password })
}

export function logout() {
	clearSession()
}

export async function updateProfile(data) {
	requireFields(data, ['fullname'])
	const avatarUrl = str(data.avatarUrl, 500)
	await authedFetch('/user/update-info', {
		method: 'PUT',
		body: {
			fullname: str(data.fullname, 100),
			phone: str(data.phone, 20),
			address: str(data.address, 300),
			postalCode: str(data.postalCode, 20),
			...(avatarUrl.startsWith('https://') ? { avatarUrl } : {}),
		},
	})
	return fetchProfile()
}

export async function changePassword({ oldPassword, newPassword }) {
	requireFields({ oldPassword, newPassword }, ['oldPassword', 'newPassword'])
	await authedFetch('/auth/change-password', {
		method: 'POST',
		body: { oldPassword: String(oldPassword), newPassword: String(newPassword) },
	})
	return { ok: true }
}

export async function getOrders() {
	const res = await authedFetch('/order')
	return res.data || []
}

export async function createOrder(data) {
	requireFields(data, ['address', 'phone', 'payment_type'])
	if (!Array.isArray(data.items) || data.items.length === 0) throw new Error('Chưa chọn sản phẩm nào')
	const res = await authedFetch('/order/create', {
		method: 'POST',
		body: {
			order_items: data.items.map((item) => ({ id: String(item.id), quantity: Number(item.quantity) })),
			payment_type: str(data.payment_type, 20),
			address: str(data.address, 300),
			phone: str(data.phone, 20),
			receiver: str(data.receiver, 100),
			voucher: str(data.voucher, 30) || undefined,
		},
	})
	return res.data
}
