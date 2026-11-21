import { combineReducers } from '@reduxjs/toolkit'
import cart from './cartReducer'
import auth from './authReducer'

export default combineReducers({
  cart,
  auth,
})
