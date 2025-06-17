import React from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import InputField from '../components/InputField'
import Footer from '../components/Footer'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
	FORGET_PASSWORD_PATH,
	HOME_PATH,
	REGISTER_PATH,
} from '../constants/path'
import { toast_error, toast_success } from '../utils/toastNotify'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginAction } from '../redux/actions/authAction'
import { useSelectUser } from '../redux/selectors/useSelectUser'

export default function Login() {
	const emailRef = React.createRef()
	const passwordRef = React.createRef()
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const user = useSelectUser()
	// Có thể truyền callback vào component để lấy giá trị khi onChange => event.target.value
	// onEmailChange(ev){
	// 	value.email = ev.target.value
	// }

	useEffect(() => {
		document.title = 'Đăng nhập - BookShop'
	}, [])

	const onSubmit = async () => {
		const value = {} // contain login data
		value.email = emailRef.current.value
		value.password = passwordRef.current.value

		if (!value.email) {
			toast_error('Thiếu email')
			return
		} else if (!value.password) {
			toast_error('Thiếu password')
			return
		}
		const mailRegex =
			/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
		if (!mailRegex.test(value.email)) {
			toast_error('Email sai định dạng')
			return
		}
		// show error
		try {
			dispatch(loginAction(value))
			if(!user.isLoggedIn)
				toast_error('Email hoặc mật khẩu không đúng')

			if (user.isLoggedIn) {
				toast_success('Đăng nhập thành công')
				await new Promise(r => setTimeout(r, 2000))
				navigate(HOME_PATH)
			}

		} catch (error) {
			console.error(error)
			toast_error('Lỗi hệ thống')
		}
	}
	if(user.isLoggedIn)
		return(
		<Navigate to={HOME_PATH}/>
		)
	return (
		<>
			<main className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 flex flex-col justify-center sm:px-6 lg:px-8'>
				<div className="sm:mx-auto sm:w-full sm:max-w-md mb-8">
					<Link to={HOME_PATH} className="flex justify-center items-center">
						<img src='/vite.svg' className='w-20 h-20' alt="BookShop Logo" />
						<h2 className='text-3xl font-extrabold text-gray-800 ml-2'>
							BookShop
						</h2>
					</Link>
					<h1 className='mt-6 text-center text-4xl font-extrabold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent'>
						Đăng nhập
					</h1>
					<p className="mt-2 text-center text-sm text-gray-600">
						Chào mừng bạn trở lại với BookShop
					</p>
				</div>

				<div className='sm:mx-auto sm:w-full sm:max-w-md'>
					<div className='bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100'>
						<div className="h-2 bg-gradient-to-r from-orange-500 to-red-500"></div>
						<div className="px-6 py-8 sm:px-10 sm:py-8">
							{/* Social Login */}
							<div>
								<p className='text-sm font-medium text-gray-700 mb-3'>
									Đăng nhập với
								</p>
								<div className="flex justify-center items-center space-x-4">
									<button
										type='button'
										className='flex justify-center items-center px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all duration-200'>
										<svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
											<path
												fill="#EA4335"
												d="M12 5c1.6 0 3 .5 4.1 1.4l3-2.9C17 1.9 14.6 1 12 1S6.6 1.8 4.3 3.6L7.3 6.5C8.4 5.6 10.1 5 12 5z"
											/>
											<path
												fill="#4285F4"
												d="M20.3 12c0-.8-.1-1.7-.3-2.4H12v4.5h4.8c-.2 1.1-.8 2-1.7 2.7l3 2.3c1.7-1.6 2.7-4 2.7-6.8l-.5-.3z"
											/>
											<path
												fill="#FBBC05"
												d="M7.3 14.7l-3 2.3C5.6 19.1 8.6 21 12 21c3.2 0 6-1.1 7.9-3l-3-2.3c-1 .7-2.2 1.1-3.6 1.1-2.8 0-5.1-1.9-6-4.4H4.1v2.3h3.2z"
											/>
											<path
												fill="#34A853"
												d="M12 21c4.5 0 8.2-3.2 9-7.6L17.9 11c-.8 2.2-2.9 3.8-5.9 3.8-3.9 0-7-3.1-7-7s3.1-7 7-7c2.4 0 4.5 1.2 5.8 3.1L21 .5C18.9 2.3 15.7 0 12 0 5.4 0 0 5.4 0 12s5.4 12 12 12z"
											/>
										</svg>
										Google
									</button>
								</div>
							</div>

							<div className='flex items-center my-6'>
								<div className='flex-grow border-t border-gray-300'></div>
								<span className='flex-shrink mx-4 text-gray-600 text-sm'>Hoặc đăng nhập với</span>
								<div className='flex-grow border-t border-gray-300'></div>
							</div>

							{/* Login Form */}
							<form className='space-y-6'>
								<div>
									<label htmlFor="email" className="block text-sm font-medium text-gray-700">
										Email hoặc số điện thoại
									</label>
									<div className="mt-1 relative rounded-md shadow-sm">
										<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
											<svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
												<path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
												<path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
											</svg>
										</div>
										<InputField 
											type='email'
											ref={emailRef}
											className='pl-10'
										>
											Email hoặc số điện thoại
										</InputField>
									</div>
								</div>

								<div>
									<label htmlFor="password" className="block text-sm font-medium text-gray-700">
										Mật khẩu
									</label>
									<div className="mt-1 relative rounded-md shadow-sm">
										<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
											<svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
												<path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
											</svg>
										</div>
										<InputField 
											type='password'
											ref={passwordRef}
											className='pl-10'
										>
											Mật khẩu
										</InputField>
									</div>
								</div>

								<div className='flex items-center justify-between'>
									<div className='flex items-center'>
										<input
											id="remember-me"
											name="remember-me"
											type="checkbox"
											className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded transition-all duration-200 cursor-pointer"
										/>
										<label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 cursor-pointer">
											Ghi nhớ đăng nhập
										</label>
									</div>
									<Link
										to={FORGET_PASSWORD_PATH}
										className="text-sm font-medium text-orange-600 hover:text-orange-500 transition-all duration-200">
										Quên mật khẩu?
									</Link>
								</div>

								<div>
									<Button 
										type='button' 
										onClick={onSubmit}
										className='w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium'
									>
										<svg className="mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
											<path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
										</svg>
										Đăng nhập
									</Button>
								</div>
							</form>

							<div className="mt-6">
								<p className="text-center text-sm font-medium text-gray-700">
									Chưa có tài khoản?{" "}
									<Link
										to={REGISTER_PATH}
										className="text-orange-600 hover:text-orange-500 font-semibold transition-all duration-200">
										Đăng ký ngay
									</Link>
								</p>
							</div>
						</div>
					</div>
					{/* Toast Error */}
					<ToastContainer
						position='top-center'
						autoClose={3000}
						hideProgressBar
						newestOnTop={false}
						closeOnClick
						rtl
						pauseOnFocusLoss
						draggable
						pauseOnHover
						theme='colored'
					/>
				</div>
			</main>
			<Footer />
		</>
	)
}
