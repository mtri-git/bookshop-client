import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk'
import { GoogleOAuthProvider } from '@react-oauth/google'

const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||
  compose;
  
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

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
