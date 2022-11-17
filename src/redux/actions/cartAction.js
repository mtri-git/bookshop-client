import {
	ADD_ITEM_TO_CART,
	DECREASE_ITEM_IN_CART,
	INCREASE_ITEM_IN_CART,
	REMOVE_ITEM_IN_CART,
} from '../../constants/cartConstants'
import { CART_LS } from '../../constants/localStorageConstants'
import { getLocalStorage, setLocalStorage } from '../../utils/localStorage'

export const addToCart = (product) => async (dispatch) => {
	if (typeof dispatch === 'function') {
		let cart = getLocalStorage(CART_LS)
		if (cart === null) cart = []
		// check duplicated product
		const duplicates = cart.filter(
			(cartItem) => cartItem._id === product._id
		)
		// console.log("Duplicated: ", duplicates, " ", product);
		if (duplicates.length === 0) {
			const productAdd = {
				...product,
				count: 1,
			}

			cart.push(productAdd)
			// save to local storage
			setLocalStorage(CART_LS, cart)
			dispatch({
				type: ADD_ITEM_TO_CART,
				payload: cart,
			})
		}
	}
}

export const removeFromCart = (productId) => async (dispatch) => {
	const cart = getLocalStorage(CART_LS)
	const updatedCart = cart.filter((cartItem) => cartItem._id !== productId)
	const deletedCount = cart.filter(
		(cartItem) => cartItem._id === productId
	).count
	console.log(deletedCount);
	setLocalStorage(CART_LS, updatedCart)

	dispatch({
		type: REMOVE_ITEM_IN_CART,
		payload: updatedCart,
	})
}

export const decreaseCartItemQuantity = (productId) => async (dispatch) => {
	const cart = getLocalStorage(CART_LS)
	const decreaseItem = cart.find((cartItem) => cartItem._id === productId)
	const index = cart.indexOf(decreaseItem)

	console.log('daata', decreaseItem)
	if (decreaseItem.count >= 1) {
		cart[index].count -= 1
		setLocalStorage(CART_LS, cart)
		dispatch({
			type: DECREASE_ITEM_IN_CART,
			payload: cart,
		})
	}
}

export const increaseCartItemQuantity = (productId) => async (dispatch) => {
	const cart = getLocalStorage(CART_LS)
	const increaseItem = cart.find((cartItem) => cartItem._id === productId)
	const index = cart.indexOf(increaseItem)
	if (increaseItem.count >= 1) {
		cart[index].count += 1
		setLocalStorage(CART_LS, cart)
		dispatch({
			type: INCREASE_ITEM_IN_CART,
			payload: cart,
		})
	}
}
