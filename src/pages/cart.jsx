import React, { useState, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import CartItem from '../components/CartItem/CartItem'
import { formatPrice } from '../utils/format'
import { HOME_PATH, LOGIN_PATH, PAYMENT_PATH, SEARCH_PATH } from '../constants/path'
import { useCart } from '../redux/selectors/useCart'
import { useSelectUser } from '../redux/selectors/useSelectUser'
import { useDialog } from '../hooks/useDialog'
import { checkAllCartItems, removeSelectedCartItems } from '../redux/actions/cartAction'
import { toast_info, toast_success } from '../utils/toastNotify'

const FREESHIP_THRESHOLD = 150000
const STANDARD_SHIPPING_FEE = 25000

export default function Cart() {
	const cart = useCart()
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const user = useSelectUser()
	const { openDialog } = useDialog()

	const [voucherCode, setVoucherCode] = useState('')
	const [appliedVoucher, setAppliedVoucher] = useState(null)

	const items = cart?.cart || []
	const totalItemsCount = items.length
	const checkoutItems = useMemo(() => items.filter((item) => item.checked), [items])

	const isAllChecked = useMemo(
		() => items.length > 0 && items.every((item) => item.checked),
		[items]
	)

	// Price calculations
	const subtotalOriginal = useMemo(
		() => checkoutItems.reduce((acc, item) => acc + (item.price || 0) * (item.count || 1), 0),
		[checkoutItems]
	)

	const subtotalDiscounted = useMemo(
		() =>
			checkoutItems.reduce(
				(acc, item) =>
					acc +
					Math.round((item.price || 0) * (1 - (item.sale || 0))) * (item.count || 1),
				0
			),
		[checkoutItems]
	)

	const productSavings = subtotalOriginal - subtotalDiscounted

	// Shipping fee calculation
	const isFreeShipEligible = subtotalDiscounted >= FREESHIP_THRESHOLD
	const freeshipProgress = Math.min(100, Math.round((subtotalDiscounted / FREESHIP_THRESHOLD) * 100))

	// Voucher discount calculation
	const voucherDiscount = useMemo(() => {
		if (!appliedVoucher) return 0
		if (appliedVoucher.type === 'amount') {
			return Math.min(subtotalDiscounted, appliedVoucher.value)
		}
		if (appliedVoucher.type === 'shipping') {
			return isFreeShipEligible ? 0 : STANDARD_SHIPPING_FEE
		}
		return 0
	}, [appliedVoucher, subtotalDiscounted, isFreeShipEligible])

	const shippingFee = checkoutItems.length === 0
		? 0
		: isFreeShipEligible || appliedVoucher?.type === 'shipping'
		? 0
		: STANDARD_SHIPPING_FEE

	const finalTotal = Math.max(0, subtotalDiscounted - (appliedVoucher?.type === 'amount' ? voucherDiscount : 0) + shippingFee)

	const handleToggleAll = () => {
		dispatch(checkAllCartItems(!isAllChecked))
	}

	const handleRemoveSelected = () => {
		if (checkoutItems.length === 0) return
		openDialog({
			title: 'Xác nhận xóa',
			content: (
				<p className="text-gray-600 text-sm">
					Bạn có chắc chắn muốn xóa {checkoutItems.length} sản phẩm đã chọn khỏi giỏ hàng?
				</p>
			),
			confirmText: 'Xóa ngay',
			cancelText: 'Hủy',
			showCancel: true,
			onConfirm: () => {
				dispatch(removeSelectedCartItems())
				toast_success('Đã xóa các sản phẩm được chọn')
			},
		})
	}

	const handleApplyVoucher = (codeToApply) => {
		const code = (codeToApply || voucherCode).trim().toUpperCase()
		if (!code) {
			toast_info('Vui lòng nhập mã giảm giá')
			return
		}

		if (code === 'BOOK10K') {
			setAppliedVoucher({ code: 'BOOK10K', type: 'amount', value: 10000, label: 'Giảm 10.000 đ' })
			setVoucherCode('BOOK10K')
			toast_success('Áp dụng mã BOOK10K thành công (-10.000 đ)')
		} else if (code === 'FREESHIP') {
			setAppliedVoucher({ code: 'FREESHIP', type: 'shipping', value: STANDARD_SHIPPING_FEE, label: 'Miễn phí vận chuyển' })
			setVoucherCode('FREESHIP')
			toast_success('Áp dụng mã FREESHIP thành công!')
		} else {
			toast_info('Mã giảm giá không hợp lệ hoặc đã hết hạn')
		}
	}

	const handleRemoveVoucher = () => {
		setAppliedVoucher(null)
		setVoucherCode('')
		toast_info('Đã hủy áp dụng mã giảm giá')
	}

	const handleCheckout = () => {
		if (checkoutItems.length === 0) {
			toast_info('Vui lòng chọn ít nhất 1 sản phẩm để thanh toán')
			return
		}

		if (!user.isLoggedIn) {
			openDialog({
				title: 'Yêu cầu đăng nhập',
				content: (
					<div className="flex flex-col items-center text-center py-2">
						<div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 mb-3">
							<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
							</svg>
						</div>
						<p className="text-gray-700 font-medium mb-1">Bạn chưa đăng nhập</p>
						<p className="text-xs text-gray-500 mb-4">
							Vui lòng đăng nhập tài khoản BookShop để tiếp tục thanh toán và nhận ưu đãi tích điểm.
						</p>
						<button
							onClick={() => navigate(LOGIN_PATH)}
							className="w-full py-2.5 px-4 bg-orange-600 hover:bg-orange-700 text-white font-medium text-sm rounded-lg transition-colors shadow-xs"
						>
							Đăng nhập ngay
						</button>
					</div>
				),
				confirmText: 'Để sau',
				showCancel: true,
				onConfirm: () => {},
			})
		} else {
			navigate(PAYMENT_PATH)
		}
	}

	// EMPTY STATE
	if (totalItemsCount === 0) {
		return (
			<main className="min-h-screen bg-gray-50/60 pb-12">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
					{/* BREADCRUMB */}
					<nav className="flex items-center text-xs text-gray-500 mb-6 gap-1.5">
						<Link to={HOME_PATH} className="hover:text-orange-600 transition-colors">
							Trang chủ
						</Link>
						<span>/</span>
						<span className="text-gray-900 font-medium">Giỏ hàng</span>
					</nav>

					<div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs max-w-lg mx-auto p-8 sm:p-12 text-center">
						<div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-5 rounded-full bg-orange-50 flex items-center justify-center text-orange-500">
							<svg className="w-12 h-12 sm:w-14 sm:h-14 stroke-current fill-none" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
							</svg>
						</div>

						<h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
							Giỏ hàng của bạn đang trống
						</h2>
						<p className="text-xs sm:text-sm text-gray-500 mb-6 leading-relaxed">
							Hãy khám phá hàng ngàn tựa sách hấp dẫn với nhiều ưu đãi giảm giá đang chờ bạn!
						</p>

						<div className="flex flex-col sm:flex-row items-center justify-center gap-3">
							<Link
								to={SEARCH_PATH}
								className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-medium text-sm rounded-xl transition-colors shadow-xs"
							>
								Khám phá sách ngay
							</Link>
							<Link
								to={HOME_PATH}
								className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium text-sm rounded-xl transition-colors"
							>
								Về trang chủ
							</Link>
						</div>
					</div>
				</div>
			</main>
		)
	}

	return (
		<main className="min-h-screen bg-gray-50/60 pb-24 sm:pb-16">
			<div className="container mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 max-w-7xl">
				{/* BREADCRUMB */}
				<nav className="flex items-center text-xs text-gray-500 mb-4 gap-1.5 flex-wrap">
					<Link to={HOME_PATH} className="hover:text-orange-600 transition-colors">
						Trang chủ
					</Link>
					<span>/</span>
					<span className="text-gray-900 font-medium">Giỏ hàng ({totalItemsCount})</span>
				</nav>

				{/* PAGE TITLE */}
				<div className="flex items-center justify-between mb-4">
					<h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
						<span>Giỏ hàng</span>
						<span className="text-xs sm:text-sm font-normal text-gray-500">
							({totalItemsCount} sản phẩm)
						</span>
					</h1>
					<Link
						to={SEARCH_PATH}
						className="text-xs sm:text-sm font-medium text-orange-600 hover:text-orange-700 transition-colors flex items-center gap-1"
					>
						<span>Tiếp tục mua sắm</span>
						<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
						</svg>
					</Link>
				</div>

				{/* FREESHIP PROGRESS BANNER */}
				<div className="bg-white rounded-xl border border-gray-200/80 p-3 sm:p-4 mb-4 shadow-xs">
					<div className="flex items-center justify-between text-xs sm:text-sm mb-1.5">
						<div className="flex items-center gap-2">
							<span className="text-base sm:text-lg">🚚</span>
							{isFreeShipEligible ? (
								<span className="font-semibold text-emerald-600">
									Bạn đã đủ điều kiện nhận MIỄN PHÍ VẬN CHUYỂN!
								</span>
							) : (
								<span className="text-gray-700">
									Mua thêm{' '}
									<strong className="text-orange-600 font-bold">
										{formatPrice(FREESHIP_THRESHOLD - subtotalDiscounted)} đ
									</strong>{' '}
									để được Freeship toàn quốc
								</span>
							)}
						</div>
						<span className="text-xs font-semibold text-gray-500 hidden sm:inline">
							{subtotalDiscounted >= FREESHIP_THRESHOLD
								? 'Đã đạt'
								: `${formatPrice(subtotalDiscounted)} / ${formatPrice(FREESHIP_THRESHOLD)} đ`}
						</span>
					</div>
					<div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
						<div
							className={`h-full transition-all duration-300 rounded-full ${
								isFreeShipEligible ? 'bg-emerald-500' : 'bg-orange-500'
							}`}
							style={{ width: `${freeshipProgress}%` }}
						/>
					</div>
				</div>

				{/* MAIN CONTENT GRID */}
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
					{/* LEFT COLUMN: CART ITEMS TABLE */}
					<div className="col-span-12 lg:col-span-8 space-y-3">
						{/* TABLE CONTROLS HEADER */}
						<div className="bg-white rounded-xl border border-gray-200/80 p-3 sm:p-4 shadow-xs flex items-center justify-between">
							<label className="flex items-center gap-2 cursor-pointer select-none">
								<input
									type="checkbox"
									className="w-4 h-4 text-orange-600 rounded border-gray-300 focus:ring-orange-500 cursor-pointer accent-orange-600"
									checked={isAllChecked}
									onChange={handleToggleAll}
									aria-label="Chọn tất cả sản phẩm"
								/>
								<span className="text-xs sm:text-sm font-semibold text-gray-800">
									Chọn tất cả ({totalItemsCount})
								</span>
							</label>

							{/* Desktop Column Headings */}
							<div className="hidden sm:grid sm:grid-cols-6 gap-2 text-xs font-semibold text-gray-500 flex-1 ml-6 text-right">
								<span className="col-span-3 text-right">Đơn giá</span>
								<span className="col-span-1 text-center">Số lượng</span>
								<span className="col-span-1 text-right">Thành tiền</span>
								<span className="col-span-1 text-center">Xóa</span>
							</div>

							{/* Batch remove button if any checked */}
							{checkoutItems.length > 0 && (
								<button
									onClick={handleRemoveSelected}
									className="text-xs font-medium text-red-600 hover:text-red-700 hover:bg-red-50 px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1 sm:hidden"
								>
									<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
									</svg>
									<span>Xóa ({checkoutItems.length})</span>
								</button>
							)}
						</div>

						{/* ITEMS LIST */}
						<div className="bg-white rounded-xl border border-gray-200/80 shadow-xs divide-y divide-gray-100 overflow-hidden">
							{items.map((cartItem) => (
								<CartItem key={cartItem._id} {...cartItem} />
							))}
						</div>

						{/* DESKTOP BATCH DELETE ACTION */}
						{checkoutItems.length > 0 && (
							<div className="hidden sm:flex justify-end">
								<button
									onClick={handleRemoveSelected}
									className="text-xs font-medium text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors inline-flex items-center gap-1.5 border border-red-200"
								>
									<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
									</svg>
									<span>Xóa {checkoutItems.length} sản phẩm đã chọn</span>
								</button>
							</div>
						)}
					</div>

					{/* RIGHT COLUMN: ORDER SUMMARY & PROMOTIONS (Sticky) */}
					<div className="col-span-12 lg:col-span-4 space-y-4 lg:sticky lg:top-20">
						{/* VOUCHER COUPON BOX */}
						<div className="bg-white rounded-xl border border-gray-200/80 p-4 shadow-xs">
							<h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3 flex items-center gap-1.5">
								<svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
								</svg>
								<span>Mã khuyến mãi / Voucher</span>
							</h3>

							<div className="flex gap-2 mb-2.5">
								<input
									type="text"
									value={voucherCode}
									onChange={(e) => setVoucherCode(e.target.value)}
									placeholder="Nhập mã giảm giá..."
									className="flex-1 py-2 px-3 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 focus:bg-white uppercase"
								/>
								<button
									type="button"
									onClick={() => handleApplyVoucher()}
									className="px-3.5 py-2 bg-gray-900 hover:bg-gray-800 text-white text-xs font-medium rounded-lg transition-colors"
								>
									Áp dụng
								</button>
							</div>

							{/* Suggested Voucher Chips */}
							<div className="flex flex-wrap gap-1.5 text-[11px]">
								<button
									type="button"
									onClick={() => handleApplyVoucher('BOOK10K')}
									className="px-2 py-1 bg-orange-50 hover:bg-orange-100 text-orange-700 rounded-md border border-orange-200/70 transition-colors"
								>
									🎟 BOOK10K (-10K)
								</button>
								<button
									type="button"
									onClick={() => handleApplyVoucher('FREESHIP')}
									className="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-md border border-emerald-200/70 transition-colors"
								>
									🚚 FREESHIP
								</button>
							</div>

							{appliedVoucher && (
								<div className="mt-3 p-2 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center justify-between text-xs text-emerald-700">
									<div className="flex items-center gap-1.5 font-medium">
										<span>✓</span>
										<span>Đã áp dụng mã: {appliedVoucher.code} ({appliedVoucher.label})</span>
									</div>
									<button
										onClick={handleRemoveVoucher}
										className="text-gray-400 hover:text-red-600 p-0.5"
										aria-label="Hủy mã giảm giá"
									>
										✕
									</button>
								</div>
							)}
						</div>

						{/* ORDER SUMMARY */}
						<div className="bg-white rounded-xl border border-gray-200/80 p-4 sm:p-5 shadow-xs">
							<h3 className="text-base font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
								Tóm tắt đơn hàng
							</h3>

							<div className="space-y-2.5 text-xs sm:text-sm text-gray-600 mb-4">
								<div className="flex items-center justify-between">
									<span>Tạm tính ({checkoutItems.length} sản phẩm):</span>
									<span className="font-medium text-gray-900">
										{formatPrice(subtotalOriginal)} đ
									</span>
								</div>

								{productSavings > 0 && (
									<div className="flex items-center justify-between text-emerald-600">
										<span>Giảm giá sách:</span>
										<span className="font-semibold">
											-{formatPrice(productSavings)} đ
										</span>
									</div>
								)}

								{appliedVoucher && voucherDiscount > 0 && (
									<div className="flex items-center justify-between text-emerald-600">
										<span>Giảm giá voucher:</span>
										<span className="font-semibold">
											-{formatPrice(voucherDiscount)} đ
										</span>
									</div>
								)}

								<div className="flex items-center justify-between">
									<div className="flex items-center gap-1">
										<span>Phí vận chuyển:</span>
										<span
											title="Miễn phí với đơn hàng từ 150.000 đ"
											className="cursor-help text-gray-400 text-xs"
										>
											ⓘ
										</span>
									</div>
									<span>
										{shippingFee === 0 ? (
											<span className="text-emerald-600 font-semibold">Miễn phí</span>
										) : (
											<span className="font-medium text-gray-900">
												{formatPrice(shippingFee)} đ
											</span>
										)}
									</span>
								</div>
							</div>

							<div className="pt-3 border-t border-gray-100 mb-5">
								<div className="flex items-baseline justify-between">
									<span className="text-sm sm:text-base font-bold text-gray-900">
										Tổng thanh toán:
									</span>
									<div className="text-right">
										<span className="text-xl sm:text-2xl font-extrabold text-red-600">
											{formatPrice(finalTotal)} đ
										</span>
										<span className="block text-[11px] text-gray-400">
											(Đã bao gồm thuế VAT nếu có)
										</span>
									</div>
								</div>
							</div>

							{/* CHECKOUT BUTTON */}
							<button
								onClick={handleCheckout}
								disabled={checkoutItems.length === 0}
								className={`w-full py-3 px-4 rounded-xl font-bold text-sm sm:text-base transition-all duration-200 shadow-sm flex items-center justify-center gap-2 ${
									checkoutItems.length > 0
										? 'bg-red-600 hover:bg-red-700 text-white active:scale-[0.99] cursor-pointer'
										: 'bg-gray-200 text-gray-400 cursor-not-allowed'
								}`}
							>
								<span>Tiến hành đặt hàng</span>
								{checkoutItems.length > 0 && <span>({checkoutItems.length})</span>}
							</button>

							{checkoutItems.length === 0 && (
								<p className="text-[11px] text-amber-600 text-center mt-2">
									Vui lòng chọn ít nhất 1 sản phẩm để tiếp tục
								</p>
							)}

							{/* TRUST BADGES */}
							<div className="mt-5 pt-4 border-t border-gray-100 space-y-2 text-xs text-gray-500">
								<div className="flex items-center gap-2">
									<svg className="w-4 h-4 text-emerald-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
									</svg>
									<span>Cam kết 100% sách thật, nguồn gốc rõ ràng</span>
								</div>
								<div className="flex items-center gap-2">
									<svg className="w-4 h-4 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
									</svg>
									<span>Đổi trả trong 30 ngày nếu có lỗi từ NXB</span>
								</div>
								<div className="flex items-center gap-2">
									<svg className="w-4 h-4 text-orange-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
									</svg>
									<span>Bảo mật thông tin thanh toán tuyệt đối</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* MOBILE FIXED BOTTOM CHECKOUT BAR */}
			<div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 px-4 py-2.5 shadow-lg flex items-center justify-between gap-3">
				<label className="flex items-center gap-1.5 cursor-pointer text-xs font-semibold text-gray-700">
					<input
						type="checkbox"
						className="w-4 h-4 text-orange-600 rounded border-gray-300 focus:ring-orange-500 cursor-pointer accent-orange-600"
						checked={isAllChecked}
						onChange={handleToggleAll}
					/>
					<span>Tất cả</span>
				</label>

				<div className="text-right flex-1 min-w-0 pr-1">
					<span className="text-[11px] text-gray-500 block leading-tight">Tổng cộng:</span>
					<span className="text-base font-bold text-red-600 truncate block">
						{formatPrice(finalTotal)} đ
					</span>
				</div>

				<button
					onClick={handleCheckout}
					disabled={checkoutItems.length === 0}
					className={`py-2 px-4 rounded-xl font-bold text-xs transition-colors shrink-0 ${
						checkoutItems.length > 0
							? 'bg-red-600 text-white hover:bg-red-700'
							: 'bg-gray-200 text-gray-400 cursor-not-allowed'
					}`}
				>
					Đặt hàng ({checkoutItems.length})
				</button>
			</div>
		</main>
	)
}
