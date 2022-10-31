import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import InputField from '../components/InputField'
import Footer from '../components/Footer'
import { ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { HOME_PATH, REGISTER_PATH } from '../constants/path'
import {toast_error, toast_success} from '../utils/toastNotify'

export default function Login() {
	const emailRef = React.createRef()
	const passwordRef = React.createRef()


	const onSubmit = () => {
		const value = {} // contain login data
		value.email = emailRef.current.value
		value.password = passwordRef.current.value
		console.log(value)

		if (!value.email) {
			toast_error('😶 🌫Thiếu email')
			return
		} else if (!value.password) {
			toast_error('😶 🌫Thiếu password')
			return
		}
		const mailRegex =
			/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
		if (!mailRegex.test(value.email)) {
			toast_error('😶 🌫Email sai định dạng')
			return
		}
		// show error
		toast_success('👍 Wow so easy!')
	}

	return (
		<>
			<main className='my-10 py-10'>
				<h1 className='text-center pb-10 text-6xl font-bold text-orange-500'>Đăng nhập</h1>
				<div className='h-full px-6 text-gray-800'>
					<div className='flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6'>
						<Link
							to={HOME_PATH}
							className='justify-self-center self-center grow-0 shrink-1'>
							<img src='/vite.svg' className='w-80' />
							<h2 className='text-2xl text-center pt-2 text-gray-500 font-bold'>
								BookShop
							</h2>
						</Link>
						<div className='xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0'>
							<form>
								<div className='flex flex-row items-center justify-center lg:justify-start'>
									<p className='text-lg mb-0 mr-4'>
										Đăng nhập với
									</p>
									<button
										type='button'
										data-mdb-ripple='true'
										data-mdb-ripple-color='light'
										className='inline-block p-3 bg-orange-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-orange-700 focus:bg-orange-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-orange-800 active:shadow-lg transition duration-150 ease-in-out mx-1'>
										{/* Facebook */}
										<svg
											xmlns='http://www.w3.org/2000/svg'
											viewBox='0 0 320 512'
											className='w-4 h-4'>
											{/*! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. */}
											<path
												fill='currentColor'
												d='M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z'
											/>
										</svg>
									</button>
								</div>
								<div className='flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5'>
									<p className='text-center font-semibold mx-4 mb-0'>
										Or
									</p>
								</div>
								{/* Email input */}
								<InputField ref={emailRef}>
									Email hoặc số điện thoại
								</InputField>

								{/* Password input */}
								<InputField type='password' ref={passwordRef}>
									Mật khẩu
								</InputField>

								<div className='flex justify-between items-center mb-6'>
									<div className='form-group form-check'>
										<input
											type='checkbox'
											className='form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-orange-600 checked:border-orange-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer'
											id='exampleCheck2'
										/>
										<label
											className='form-check-label inline-block text-gray-800'
											htmlFor='exampleCheck2'>
											Remember me
										</label>
									</div>
									<a href='#!' className='text-gray-800'>
										Forgot password?
									</a>
								</div>
								<div className='text-center lg:text-left'>
									<Button type='button' onClick={onSubmit}>
										Đăng nhập
									</Button>
									<p className='text-sm font-semibold mt-2 pt-1 mb-0'>
										Chưa có tài khoản?
										<Link
											to={REGISTER_PATH}
											className='text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out pl-2'>
											Đăng ký ngay
										</Link>
									</p>
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
							</form>
						</div>
					</div>
				</div>
			</main>
      <Footer/>
		</>
	)
}
