// Server-only session helpers. Tokens from the API live in httpOnly cookies on
// the storefront's own domain, so they are never readable by page scripts and
// SSR knows who the user is.
import { deleteCookie, getCookie, setCookie } from '@tanstack/react-start/server'
import { ApiError, apiFetch } from '../lib/api'

const ACCESS_COOKIE = 'bs_at'
const REFRESH_COOKIE = 'bs_rt'
const ACCESS_MAX_AGE = 60 * 60 * 24 // API ACCESS_TOKEN_LIFE (1d)
const REFRESH_MAX_AGE = 60 * 60 * 24 * 7 // API REFRESH_TOKEN_LIFE (7d)

const cookieOptions = () => ({
	httpOnly: true,
	sameSite: 'lax',
	secure: process.env.NODE_ENV === 'production',
	path: '/',
})

export function setSession({ accessToken, refreshToken }) {
	if (accessToken) setCookie(ACCESS_COOKIE, accessToken, { ...cookieOptions(), maxAge: ACCESS_MAX_AGE })
	if (refreshToken) setCookie(REFRESH_COOKIE, refreshToken, { ...cookieOptions(), maxAge: REFRESH_MAX_AGE })
}

export function clearSession() {
	deleteCookie(ACCESS_COOKIE, cookieOptions())
	deleteCookie(REFRESH_COOKIE, cookieOptions())
}

export const hasSession = () => Boolean(getCookie(ACCESS_COOKIE) || getCookie(REFRESH_COOKIE))

async function refreshAccessToken() {
	const refreshToken = getCookie(REFRESH_COOKIE)
	if (!refreshToken) return null
	try {
		const { accessToken } = await apiFetch('/auth/token', { method: 'POST', body: { refreshToken } })
		setSession({ accessToken })
		return accessToken
	} catch (error) {
		if (error.status === 401) clearSession()
		return null
	}
}

// Calls an authenticated API endpoint, refreshing the access token once on 401.
export async function authedFetch(path, options = {}) {
	const token = getCookie(ACCESS_COOKIE) || (await refreshAccessToken())
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

// Server function errors are serialized to the client; keep only the message.
export function toClientError(error) {
	return new Error(error?.message || 'Có lỗi xảy ra, vui lòng thử lại')
}
