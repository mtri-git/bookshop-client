import {
	ADD_ITEM_TO_CART,
	DECREASE_ITEM_IN_CART,
	INCREASE_ITEM_IN_CART,
	REMOVE_ITEM_IN_CART,
} from '../../constants/cartConstants'
import { CART_LS } from '../../constants/localStorageConstants'
import { getLocalStorage } from '../../utils/localStorage'

const cart = getLocalStorage(CART_LS)

const INIT_STATE = {
	cart: cart || []
}

export default function cartReducer(state = INIT_STATE, action) {
	switch (action.type) {
		case ADD_ITEM_TO_CART:
			return {
				cart: [...action.payload]
			}
		case REMOVE_ITEM_IN_CART:
			return {
				...state,
				cart: [...action.payload]
			}
		case INCREASE_ITEM_IN_CART:
			return {
				...state,
				cart: [...action.payload]
			}
		case DECREASE_ITEM_IN_CART:
			return {
				...state,
				cart: [...action.payload]
			}
		default:
			return state
	}
}
