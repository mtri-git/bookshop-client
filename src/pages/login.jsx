import React, { useRef, useState, useEffect } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
	FORGET_PASSWORD_PATH,
	HOME_PATH,
	REGISTER_PATH,
} from '../constants/path'
import { toast_error, toast_success } from '../utils/toastNotify'
import { useDispatch } from 'react-redux'
import { loginAction, loginWithGoogleAction } from '../redux/actions/authAction'
import { useSelectUser } from '../redux/selectors/useSelectUser'
import { GoogleLogin } from '@react-oauth/google'

export default function Login() {
	const emailRef = useRef(null)
	const passwordRef = useRef(null)
	const [showPassword, setShowPassword] = useState(false)
	const [submitting, setSubmitting] = useState(false)
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const user = useSelectUser()

	useEffect(() => {
		document.title = 'Đăng nhập - BookShop'
	}, [])

	const handleGoogleSuccess = async (credentialResponse) => {
		try {
			if (!credentialResponse?.credential) {
				toast_error('Không tìm thấy thông tin đăng nhập Google')
				return
			}
			// Decode JWT Payload safely
			const base64Url = credentialResponse.credential.split('.')[1]
			const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
			const jsonPayload = decodeURIComponent(
				atob(base64)
					.split('')
					.map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
					.join('')
			)
			const googleUser = JSON.parse(jsonPayload)

			await dispatch(loginWithGoogleAction(googleUser, credentialResponse.credential))
			toast_success(`Đăng nhập thành công! Chào ${googleUser.name || 'bạn'}`)
			setTimeout(() => {
				navigate(HOME_PATH)
			}, 800)
		} catch (error) {
			console.error('Google login error:', error)
			toast_error('Xử lý đăng nhập Google thất bại')
		}
	}

	const onSubmit = async (e) => {
		if (e) e.preventDefault()
		const email = emailRef.current?.value?.trim()
		const password = passwordRef.current?.value

		if (!email) {
			toast_error('Vui lòng nhập email hoặc số điện thoại')
			return
		}
		if (!password) {
			toast_error('Vui lòng nhập mật khẩu')
			return
		}

		const mailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
		if (!mailRegex.test(email)) {
			toast_error('Email không đúng định dạng')
			return
		}

		setSubmitting(true)
		try {
			await dispatch(loginAction({ email, password }))
			toast_success('Đăng nhập thành công!')
			setTimeout(() => {
				navigate(HOME_PATH)
			}, 1000)
		} catch (error) {
			toast_error(error?.response?.data?.message || 'Email hoặc mật khẩu không chính xác')
		} finally {
			setSubmitting(false)
		}
	}

	if (user.isLoggedIn) {
		return <Navigate to={HOME_PATH} />
	}

	return (
		<main className="min-h-screen bg-gray-50/80 py-12 flex flex-col justify-center px-4 sm:px-6 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				{/* Brand Logo */}
				<Link to={HOME_PATH} className="flex justify-center items-center gap-2 mb-2">
					<div className="w-10 h-10 rounded-xl bg-orange-600 flex items-center justify-center text-white shadow-sm">
						<svg className="w-6 h-6 fill-none stroke-current" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
						</svg>
					</div>
					<span className="text-2xl font-bold text-gray-900 tracking-tight">
						BookShop
					</span>
				</Link>

				<h1 className="text-center text-xl sm:text-2xl font-bold text-gray-900 mt-2">
					Đăng nhập tài khoản
				</h1>
				<p className="mt-1 text-center text-xs sm:text-sm text-gray-500">
					Chào mừng bạn quay lại với cộng đồng yêu sách
				</p>
			</div>

			<div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
				<div className="bg-white py-8 px-6 sm:px-10 rounded-xl border border-gray-200 shadow-sm">
					{/* React-OAuth/Google Button */}
					<div className="flex justify-center w-full">
						<GoogleLogin
							onSuccess={handleGoogleSuccess}
							onError={() => toast_error('Đăng nhập Google thất bại')}
							shape="rectangular"
							size="large"
							text="signin_with"
							locale="vi"
							width="100%"
						/>
					</div>

					<div className="flex items-center my-5">
						<div className="flex-grow border-t border-gray-200"></div>
						<span className="flex-shrink mx-3 text-gray-400 text-xs">hoặc email</span>
						<div className="flex-grow border-t border-gray-200"></div>
					</div>

					{/* Standard Form */}
					<form onSubmit={onSubmit} className="space-y-4">
						<div>
							<label className="block text-xs font-semibold text-gray-700 mb-1">
								Địa chỉ email
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
									<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
									</svg>
								</div>
								<input
									ref={emailRef}
									type="email"
									placeholder="name@example.com"
									required
									className="block w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 bg-white"
								/>
							</div>
						</div>

						<div>
							<label className="block text-xs font-semibold text-gray-700 mb-1">
								Mật khẩu
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
									<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
									</svg>
								</div>
								<input
									ref={passwordRef}
									type={showPassword ? 'text' : 'password'}
									placeholder="Nhập mật khẩu..."
									required
									className="block w-full pl-9 pr-10 py-2.5 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 bg-white"
								/>
								<button
									type="button"
									onClick={() => setShowPassword(!showPassword)}
									className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
								>
									{showPassword ? (
										<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
										</svg>
									) : (
										<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
										</svg>
									)}
								</button>
							</div>
						</div>

						<div className="flex items-center justify-between text-xs pt-1">
							<label className="flex items-center gap-1.5 cursor-pointer text-gray-600">
								<input
									type="checkbox"
									className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
								/>
								<span>Ghi nhớ đăng nhập</span>
							</label>
							<Link
								to={FORGET_PASSWORD_PATH}
								className="text-orange-600 hover:underline font-medium"
							>
								Quên mật khẩu?
							</Link>
						</div>

						<button
							type="submit"
							disabled={submitting}
							className="w-full mt-2 py-2.5 px-4 bg-orange-600 hover:bg-orange-700 active:scale-98 text-white font-semibold text-xs sm:text-sm rounded-lg transition shadow-sm disabled:opacity-60"
						>
							{submitting ? 'Đang xử lý...' : 'Đăng nhập'}
						</button>
					</form>

					<div className="mt-6 text-center text-xs text-gray-600">
						Chưa có tài khoản?{' '}
						<Link
							to={REGISTER_PATH}
							className="text-orange-600 hover:underline font-bold"
						>
							Đăng ký ngay
						</Link>
					</div>
				</div>
			</div>

			<ToastContainer position="top-center" autoClose={2500} hideProgressBar theme="light" />
		</main>
	)
}
