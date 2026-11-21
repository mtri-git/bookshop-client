import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { HOME_PATH, LOGIN_PATH } from '../constants/path'
import Icon from '../components/Icon'

export default function ForgetPassword() {
	const emailRef = useRef(null)
	const [step, setStep] = useState('email') // 'email' | 'otp' | 'done'
	const [otp, setOtp] = useState(['', '', '', '', '', ''])
	const [submitting, setSubmitting] = useState(false)

	const handleEmailSubmit = async (e) => {
		e.preventDefault()
		const email = emailRef.current?.value?.trim()
		if (!email) return
		setSubmitting(true)
		// Simulate API delay
		await new Promise((r) => setTimeout(r, 1000))
		setSubmitting(false)
		setStep('otp')
	}

	const handleOtpChange = (idx, val) => {
		const newOtp = [...otp]
		newOtp[idx] = val.slice(-1)
		setOtp(newOtp)
		if (val && idx < 5) {
			document.getElementById(`otp-${idx + 1}`)?.focus()
		}
	}

	const handleOtpSubmit = async (e) => {
		e.preventDefault()
		setSubmitting(true)
		await new Promise((r) => setTimeout(r, 800))
		setSubmitting(false)
		setStep('done')
	}

	return (
		<main className="min-h-screen bg-gray-50/80 py-12 flex flex-col justify-center px-4 sm:px-6 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				{/* Logo */}
				<Link to={HOME_PATH} className="flex justify-center items-center gap-2 mb-2">
					<div className="w-10 h-10 rounded-xl bg-orange-600 flex items-center justify-center text-white shadow-sm">
						<Icon name='book' className="w-6 h-6" />
					</div>
					<span className="text-2xl font-bold text-gray-900 tracking-tight">BookShop</span>
				</Link>

				<h1 className="text-center text-xl sm:text-2xl font-bold text-gray-900 mt-2">
					{step === 'done' ? 'Đặt lại mật khẩu thành công' : 'Quên mật khẩu'}
				</h1>
				<p className="mt-1 text-center text-xs sm:text-sm text-gray-500">
					{step === 'email' && 'Nhập email để nhận mã OTP đặt lại mật khẩu'}
					{step === 'otp' && `Mã OTP đã được gửi đến email của bạn`}
					{step === 'done' && 'Mật khẩu đã được đặt lại. Hãy đăng nhập lại.'}
				</p>
			</div>

			<div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
				<div className="bg-white py-8 px-6 sm:px-10 rounded-xl border border-gray-200 shadow-sm">
					{/* Step indicator */}
					<div className="flex items-center justify-center gap-3 mb-6">
						{['Email', 'OTP', 'Xong'].map((s, i) => (
							<React.Fragment key={i}>
								<div className={`flex items-center gap-1.5 text-xs font-semibold ${
									(step === 'email' && i === 0) || (step === 'otp' && i === 1) || (step === 'done' && i === 2)
										? 'text-orange-600'
										: i < ['email', 'otp', 'done'].indexOf(step)
										? 'text-emerald-600'
										: 'text-gray-400'
								}`}>
									<div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
										(step === 'email' && i === 0) || (step === 'otp' && i === 1) || (step === 'done' && i === 2)
											? 'bg-orange-600 text-white'
											: i < ['email', 'otp', 'done'].indexOf(step)
											? 'bg-emerald-600 text-white'
											: 'bg-gray-200 text-gray-500'
									}`}>
										{i + 1}
									</div>
									<span className="hidden sm:inline">{s}</span>
								</div>
								{i < 2 && <div className={`flex-1 h-px max-w-[40px] ${i < ['email', 'otp', 'done'].indexOf(step) ? 'bg-emerald-400' : 'bg-gray-200'}`} />}
							</React.Fragment>
						))}
					</div>

					{step === 'email' && (
						<form onSubmit={handleEmailSubmit} className="space-y-5">
							<div>
								<label className="block text-xs font-semibold text-gray-700 mb-1">
									Địa chỉ email
								</label>
								<div className="relative">
									<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
										<Icon name='mail' className="w-4 h-4" />
									</div>
									<input
										ref={emailRef}
										type="email"
										placeholder="name@example.com"
										required
										className="block w-full pl-9 pr-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 bg-white"
									/>
								</div>
							</div>

							<button
								type="submit"
								disabled={submitting}
								className="w-full py-2.5 px-4 bg-orange-600 hover:bg-orange-700 text-white font-semibold text-sm rounded-lg transition shadow-sm disabled:opacity-60 flex items-center justify-center gap-2"
							>
								{submitting ? (
									<>
										<Icon name='spinner' className="animate-spin w-4 h-4" />
										<span>Đang gửi...</span>
									</>
								) : (
									'Gửi mã OTP'
								)}
							</button>
						</form>
					)}

					{step === 'otp' && (
						<form onSubmit={handleOtpSubmit} className="space-y-5">
							<div>
								<label className="block text-xs font-semibold text-gray-700 mb-3 text-center">
									Nhập mã OTP 6 chữ số
								</label>
								<div className="flex justify-center gap-2">
									{otp.map((val, idx) => (
										<input
											key={idx}
											id={`otp-${idx}`}
											type="text"
											inputMode="numeric"
											maxLength={1}
											value={val}
											onChange={(e) => handleOtpChange(idx, e.target.value)}
											className="w-10 h-12 text-center text-lg font-bold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-500 bg-white transition"
										/>
									))}
								</div>
							</div>

							<button
								type="submit"
								disabled={submitting || otp.some((v) => !v)}
								className="w-full py-2.5 px-4 bg-orange-600 hover:bg-orange-700 text-white font-semibold text-sm rounded-lg transition shadow-sm disabled:opacity-60 flex items-center justify-center gap-2"
							>
								{submitting ? 'Đang xác nhận...' : 'Xác nhận OTP'}
							</button>

							<button
								type="button"
								onClick={() => setStep('email')}
								className="w-full text-xs text-gray-500 hover:text-orange-600 transition"
							>
								← Nhập lại email
							</button>
						</form>
					)}

					{step === 'done' && (
						<div className="text-center space-y-5">
							<div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
								<Icon name='check' className="w-8 h-8 text-emerald-600" strokeWidth={1.5} />
							</div>
							<p className="text-sm text-gray-600">
								Mật khẩu tạm thời đã được gửi vào email. Vui lòng đăng nhập và đổi ngay.
							</p>
							<Link
								to={LOGIN_PATH}
								className="inline-block w-full py-2.5 px-4 bg-orange-600 hover:bg-orange-700 text-white font-semibold text-sm rounded-lg transition shadow-sm"
							>
								Đăng nhập ngay
							</Link>
						</div>
					)}

					{step !== 'done' && (
						<div className="mt-6 text-center text-xs text-gray-600">
							Nhớ mật khẩu rồi?{' '}
							<Link to={LOGIN_PATH} className="text-orange-600 hover:underline font-bold">
								Đăng nhập
							</Link>
						</div>
					)}
				</div>
			</div>
		</main>
	)
}
