import api from '../constants/api'
import { LOGIN_LS } from '../constants/localStorageConstants'
import { getLocalStorage } from '../utils/localStorage'

const token = getLocalStorage(LOGIN_LS)
const config = {
	headers: { Authorization: `Bearer ${token?.accessToken}` },
}

const userService = {
	getInfo() {
		if (!token) return null
		return api.get('/user/get-info', config)
	},

	changeInfo(data) {
		return api.put('/user/change-info', data, config)
	},
}

export default userService
