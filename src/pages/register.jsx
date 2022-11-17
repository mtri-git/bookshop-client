import React from 'react'
import { Link } from 'react-router-dom'
import { HOME_PATH } from '../constants/path'
import InputField from '../components/InputField'
import Footer from '../components/Footer'
import Button from '../components/Button'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {toast_error, toast_success} from '../utils/toastNotify'
import authService from '../services/authService'
import { v4 as uuidv4 } from 'uuid'

export default function Register() {
	const emailRef = React.createRef()
	const fullnameRef = React.createRef()
	const passwordRef = React.createRef()
	const rePasswordRef = React.createRef()

	const register = async(data)=> {
		await authService.register(data)
	}

	const onSubmit = () => {
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
		}
		else if(value.rePassword !== value.password)
		{
			toast_error('Mật khẩu xác nhận không khớp')
			return
		}

		const mailRegex =
			/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
		if (!mailRegex.test(value.email)) {
			toast_error('Email sai định dạng')
			return
		}
		const {rePassword ,...registerData} = value
		const data = register(registerData)
		console.log(data);
		if(data)
			toast_success('👍 Wow so easy')
		console.log(registerData)
	}
	return (
		<>
			<main className='my-10 py-10'>
				<div className='px-6 h-full text-gray-800'>
					<h1 className='text-center pb-10 text-6xl font-bold text-orange-500'>
						Đăng nhập
					</h1>
					<div className='flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6'>
						<Link
							to={HOME_PATH}
							className='justify-self-center self-center grow-0 shrink-1'>
							<img src='/vite.svg' className='w-80' />
						</Link>
						<div className='xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0'>
							<form className='border-2 p-20'>
								<div className='flex flex-row items-center justify-center lg:justify-start'></div>
								{/* Email input */}
								<InputField key={uuidv4()} type='email' ref={emailRef}>
									Địa chỉ email của bạn
								</InputField>
								
								<InputField key={uuidv4()} ref={fullnameRef}>
									Họ và tên
								</InputField>

								{/* Password input */}
								<InputField key={uuidv4()} type='password' ref={passwordRef}>
									Mật khẩu
								</InputField>

								<InputField key={uuidv4()} type='password' ref={rePasswordRef}>
									Xác nhận mật khẩu
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
										Đăng ký
									</Button>
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
							</form>
						</div>
					</div>
				</div>
			</main>
			<Footer />
		</>
	)
}
