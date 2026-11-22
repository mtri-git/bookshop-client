// Thin fetch wrapper for the BookShop API. Isomorphic: used by route loaders
// (server during SSR, browser during client navigation) and by server functions.
export const API_URL = (import.meta.env.VITE_HOST || 'https://bookshop-api.onrender.com').replace(/\/$/, '')

export class ApiError extends Error {
	constructor(message, status, data) {
		super(message)
		this.name = 'ApiError'
		this.status = status
		this.data = data
	}
}

export async function apiFetch(path, { method = 'GET', body, token, timeout = 15000 } = {}) {
	const headers = {}
	if (body !== undefined) headers['Content-Type'] = 'application/json'
	if (token) headers.Authorization = `Bearer ${token}`

	let res
	try {
		res = await fetch(`${API_URL}${path}`, {
			method,
			headers,
			body: body !== undefined ? JSON.stringify(body) : undefined,
			signal: AbortSignal.timeout(timeout),
		})
	} catch (error) {
		throw new ApiError('Không kết nối được máy chủ, vui lòng thử lại', 0, { cause: error?.message })
	}

	const data = await res.json().catch(() => null)
	if (!res.ok) {
		throw new ApiError(data?.message || `Yêu cầu thất bại (${res.status})`, res.status, data)
	}
	return data
}
