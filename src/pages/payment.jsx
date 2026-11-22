import React, { useEffect, useMemo, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { Link } from '../components/Link'
import { CART_PATH, PAYMENT_HISTORY_PATH } from '../constants/path'
import { useUser } from '../hooks/useUser'
import { useDialog } from '../hooks/useDialog'
import { useCart } from '../stores/cart'
import { priceCart, unitPrice } from '../lib/pricing'
import { ordersQuery } from '../lib/queries'
import { createOrder } from '../lib/auth'
import { formatPrice } from '../utils/format'
import { toast_error, toast_success } from '../utils/toastNotify'
import Icon from '../components/Icon'
import { CartSkeleton } from './cart'

const PAYMENT_METHODS = [
	{
		value: 'Cash',
		label: 'Thanh toán khi nhận hàng (COD)',
		desc: 'Trả tiền mặt khi nhận được hàng',
		icon: <Icon name="cash" className="w-5 h-5" />,
	},
	{
		value: 'Momo',
		label: 'Ví MoMo',
		desc: 'Nhân viên sẽ liên hệ gửi thông tin thanh toán',
		icon: <Icon name="device-mobile" className="w-5 h-5" />,
	},
	{
		value: 'Bank',
		label: 'Chuyển khoản ngân hàng',
		desc: 'Nhân viên sẽ liên hệ gửi số tài khoản',
		icon: <Icon name="credit-card" className="w-5 h-5" />,
	},
]

const inputClass =
	'block w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 bg-white'

function OrderLines({ items }) {
	return items.map((item) => (
		<div key={item._id} className="flex items-center gap-3">
			<div className="w-12 h-14 bg-gray-50 border border-gray-200 rounded-lg overflow-hidden shrink-0 flex items-center justify-center">
				<img src={item.thumbnailUrl} alt={item.title} className="max-h-full max-w-full object-contain" />
			</div>
			<div className="flex-1 min-w-0">
				<p className="text-xs font-medium text-gray-900 line-clamp-2 leading-snug">{item.title}</p>
				<p className="text-xs text-gray-500 mt-0.5">
					{formatPrice(unitPrice(item))} đ × {item.count}
				</p>
			</div>
			<div className="text-xs font-bold text-red-600 shrink-0">{formatPrice(unitPrice(item) * item.count)} đ</div>
		</div>
	))
}

export default function Payment() {
	const navigate = useNavigate()
	const queryClient = useQueryClient()
	const { openDialog } = useDialog()
	const user = useUser()

	const items = useCart((state) => state.items)
	const hydrated = useCart((state) => state.hydrated)
	const voucher = useCart((state) => state.voucher)
	const removeIds = useCart((state) => state.removeIds)
	const checkoutItems = useMemo(() => items.filter((item) => item.checked), [items])
	const pricing = useMemo(() => priceCart(checkoutItems, voucher), [checkoutItems, voucher])

	const [payment, setPayment] = useState('Cash')
	const [submitting, setSubmitting] = useState(false)
	const [placed, setPlaced] = useState(false)
	const [form, setForm] = useState({
		receiver: user?.fullname || '',
		phone: user?.phone || '',
		address: [user?.address, user?.postalCode].filter(Boolean).join(', '),
	})
	const onField = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }))

	// Nothing selected (and not just ordered): go back to the cart
	useEffect(() => {
		if (hydrated && !placed && checkoutItems.length === 0) navigate({ to: CART_PATH, replace: true })
	}, [hydrated, placed, checkoutItems.length, navigate])

	const onPay = async (e) => {
		e?.preventDefault()
		if (submitting) return
		if (form.address.trim().length < 5) return toast_error('Vui lòng nhập địa chỉ giao hàng')
		if (!/^[0-9+\s.-]{8,15}$/.test(form.phone.trim())) return toast_error('Số điện thoại không hợp lệ')

		setSubmitting(true)
		try {
			const order = await createOrder({
				items: checkoutItems.map((item) => ({ id: item._id, quantity: item.count })),
				payment_type: payment,
				receiver: form.receiver,
				phone: form.phone,
				address: form.address,
				voucher: pricing.voucher?.code,
			})
			// Only now remove what was actually ordered
			setPlaced(true)
			removeIds(checkoutItems.map((item) => item._id))
			useCart.getState().setVoucher(null)
			await queryClient.invalidateQueries({ queryKey: ordersQuery().queryKey })
			toast_success('Đặt hàng thành công!')
			openDialog({
				title: 'Đặt hàng thành công',
				content: `Cảm ơn bạn đã mua hàng! Tổng thanh toán: ${formatPrice(order?.total ?? pricing.total)} đ.`,
			})
			navigate({ to: PAYMENT_HISTORY_PATH })
		} catch (error) {
			toast_error(error?.message || 'Đặt hàng thất bại. Vui lòng thử lại.')
		} finally {
			setSubmitting(false)
		}
	}

	if (!hydrated || checkoutItems.length === 0) return <CartSkeleton />

	const submitLabel = submitting ? (
		<>
			<Icon name="spinner" className="animate-spin w-4 h-4" />
			Đang xử lý...
		</>
	) : (
		'Xác nhận đặt hàng'
	)

	return (
		<main className="min-h-screen bg-gray-50/60 pb-32 sm:pb-12">
			<form onSubmit={onPay} className="container mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 max-w-5xl">
				<nav className="flex items-center text-xs text-gray-500 mb-4 gap-1.5 flex-wrap">
					<Link to={CART_PATH} className="hover:text-orange-600 transition-colors">
						Giỏ hàng
					</Link>
					<span>/</span>
					<span className="text-gray-900 font-medium">Thanh toán</span>
				</nav>

				<h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-5">Thanh toán</h1>

				<div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
					<div className="col-span-12 lg:col-span-7 space-y-4">
						{/* Delivery Address */}
						<div className="bg-white rounded-xl border border-gray-200/80 shadow-xs p-5">
							<h2 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
								<Icon name="location" className="w-4 h-4 text-orange-600" />
								Thông tin giao hàng
							</h2>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
								<div>
									<label htmlFor="receiver" className="block text-xs font-semibold text-gray-700 mb-1">
										Người nhận
									</label>
									<input id="receiver" className={inputClass} value={form.receiver} onChange={onField('receiver')} maxLength={100} autoComplete="name" />
								</div>
								<div>
									<label htmlFor="phone" className="block text-xs font-semibold text-gray-700 mb-1">
										Số điện thoại *
									</label>
									<input id="phone" type="tel" required className={inputClass} value={form.phone} onChange={onField('phone')} maxLength={15} autoComplete="tel" />
								</div>
								<div className="sm:col-span-2">
									<label htmlFor="address" className="block text-xs font-semibold text-gray-700 mb-1">
										Địa chỉ nhận hàng *
									</label>
									<textarea id="address" required rows={2} className={inputClass} value={form.address} onChange={onField('address')} maxLength={300} autoComplete="street-address" placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành" />
								</div>
							</div>
							<p className="mt-2 text-[11px] text-gray-500">
								Muốn lưu địa chỉ cho lần sau?{' '}
								<Link to="/profile" className="text-orange-600 hover:underline">
									Cập nhật hồ sơ
								</Link>
							</p>
						</div>

						{/* Payment Method */}
						<div className="bg-white rounded-xl border border-gray-200/80 shadow-xs p-5">
							<h2 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
								<Icon name="credit-card" className="w-4 h-4 text-orange-600" />
								Phương thức thanh toán
							</h2>
							<div className="space-y-2.5">
								{PAYMENT_METHODS.map((method) => (
									<label
										key={method.value}
										className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
											payment === method.value ? 'border-orange-500 bg-orange-50/50' : 'border-gray-200 hover:border-gray-300'
										}`}>
										<input
											type="radio"
											name="payment"
											value={method.value}
											checked={payment === method.value}
											onChange={(e) => setPayment(e.target.value)}
											className="accent-orange-600"
										/>
										<div className={payment === method.value ? 'text-orange-600' : 'text-gray-500'}>{method.icon}</div>
										<div>
											<div className="text-xs font-semibold text-gray-900">{method.label}</div>
											<div className="text-[11px] text-gray-500">{method.desc}</div>
										</div>
									</label>
								))}
							</div>
						</div>

						{/* Items on mobile */}
						<div className="bg-white rounded-xl border border-gray-200/80 shadow-xs p-5 lg:hidden">
							<h2 className="text-sm font-bold text-gray-900 mb-3">Sản phẩm đặt hàng ({checkoutItems.length})</h2>
							<div className="space-y-3">
								<OrderLines items={checkoutItems} />
							</div>
						</div>
					</div>

					{/* Order summary */}
					<div className="col-span-12 lg:col-span-5 lg:sticky lg:top-20">
						<div className="bg-white rounded-xl border border-gray-200/80 shadow-xs p-5">
							<h2 className="text-sm font-bold text-gray-900 mb-4 pb-3 border-b border-gray-100">
								Tóm tắt đơn hàng ({checkoutItems.length} sản phẩm)
							</h2>
							<div className="space-y-3 max-h-64 overflow-y-auto pr-1 hidden lg:block">
								<OrderLines items={checkoutItems} />
							</div>

							<div className="lg:mt-4 lg:pt-4 lg:border-t border-gray-100 space-y-2 text-sm text-gray-600">
								<div className="flex justify-between">
									<span>Tạm tính:</span>
									<span className="font-medium text-gray-900">{formatPrice(pricing.itemsValue)} đ</span>
								</div>
								{pricing.voucherDiscount > 0 && (
									<div className="flex justify-between text-emerald-700">
										<span>Mã {pricing.voucher.code}:</span>
										<span className="font-medium">-{formatPrice(pricing.voucherDiscount)} đ</span>
									</div>
								)}
								<div className="flex justify-between">
									<span>Phí vận chuyển:</span>
									{pricing.shipFee === 0 ? (
										<span className="font-semibold text-emerald-600">Miễn phí</span>
									) : (
										<span className="font-medium text-gray-900">{formatPrice(pricing.shipFee)} đ</span>
									)}
								</div>
							</div>

							<div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
								<span className="text-sm font-bold text-gray-900">Tổng thanh toán:</span>
								<span className="text-xl font-extrabold text-red-600">{formatPrice(pricing.total)} đ</span>
							</div>

							<button
								type="submit"
								disabled={submitting}
								className="mt-4 w-full py-3 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm transition-colors shadow-sm hidden lg:flex items-center justify-center gap-2 disabled:opacity-60">
								{submitLabel}
							</button>

							<Link
								to={CART_PATH}
								className="mt-3 w-full flex items-center justify-center gap-1.5 text-xs font-medium text-gray-500 hover:text-orange-600 transition-colors">
								<Icon name="chevron-left" className="w-4 h-4" />
								Quay lại giỏ hàng
							</Link>
						</div>
					</div>
				</div>

				{/* Mobile fixed checkout bar */}
				<div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 px-4 py-3 shadow-lg">
					<div className="flex items-center justify-between gap-3 max-w-5xl mx-auto">
						<div className="text-right flex-1 min-w-0">
							<span className="text-[11px] text-gray-500 block">Tổng thanh toán:</span>
							<span className="text-lg font-bold text-red-600">{formatPrice(pricing.total)} đ</span>
						</div>
						<button
							type="submit"
							disabled={submitting}
							className="shrink-0 py-3 px-6 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm transition-colors shadow-sm disabled:opacity-60 flex items-center gap-2">
							{submitting ? 'Đang xử lý...' : 'Đặt hàng'}
						</button>
					</div>
				</div>
			</form>
		</main>
	)
}
