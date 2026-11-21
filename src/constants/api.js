import axios from 'axios'
import { LOGIN_LS } from './localStorageConstants'
import { getLocalStorage } from '../utils/localStorage'

const api = axios.create({
	baseURL: import.meta.env.VITE_HOST || 'https://bookshop-api.onrender.com',
	timeout: 15000,
	headers: {
		'Content-Type': 'application/json',
	},
})

// Request interceptor: dynamically inject token on each outgoing call
api.interceptors.request.use(
	(config) => {
		try {
			const token = getLocalStorage(LOGIN_LS)
			if (token?.accessToken) {
				config.headers = config.headers || {}
				config.headers.Authorization = `Bearer ${token.accessToken}`
			}
		} catch (e) {
			// ignore localStorage read error in safe mode
		}
		return config
	},
	(error) => Promise.reject(error)
)

// Response interceptor: handle unauthorized and log errors
api.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.status === 401) {
			console.warn('API Warning: Session expired or unauthorized')
		}
		return Promise.reject(error)
	}
)

export default api
