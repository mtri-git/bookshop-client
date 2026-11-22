// Server functions for everything that needs the user's session. Each handler
// enforces auth itself (via authedFetch); route guards are only for UX.
import { createServerFn } from '@tanstack/react-start'
import { apiFetch } from '../lib/api'
import { authedFetch, clearSession, hasSession, setSession, toClientError } from './session.server'

const str = (value, max = 200) => (typeof value === 'string' ? value.trim().slice(0, max) : '')

const requireFields = (data, fields) => {
	if (!data || typeof data !== 'object') throw new Error('Dữ liệu không hợp lệ')
	for (const field of fields) {
		if (!str(data[field], 500)) throw new Error('Vui lòng điền đầy đủ thông tin')
	}
	return data
}

async function fetchProfile() {
	const res = await authedFetch('/user/get-info')
	return res.data
}

// Right after sign-in the new cookies are only on the response, not the
// incoming request, so use the fresh token directly.
async function startSession(tokens) {
	setSession(tokens)
	const res = await apiFetch('/user/get-info', { token: tokens.accessToken })
	return res.data
}

export const getMe = createServerFn({ method: 'GET' }).handler(async () => {
	if (!hasSession()) return null
	try {
		return await fetchProfile()
	} catch (error) {
		if (error.status === 401 || error.status === 404) clearSession()
		else console.error('getMe failed:', error.message)
		// Never break page rendering because the profile call failed
		return null
	}
})

export const login = createServerFn({ method: 'POST' })
	.validator((data) => requireFields(data, ['email', 'password']))
	.handler(async ({ data }) => {
		try {
			const res = await apiFetch('/auth/login', {
				method: 'POST',
				body: { email: str(data.email), password: String(data.password) },
			})
			return await startSession(res.data)
		} catch (error) {
			throw toClientError(error)
		}
	})

export const loginWithGoogle = createServerFn({ method: 'POST' })
	.validator((data) => requireFields(data, ['credential']))
	.handler(async ({ data }) => {
		try {
			const res = await apiFetch('/auth/google', { method: 'POST', body: { credential: data.credential } })
			return await startSession(res.data)
		} catch (error) {
			throw toClientError(error)
		}
	})

export const register = createServerFn({ method: 'POST' })
	.validator((data) => requireFields(data, ['email', 'password', 'fullname']))
	.handler(async ({ data }) => {
		try {
			const body = { email: str(data.email), password: String(data.password), fullname: str(data.fullname, 100) }
			await apiFetch('/auth/register', { method: 'POST', body })
			// Sign the new user straight in
			const res = await apiFetch('/auth/login', { method: 'POST', body: { email: body.email, password: body.password } })
			return await startSession(res.data)
		} catch (error) {
			throw toClientError(error)
		}
	})

export const logout = createServerFn({ method: 'POST' }).handler(async () => {
	clearSession()
	return null
})

export const updateProfile = createServerFn({ method: 'POST' })
	.validator((data) => {
		requireFields(data, ['fullname'])
		return {
			fullname: str(data.fullname, 100),
			phone: str(data.phone, 20),
			address: str(data.address, 300),
			postalCode: str(data.postalCode, 20),
			...(str(data.avatarUrl, 500).startsWith('https://') ? { avatarUrl: str(data.avatarUrl, 500) } : {}),
		}
	})
	.handler(async ({ data }) => {
		try {
			await authedFetch('/user/update-info', { method: 'PUT', body: data })
			return await fetchProfile()
		} catch (error) {
			throw toClientError(error)
		}
	})

export const changePassword = createServerFn({ method: 'POST' })
	.validator((data) => requireFields(data, ['oldPassword', 'newPassword']))
	.handler(async ({ data }) => {
		try {
			await authedFetch('/auth/change-password', {
				method: 'POST',
				body: { oldPassword: String(data.oldPassword), newPassword: String(data.newPassword) },
			})
			return { ok: true }
		} catch (error) {
			throw toClientError(error)
		}
	})

export const getOrders = createServerFn({ method: 'GET' }).handler(async () => {
	try {
		const res = await authedFetch('/order')
		return res.data || []
	} catch (error) {
		throw toClientError(error)
	}
})

export const createOrder = createServerFn({ method: 'POST' })
	.validator((data) => {
		requireFields(data, ['address', 'phone', 'payment_type'])
		if (!Array.isArray(data.items) || data.items.length === 0) throw new Error('Chưa chọn sản phẩm nào')
		return {
			order_items: data.items.map((item) => ({ id: String(item.id), quantity: Number(item.quantity) })),
			payment_type: str(data.payment_type, 20),
			address: str(data.address, 300),
			phone: str(data.phone, 20),
			receiver: str(data.receiver, 100),
			voucher: str(data.voucher, 30) || undefined,
		}
	})
	.handler(async ({ data }) => {
		try {
			const res = await authedFetch('/order/create', { method: 'POST', body: data })
			return res.data
		} catch (error) {
			throw toClientError(error)
		}
	})
