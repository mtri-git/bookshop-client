import React, { useRef, useState } from 'react'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'
import { Link } from '../components/Link'
import { LOGIN_PATH } from '../constants/path'
import { toast_error, toast_success } from '../utils/toastNotify'
import { useSetSessionUser } from '../hooks/useUser'
import { register } from '../server/account.functions'
import { GoogleButton, safeRedirect } from './login'
import Icon from '../components/Icon'

export default function Register() {
	const navigate = useNavigate()
	const search = useSearch({ strict: false })
	const signUp = useServerFn(register)
	const setSessionUser = useSetSessionUser()
	const emailRef = useRef(null)
	const fullnameRef = useRef(null)
	const passwordRef = useRef(null)
	const rePasswordRef = useRef(null)
	const [agreeTerms, setAgreeTerms] = useState(false)
	const [submitting, setSubmitting] = useState(false)

	const finish = async (user) => {
		await setSessionUser(user)
		toast_success(`Chào mừng ${user?.fullname || 'bạn'} đến với BookShop!`)
		navigate({ to: safeRedirect(search.redirect), replace: true })
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
			const user = await signUp({ data: { email, fullname, password } })
			await finish(user)
		} catch (error) {
			toast_error(error?.message || 'Đăng ký không thành công. Email có thể đã được sử dụng.')
		} finally {
			setSubmitting(false)
		}
	}

	return (
		<main className="min-h-screen bg-gray-50/80 py-12 flex flex-col justify-center px-4 sm:px-6 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				{/* Brand Logo */}
				<Link to="/" className="flex justify-center items-center gap-2 mb-2">
					<div className="w-10 h-10 rounded-xl bg-orange-600 flex items-center justify-center text-white shadow-sm">
						<Icon name='book' className="w-6 h-6" />
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
					<GoogleButton text="signup_with" onDone={finish} />

					<form onSubmit={onSubmit} className="space-y-4">
						{/* Email */}
						<div>
							<label className="block text-xs font-semibold text-gray-700 mb-1">
								Địa chỉ email <span className="text-red-500">*</span>
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
									<Icon name='at-symbol' className="w-4 h-4" />
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
									<Icon name='user' className="w-4 h-4" />
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
									<Icon name='lock' className="w-4 h-4" />
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
									<Icon name='shield-check' className="w-4 h-4" />
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
							search={search.redirect ? { redirect: search.redirect } : undefined}
							className="text-orange-600 hover:underline font-bold"
						>
							Đăng nhập
						</Link>
					</div>
				</div>
			</div>

		</main>
	)
}
