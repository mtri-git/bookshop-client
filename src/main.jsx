import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './redux/reducers'
import { GoogleOAuthProvider } from '@react-oauth/google'

// configureStore includes redux-thunk and Redux DevTools by default
const store = configureStore({ reducer: rootReducer })

const GOOGLE_CLIENT_ID =
  import.meta.env.VITE_GOOGLE_CLIENT_ID ||
  '1085347285194-dummygoogleclientid.apps.googleusercontent.com';

ReactDOM.createRoot(document.getElementById('root')).render(
	<BrowserRouter>
		<Provider store={store}>
			<GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
				<App />
			</GoogleOAuthProvider>
		</Provider>
	</BrowserRouter>
)
