import React, { useRef, useState } from 'react'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { GoogleLogin } from '@react-oauth/google'
import { Link } from '../components/Link'
import { REGISTER_PATH } from '../constants/path'
import { toast_error, toast_success } from '../utils/toastNotify'
import { useSetSessionUser } from '../hooks/useUser'
import { login, loginWithGoogle } from '../lib/auth'
import Icon from '../components/Icon'

const GOOGLE_ENABLED = Boolean(import.meta.env.VITE_GOOGLE_CLIENT_ID)

// Only allow redirects back into this site
export const safeRedirect = (value) => (typeof value === 'string' && value.startsWith('/') && !value.startsWith('//') ? value : '/')

export function GoogleButton({ text, onDone }) {
	if (!GOOGLE_ENABLED) return null

	const onSuccess = async ({ credential }) => {
		if (!credential) return toast_error('Không nhận được thông tin đăng nhập Google')
		try {
			// The ID token is verified server-side by the API
			const user = await loginWithGoogle({ credential })
			await onDone(user)
		} catch (error) {
			toast_error(error?.message || 'Đăng nhập Google thất bại')
		}
	}

	return (
		<>
			<div className="flex justify-center w-full">
				<GoogleLogin
					onSuccess={onSuccess}
					onError={() => toast_error('Đăng nhập Google thất bại')}
					shape="rectangular"
					size="large"
					text={text}
					locale="vi"
					width="100%"
				/>
			</div>
			<div className="flex items-center my-5">
				<div className="flex-grow border-t border-gray-200"></div>
				<span className="flex-shrink mx-3 text-gray-400 text-xs">hoặc email</span>
				<div className="flex-grow border-t border-gray-200"></div>
			</div>
		</>
	)
}

export default function Login() {
	const emailRef = useRef(null)
	const passwordRef = useRef(null)
	const [showPassword, setShowPassword] = useState(false)
	const [submitting, setSubmitting] = useState(false)
	const navigate = useNavigate()
	const search = useSearch({ strict: false })
	const setSessionUser = useSetSessionUser()

	const finish = async (user) => {
		await setSessionUser(user)
		toast_success(`Đăng nhập thành công! Chào ${user?.fullname || 'bạn'}`)
		navigate({ to: safeRedirect(search.redirect), replace: true })
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
			const user = await login({ email, password })
			await finish(user)
		} catch (error) {
			toast_error(error?.message || 'Email hoặc mật khẩu không chính xác')
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
					Đăng nhập tài khoản
				</h1>
				<p className="mt-1 text-center text-xs sm:text-sm text-gray-500">
					Chào mừng bạn quay lại với cộng đồng yêu sách
				</p>
			</div>

			<div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
				<div className="bg-white py-8 px-6 sm:px-10 rounded-xl border border-gray-200 shadow-sm">
					<GoogleButton text="signin_with" onDone={finish} />

					{/* Standard Form */}
					<form onSubmit={onSubmit} className="space-y-4">
						<div>
							<label className="block text-xs font-semibold text-gray-700 mb-1">
								Địa chỉ email
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

						<div>
							<label className="block text-xs font-semibold text-gray-700 mb-1">
								Mật khẩu
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
									<Icon name='lock' className="w-4 h-4" />
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
										<Icon name='eye-off' className="w-4 h-4" />
									) : (
										<Icon name='eye' className="w-4 h-4" />
									)}
								</button>
							</div>
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
							search={search.redirect ? { redirect: search.redirect } : undefined}
							className="text-orange-600 hover:underline font-bold"
						>
							Đăng ký ngay
						</Link>
					</div>
				</div>
			</div>

		</main>
	)
}
