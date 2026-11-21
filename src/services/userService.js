import api from '../constants/api'

const userService = {
	getInfo() {
		return api.get('/user/get-info')
	},

	changeInfo(data) {
		return api.put('/user/update-info', data)
	},
}

export default userService
