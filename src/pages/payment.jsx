import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { CART_PATH, PAYMENT_HISTORY_PATH } from '../constants/path'
import { useSelectUser } from '../redux/selectors/useSelectUser'
import { useCart } from '../redux/selectors/useCart'
import { formatPrice } from '../utils/format'
import { useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { newOrder } from '../redux/actions/orderAction'
import { DialogProvider, useDialog } from '../hooks/useDialog'
import { v4 as uuidv4 } from 'uuid'
import { toast_error, toast_success } from '../utils/toastNotify'

const PAYMENT_METHODS = [
	{
		value: 'Cash',
		label: 'Thanh toán khi nhận hàng (COD)',
		desc: 'Trả tiền mặt khi nhận được hàng',
		icon: (
			<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
			</svg>
		),
	},
	{
		value: 'Momo',
		label: 'Ví MoMo',
		desc: 'Thanh toán qua ứng dụng MoMo',
		icon: (
			<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
			</svg>
		),
	},
	{
		value: 'Bank',
		label: 'Chuyển khoản ngân hàng',
		desc: 'Internet Banking hoặc thẻ nội địa',
		icon: (
			<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
			</svg>
		),
	},
]

function PaymentContent() {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { setIsOpenDialog, setDialogData } = useDialog()
	const [payment, setPayment] = useState('Cash')
	const [loading, setLoading] = useState(false)

	const user = useSelectUser()
	const cart = useCart()
	const checkoutItems = cart.cart.filter((cartItem) => cartItem.checked)
	const totalWithSale = useMemo(
		() =>
			checkoutItems.reduce(
				(acc, item) => acc + Math.round((item.price || 0) * (1 - (item.sale || 0))) * (item.count || 1),
				0
			),
		[checkoutItems]
	)

	useEffect(() => {
		if (checkoutItems.length <= 0) navigate(CART_PATH)
	}, [])

	const onPay = async () => {
		setLoading(true)
		const items = checkoutItems.map((item) => ({ id: item._id, quantity: item.count }))
		const orderData = {
			order_items: items,
			address: user?.user?.data?.address,
			payment_type: payment,
		}
		try {
			const res = await dispatch(newOrder(orderData))
			if (res === 'SUCCESS') {
				toast_success('Đặt hàng thành công!')
				setDialogData({ title: 'Đặt hàng thành công', content: 'Cảm ơn bạn đã mua hàng!' })
				setIsOpenDialog(true)
				navigate(PAYMENT_HISTORY_PATH)
			} else {
				toast_error('Đặt hàng thất bại. Vui lòng thử lại.')
			}
		} catch (err) {
			toast_error('Có lỗi xảy ra khi đặt hàng')
		} finally {
			setLoading(false)
		}
	}

	const userData = user?.user?.data || {}

	return (
		<main className="min-h-screen bg-gray-50/60 pb-32 sm:pb-12">
			<div className="container mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 max-w-5xl">
				{/* Breadcrumb */}
				<nav className="flex items-center text-xs text-gray-500 mb-4 gap-1.5 flex-wrap">
					<Link to={CART_PATH} className="hover:text-orange-600 transition-colors">
						Giỏ hàng
					</Link>
					<span>/</span>
					<span className="text-gray-900 font-medium">Thanh toán</span>
				</nav>

				<h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-5">Thanh toán</h1>

				<div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
					{/* LEFT: Delivery + Payment */}
					<div className="col-span-12 lg:col-span-7 space-y-4">
						{/* Delivery Address */}
						<div className="bg-white rounded-xl border border-gray-200/80 shadow-xs p-5">
							<h2 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
								<svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
								</svg>
								Địa chỉ giao hàng
							</h2>

							{user?.isLoggedIn ? (
								<div className="space-y-2 text-sm">
									<div className="flex items-center gap-2">
										<svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
										</svg>
										<span className="font-medium text-gray-900">{userData.fullname}</span>
									</div>
									<div className="flex items-center gap-2">
										<svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
										</svg>
										<span className="text-gray-700">{userData.phone || 'Chưa cập nhật SĐT'}</span>
									</div>
									<div className="flex items-start gap-2">
										<svg className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
										</svg>
										<span className="text-gray-700">
											{userData.address || 'Chưa cập nhật địa chỉ'}
											{userData.postalCode && `, Mã bưu điện: ${userData.postalCode}`}
										</span>
									</div>
								</div>
							) : (
								<p className="text-xs text-gray-500">Vui lòng đăng nhập để xem thông tin giao hàng</p>
							)}
						</div>

						{/* Payment Method */}
						<div className="bg-white rounded-xl border border-gray-200/80 shadow-xs p-5">
							<h2 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
								<svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
								</svg>
								Phương thức thanh toán
							</h2>

							<div className="space-y-2.5">
								{PAYMENT_METHODS.map((method) => (
									<label
										key={method.value}
										className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
											payment === method.value
												? 'border-orange-500 bg-orange-50/50'
												: 'border-gray-200 hover:border-gray-300'
										}`}
									>
										<input
											type="radio"
											name="payment"
											value={method.value}
											checked={payment === method.value}
											onChange={(e) => setPayment(e.target.value)}
											className="accent-orange-600"
										/>
										<div className={`${payment === method.value ? 'text-orange-600' : 'text-gray-500'}`}>
											{method.icon}
										</div>
										<div>
											<div className="text-xs font-semibold text-gray-900">{method.label}</div>
											<div className="text-[11px] text-gray-500">{method.desc}</div>
										</div>
									</label>
								))}
							</div>
						</div>

						{/* Item List on mobile */}
						<div className="bg-white rounded-xl border border-gray-200/80 shadow-xs p-5 lg:hidden">
							<h2 className="text-sm font-bold text-gray-900 mb-3">
								Sản phẩm đặt hàng ({checkoutItems.length})
							</h2>
							<div className="space-y-3">
								{checkoutItems.map((item) => (
									<div key={item._id} className="flex items-center gap-3">
										<div className="w-12 h-14 bg-gray-50 border border-gray-200 rounded-lg overflow-hidden shrink-0 flex items-center justify-center">
											<img
												src={item.thumbnailUrl}
												alt={item.title}
												className="max-h-full max-w-full object-contain"
											/>
										</div>
										<div className="flex-1 min-w-0">
											<p className="text-xs font-medium text-gray-900 line-clamp-2 leading-snug">{item.title}</p>
											<p className="text-xs text-gray-500 mt-0.5">
												{formatPrice(Math.round(item.price * (1 - item.sale)))} đ × {item.count}
											</p>
										</div>
										<div className="text-xs font-bold text-red-600 shrink-0">
											{formatPrice(Math.round(item.price * (1 - item.sale)) * item.count)} đ
										</div>
									</div>
								))}
							</div>
						</div>
					</div>

					{/* RIGHT: Order Summary (desktop sticky) */}
					<div className="col-span-12 lg:col-span-5 hidden lg:block lg:sticky lg:top-20">
						<div className="bg-white rounded-xl border border-gray-200/80 shadow-xs p-5">
							<h2 className="text-sm font-bold text-gray-900 mb-4 pb-3 border-b border-gray-100">
								Tóm tắt đơn hàng ({checkoutItems.length} sản phẩm)
							</h2>

							<div className="space-y-3 max-h-64 overflow-y-auto pr-1">
								{checkoutItems.map((item) => (
									<div key={item._id} className="flex items-center gap-3">
										<div className="w-12 h-14 bg-gray-50 border border-gray-200 rounded-lg overflow-hidden shrink-0 flex items-center justify-center">
											<img
												src={item.thumbnailUrl}
												alt={item.title}
												className="max-h-full max-w-full object-contain"
											/>
										</div>
										<div className="flex-1 min-w-0">
											<p className="text-xs font-medium text-gray-900 line-clamp-2 leading-snug">{item.title}</p>
											<p className="text-xs text-gray-500 mt-0.5">× {item.count}</p>
										</div>
										<div className="text-xs font-bold text-red-600 shrink-0">
											{formatPrice(Math.round(item.price * (1 - item.sale)) * item.count)} đ
										</div>
									</div>
								))}
							</div>

							<div className="mt-4 pt-4 border-t border-gray-100 space-y-2 text-sm text-gray-600">
								<div className="flex justify-between">
									<span>Tạm tính:</span>
									<span className="font-medium text-gray-900">{formatPrice(totalWithSale)} đ</span>
								</div>
								<div className="flex justify-between">
									<span>Phí vận chuyển:</span>
									<span className="font-semibold text-emerald-600">Miễn phí</span>
								</div>
							</div>

							<div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
								<span className="text-sm font-bold text-gray-900">Tổng thanh toán:</span>
								<span className="text-xl font-extrabold text-red-600">{formatPrice(totalWithSale)} đ</span>
							</div>

							<button
								onClick={onPay}
								disabled={loading}
								className="mt-4 w-full py-3 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm transition-colors shadow-sm flex items-center justify-center gap-2 disabled:opacity-60"
							>
								{loading ? (
									<>
										<svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
											<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
											<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
										</svg>
										Đang xử lý...
									</>
								) : (
									'Xác nhận đặt hàng'
								)}
							</button>

							<Link
								to={CART_PATH}
								className="mt-3 w-full flex items-center justify-center gap-1.5 text-xs font-medium text-gray-500 hover:text-orange-600 transition-colors"
							>
								<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
								</svg>
								Quay lại giỏ hàng
							</Link>
						</div>
					</div>
				</div>
			</div>

			{/* MOBILE FIXED BOTTOM CHECKOUT BAR */}
			<div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 px-4 py-3 shadow-lg">
				<div className="flex items-center justify-between gap-3 max-w-5xl mx-auto">
					<div className="text-right flex-1 min-w-0">
						<span className="text-[11px] text-gray-500 block">Tổng thanh toán:</span>
						<span className="text-lg font-bold text-red-600">{formatPrice(totalWithSale)} đ</span>
					</div>
					<button
						onClick={onPay}
						disabled={loading}
						className="shrink-0 py-3 px-6 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm transition-colors shadow-sm disabled:opacity-60 flex items-center gap-2"
					>
						{loading ? 'Đang xử lý...' : 'Đặt hàng'}
					</button>
				</div>
			</div>

		</main>
	)
}

export default function Payment() {
	return (
		<DialogProvider>
			<PaymentContent />
		</DialogProvider>
	)
}
