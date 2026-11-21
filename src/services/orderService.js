import api from '../constants/api'

const orderService = {
	getAllOrder() {
		return api.get('/order')
	},
	addNewOrder(data) {
		return api.post('/order/create', data)
	},
}

export default orderService
