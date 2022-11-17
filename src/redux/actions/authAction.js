import {
	LOGIN_FAIL,
	LOGIN_SUCCESS,
	LOGOUT,
} from '../../constants/authConstants'
import { LOGIN_LS, USER_LS } from '../../constants/localStorageConstants'
import authService from '../../services/authService'
import userService from '../../services/userService'
import { removeLocalStorage, setLocalStorage } from '../../utils/localStorage'

export const loginAction = (data) => async (dispatch) => {
	try {
		const res = await authService.login(data)
		setLocalStorage(LOGIN_LS, res.data.data)
		const user = await userService.getInfo()
		setLocalStorage(USER_LS, user.data)
		dispatch({
			type: LOGIN_SUCCESS,
			payload: {
				user: user.data,
			},
		})
	} catch (error) {
		console.log(error)
		dispatch({
			type: LOGIN_FAIL,
		})
	}
}

export const logoutAction = () => async (dispatch) => {
	removeLocalStorage(LOGIN_LS)
	removeLocalStorage(USER_LS)
	dispatch({
		type: LOGOUT,
		payload: {
			user: null,
			isLoggedIn: false,
		},
	})
}
