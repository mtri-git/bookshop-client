import api from '../constants/api'
import { LOGIN_LS } from '../constants/localStorageConstants'
import { getLocalStorage } from '../utils/localStorage'

const userService = {
	getInfo() {
		const token = getLocalStorage(LOGIN_LS)
		if (!token) return null
		console.log('Token:', token.accessToken)
		return api.get('/user/get-info', {
			headers: { Authorization: `Bearer ${token.accessToken}` },
		})
	},

	changeInfo(data) {
		return api.post('/user/change-info', data)
	},
}

export default userService
