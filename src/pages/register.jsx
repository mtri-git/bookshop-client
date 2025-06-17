import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { HOME_PATH, LOGIN_PATH } from '../constants/path'
import InputField from '../components/InputField'
import Footer from '../components/Footer'
import Button from '../components/Button'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { toast_error, toast_success } from '../utils/toastNotify'
import authService from '../services/authService'
import { v4 as uuidv4 } from 'uuid'
import { useEffect } from 'react'

export default function Register() {
	const navigate = useNavigate()	
	const emailRef = React.createRef()
	const fullnameRef = React.createRef()
	const passwordRef = React.createRef()
	const rePasswordRef = React.createRef()

	const register = async (data) => {
		await authService.register(data)
	}

	useEffect(()=>{
		document.title = 'BookShop - Đăng ký'
	}, [])

	const onSubmit = async() => {
		const value = {} // contain login data
		value.email = emailRef.current.value
		value.fullname = fullnameRef.current.value
		value.password = passwordRef.current.value
		value.rePassword = rePasswordRef.current.value

		if (!value.email) {
			toast_error('Thiếu email')
			return
		} else if (!value.password) {
			toast_error('Thiếu mật khẩu')
			return
		} else if (!value.fullname) {
			toast_error('Thiếu họ và tên')
			return
		} else if (!value.rePassword) {
			toast_error('Cần xác nhận mật khẩu')
			return
		} else if (value.rePassword !== value.password) {
			toast_error('Mật khẩu xác nhận không khớp')
			return
		}

		const mailRegex =
			/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
		if (!mailRegex.test(value.email)) {
			toast_error('Email sai định dạng')
			return
		}
		const { rePassword, ...registerData } = value
		try {
			const data = await authService.register(registerData)
			console.log('a', data)
			if (data) {
				toast_success('Đăng ký thành công')	
				// Sleep in js: https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
				await new Promise(r => setTimeout(r, 2000));
				navigate(LOGIN_PATH)
			}
			console.log(registerData)
		} catch (error) {
			console.log(error.response.data.message);
			toast_error(error.response.data.message)
		}
	}
	
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
						Đăng ký tài khoản
					</h1>
					<p className="mt-2 text-center text-sm text-gray-600">
						Tham gia cùng BookShop để khám phá thế giới sách
					</p>
				</div>

				<div className='sm:mx-auto sm:w-full sm:max-w-md'>
					<div className='bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100'>
						<div className="h-2 bg-gradient-to-r from-orange-500 to-red-500"></div>
						<div className="px-6 py-8 sm:px-10 sm:py-8">
							{/* Register Form */}
							<form className='space-y-6'>
								<div>
									<label htmlFor="email" className="block text-sm font-medium text-gray-700">
										Địa chỉ email
									</label>
									<div className="mt-1 relative rounded-md shadow-sm">
										<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
											<svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
												<path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
												<path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
											</svg>
										</div>
										<InputField
											key={uuidv4()}
											type='email'
											ref={emailRef}
											className='pl-10'
										>
											Địa chỉ email của bạn
										</InputField>
									</div>
								</div>

								<div>
									<label htmlFor="fullname" className="block text-sm font-medium text-gray-700">
										Họ và tên
									</label>
									<div className="mt-1 relative rounded-md shadow-sm">
										<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
											<svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
												<path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
											</svg>
										</div>
										<InputField 
											key={uuidv4()} 
											ref={fullnameRef}
											className='pl-10'
										>
											Họ và tên
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
											key={uuidv4()}
											type='password'
											ref={passwordRef}
											className='pl-10'
										>
											Mật khẩu
										</InputField>
									</div>
									<p className="mt-1 text-xs text-gray-500">Mật khẩu phải có ít nhất 6 ký tự</p>
								</div>

								<div>
									<label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
										Xác nhận mật khẩu
									</label>
									<div className="mt-1 relative rounded-md shadow-sm">
										<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
											<svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
												<path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
											</svg>
										</div>
										<InputField
											key={uuidv4()}
											type='password'
											ref={rePasswordRef}
											className='pl-10'
										>
											Xác nhận mật khẩu
										</InputField>
									</div>
								</div>

								<div className='flex items-center'>
									<input
										id="terms"
										name="terms"
										type="checkbox"
										className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded transition-all duration-200 cursor-pointer"
									/>
									<label htmlFor="terms" className="ml-2 block text-sm text-gray-700 cursor-pointer">
										Tôi đồng ý với <span className="text-orange-600 hover:text-orange-500 cursor-pointer">Điều khoản dịch vụ</span> và <span className="text-orange-600 hover:text-orange-500 cursor-pointer">Chính sách bảo mật</span>
									</label>
								</div>

								<div>
									<Button 
										type='button' 
										onClick={onSubmit}
										className='w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium'
									>
										<svg className="mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
											<path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
										</svg>
										Đăng ký
									</Button>
								</div>
							</form>

							<div className="mt-6">
								<div className="relative">
									<div className="absolute inset-0 flex items-center">
										<div className="w-full border-t border-gray-300"></div>
									</div>
									<div className="relative flex justify-center text-sm">
										<span className="px-2 bg-white text-gray-500">Đã có tài khoản?</span>
									</div>
								</div>

								<div className="mt-6">
									<Link
										to={LOGIN_PATH}
										className="w-full flex justify-center items-center px-4 py-3 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 hover:text-orange-500 transition-all duration-200"
									>
										<svg className="mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
											<path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
										</svg>
										Đăng nhập
									</Link>
								</div>
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
