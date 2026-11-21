import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import QuantityBox from '../BookDetail.jsx/QuantityBox'
import { formatPrice } from '../../utils/format'
import { checkItemInCart, removeFromCart } from '../../redux/actions/cartAction'

export default function CartItem({
	_id,
	thumbnailUrl,
	title = '',
	price = 0,
	sale = 0,
	count = 1,
	checked = false,
}) {
	const dispatch = useDispatch()

	const handleRemoveFromCart = (e) => {
		e.stopPropagation()
		dispatch(removeFromCart(_id))
	}

	const handleCheckChange = () => {
		dispatch(checkItemInCart(_id))
	}

	const discountedPrice = Math.round(price * (1 - (sale || 0)))
	const totalPrice = discountedPrice * count
	const discountPercent = Math.round((sale || 0) * 100)
	const fallbackImg =
		'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400'

	return (
		<div className="p-3 sm:p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50/50 transition-colors">
			{/* DESKTOP LAYOUT (sm and up) */}
			<div className="hidden sm:grid sm:grid-cols-12 gap-4 items-center">
				{/* Checkbox & Thumbnail & Title */}
				<div className="col-span-6 flex items-center gap-3 min-w-0">
					<label className="flex items-center cursor-pointer p-1">
						<input
							type="checkbox"
							className="w-4 h-4 text-orange-600 rounded border-gray-300 focus:ring-orange-500 cursor-pointer accent-orange-600"
							checked={checked}
							onChange={handleCheckChange}
							aria-label={`Chọn sản phẩm ${title}`}
						/>
					</label>

					<Link
						to={`/book/${_id}`}
						className="w-16 h-20 flex-shrink-0 bg-white border border-gray-200 rounded-lg p-1 overflow-hidden flex items-center justify-center hover:shadow-xs transition-shadow"
					>
						<img
							className="max-h-full max-w-full object-contain"
							src={thumbnailUrl || fallbackImg}
							alt={title}
							onError={(e) => {
								e.target.src = fallbackImg
							}}
						/>
					</Link>

					<div className="min-w-0 flex-1 pr-2">
						<Link
							to={`/book/${_id}`}
							className="text-sm font-medium text-gray-900 hover:text-orange-600 transition-colors line-clamp-2 leading-snug"
						>
							{title}
						</Link>
						<div className="mt-1 flex items-center gap-2">
							<span className="text-xs text-gray-400">Mã SP: {_id?.slice(-6)?.toUpperCase()}</span>
						</div>
					</div>
				</div>

				{/* Unit Price */}
				<div className="col-span-2 text-right">
					<div className="text-sm font-semibold text-gray-900">
						{formatPrice(discountedPrice)} đ
					</div>
					{sale > 0 && (
						<div className="flex items-center justify-end gap-1 mt-0.5">
							<span className="text-xs text-gray-400 line-through">
								{formatPrice(price)} đ
							</span>
							<span className="text-[10px] font-bold text-red-600 bg-red-50 px-1 py-0.2 rounded">
								-{discountPercent}%
							</span>
						</div>
					)}
				</div>

				{/* Quantity Stepper */}
				<div className="col-span-2 flex justify-center">
					<QuantityBox product_id={_id} count={count} />
				</div>

				{/* Total Subtotal Price */}
				<div className="col-span-1 text-right">
					<div className="text-sm font-bold text-red-600">
						{formatPrice(totalPrice)} đ
					</div>
				</div>

				{/* Remove Trash Button */}
				<div className="col-span-1 text-center">
					<button
						onClick={handleRemoveFromCart}
						className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
						title="Xóa sản phẩm"
						aria-label={`Xóa ${title}`}
					>
						<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={1.75}
								d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
							/>
						</svg>
					</button>
				</div>
			</div>

			{/* MOBILE LAYOUT (< sm screens) */}
			<div className="block sm:hidden">
				<div className="flex items-start gap-2.5">
					{/* Checkbox */}
					<label className="flex items-center cursor-pointer pt-2">
						<input
							type="checkbox"
							className="w-4 h-4 text-orange-600 rounded border-gray-300 focus:ring-orange-500 cursor-pointer accent-orange-600"
							checked={checked}
							onChange={handleCheckChange}
							aria-label={`Chọn sản phẩm ${title}`}
						/>
					</label>

					{/* Thumbnail */}
					<Link
						to={`/book/${_id}`}
						className="w-16 h-20 flex-shrink-0 bg-white border border-gray-200 rounded-lg p-1 overflow-hidden flex items-center justify-center"
					>
						<img
							className="max-h-full max-w-full object-contain"
							src={thumbnailUrl || fallbackImg}
							alt={title}
							onError={(e) => {
								e.target.src = fallbackImg
							}}
						/>
					</Link>

					{/* Details */}
					<div className="flex-1 min-w-0">
						<div className="flex items-start justify-between gap-1">
							<Link
								to={`/book/${_id}`}
								className="text-xs font-medium text-gray-900 hover:text-orange-600 transition-colors line-clamp-2 leading-snug flex-1"
							>
								{title}
							</Link>
							<button
								onClick={handleRemoveFromCart}
								className="p-1 text-gray-400 hover:text-red-600 rounded transition-colors -mr-1"
								aria-label={`Xóa ${title}`}
							>
								<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={1.75}
										d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
									/>
								</svg>
							</button>
						</div>

						{/* Price row */}
						<div className="mt-1 flex items-baseline gap-1.5 flex-wrap">
							<span className="text-sm font-bold text-red-600">
								{formatPrice(discountedPrice)} đ
							</span>
							{sale > 0 && (
								<>
									<span className="text-xs text-gray-400 line-through">
										{formatPrice(price)} đ
									</span>
									<span className="text-[10px] font-bold text-red-600 bg-red-50 px-1 py-0.2 rounded">
										-{discountPercent}%
									</span>
								</>
							)}
						</div>

						{/* Stepper & Subtotal row */}
						<div className="mt-2 flex items-center justify-between gap-2">
							<QuantityBox product_id={_id} count={count} />
							<div className="text-right">
								<span className="text-xs text-gray-500 block">Thành tiền:</span>
								<span className="text-sm font-bold text-red-600">
									{formatPrice(totalPrice)} đ
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
