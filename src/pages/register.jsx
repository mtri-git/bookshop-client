import React, { useRef, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { HOME_PATH, LOGIN_PATH } from '../constants/path'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { toast_error, toast_success } from '../utils/toastNotify'
import authService from '../services/authService'
import { useDispatch } from 'react-redux'
import { loginWithGoogleAction } from '../redux/actions/authAction'
import { GoogleLogin } from '@react-oauth/google'

export default function Register() {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const emailRef = useRef(null)
	const fullnameRef = useRef(null)
	const passwordRef = useRef(null)
	const rePasswordRef = useRef(null)
	const [agreeTerms, setAgreeTerms] = useState(false)
	const [submitting, setSubmitting] = useState(false)

	useEffect(() => {
		document.title = 'Đăng ký - BookShop'
	}, [])

	const handleGoogleSuccess = async (credentialResponse) => {
		try {
			if (!credentialResponse?.credential) {
				toast_error('Không tìm thấy thông tin đăng nhập Google')
				return
			}
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
			toast_success(`Đăng ký Google thành công! Chào ${googleUser.name || 'bạn'}`)
			setTimeout(() => {
				navigate(HOME_PATH)
			}, 800)
		} catch (error) {
			console.error('Google register error:', error)
			toast_error('Xử lý đăng ký với Google thất bại')
		}
	}

	const onSubmit = async (e) => {
		if (e) e.preventDefault()
		const email = emailRef.current?.value?.trim()
		const fullname = fullnameRef.current?.value?.trim()
		const password = passwordRef.current?.value
		const rePassword = rePasswordRef.current?.value

		if (!email) {
			toast_error('Vui lòng nhập email')
			return
		}
		if (!fullname) {
			toast_error('Vui lòng nhập họ và tên')
			return
		}
		if (!password) {
			toast_error('Vui lòng nhập mật khẩu')
			return
		}
		if (password.length < 6) {
			toast_error('Mật khẩu phải có ít nhất 6 ký tự')
			return
		}
		if (!rePassword) {
			toast_error('Vui lòng xác nhận mật khẩu')
			return
		}
		if (password !== rePassword) {
			toast_error('Mật khẩu xác nhận không khớp')
			return
		}
		if (!agreeTerms) {
			toast_error('Vui lòng đồng ý với Điều khoản dịch vụ')
			return
		}

		const mailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
		if (!mailRegex.test(email)) {
			toast_error('Email không đúng định dạng')
			return
		}

		setSubmitting(true)
		try {
			const data = await authService.register({ email, fullname, password })
			if (data) {
				toast_success('Đăng ký thành công! Đang chuyển hướng...')
				setTimeout(() => {
					navigate(LOGIN_PATH)
				}, 1200)
			}
		} catch (error) {
			toast_error(error?.response?.data?.message || 'Đăng ký không thành công. Email có thể đã được sử dụng.')
		} finally {
			setSubmitting(false)
		}
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
					Tạo tài khoản mới
				</h1>
				<p className="mt-1 text-center text-xs sm:text-sm text-gray-500">
					Khám phá hàng ngàn tựa sách hấp dẫn cùng ưu đãi thành viên
				</p>
			</div>

			<div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
				<div className="bg-white py-8 px-6 sm:px-10 rounded-xl border border-gray-200 shadow-sm">
					{/* Google Sign-in */}
					<div className="flex justify-center w-full">
						<GoogleLogin
							onSuccess={handleGoogleSuccess}
							onError={() => toast_error('Đăng ký với Google thất bại')}
							shape="rectangular"
							size="large"
							text="signup_with"
							locale="vi"
							width="100%"
						/>
					</div>

					<div className="flex items-center my-5">
						<div className="flex-grow border-t border-gray-200"></div>
						<span className="flex-shrink mx-3 text-gray-400 text-xs">hoặc đăng ký bằng email</span>
						<div className="flex-grow border-t border-gray-200"></div>
					</div>

					<form onSubmit={onSubmit} className="space-y-4">
						{/* Email */}
						<div>
							<label className="block text-xs font-semibold text-gray-700 mb-1">
								Địa chỉ email <span className="text-red-500">*</span>
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

						{/* Fullname */}
						<div>
							<label className="block text-xs font-semibold text-gray-700 mb-1">
								Họ và tên <span className="text-red-500">*</span>
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
									<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
									</svg>
								</div>
								<input
									ref={fullnameRef}
									type="text"
									placeholder="Nguyễn Văn A"
									required
									className="block w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 bg-white"
								/>
							</div>
						</div>

						{/* Password */}
						<div>
							<label className="block text-xs font-semibold text-gray-700 mb-1">
								Mật khẩu <span className="text-red-500">*</span>
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
									<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
									</svg>
								</div>
								<input
									ref={passwordRef}
									type="password"
									placeholder="Tối thiểu 6 ký tự"
									required
									className="block w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 bg-white"
								/>
							</div>
						</div>

						{/* Confirm Password */}
						<div>
							<label className="block text-xs font-semibold text-gray-700 mb-1">
								Xác nhận mật khẩu <span className="text-red-500">*</span>
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
									<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
									</svg>
								</div>
								<input
									ref={rePasswordRef}
									type="password"
									placeholder="Nhập lại mật khẩu"
									required
									className="block w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 bg-white"
								/>
							</div>
						</div>

						{/* Terms */}
						<div className="flex items-start text-xs pt-1">
							<input
								id="terms"
								type="checkbox"
								checked={agreeTerms}
								onChange={(e) => setAgreeTerms(e.target.checked)}
								className="mt-0.5 rounded border-gray-300 text-orange-600 focus:ring-orange-500 cursor-pointer"
							/>
							<label htmlFor="terms" className="ml-2 text-gray-600 cursor-pointer">
								Tôi đồng ý với <span className="text-orange-600 hover:underline">Điều khoản dịch vụ</span> và <span className="text-orange-600 hover:underline">Chính sách bảo mật</span>
							</label>
						</div>

						{/* Submit */}
						<button
							type="submit"
							disabled={submitting}
							className="w-full mt-2 py-2.5 px-4 bg-orange-600 hover:bg-orange-700 active:scale-98 text-white font-semibold text-xs sm:text-sm rounded-lg transition shadow-sm disabled:opacity-60"
						>
							{submitting ? 'Đang đăng ký...' : 'Đăng ký'}
						</button>
					</form>

					<div className="mt-6 text-center text-xs text-gray-600">
						Đã có tài khoản?{' '}
						<Link
							to={LOGIN_PATH}
							className="text-orange-600 hover:underline font-bold"
						>
							Đăng nhập
						</Link>
					</div>
				</div>
			</div>

			<ToastContainer position="top-center" autoClose={2500} hideProgressBar theme="light" />
		</main>
	)
}
