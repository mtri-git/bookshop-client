import React from 'react'
import { formatPrice } from '../../utils/format'
import { Link } from '../Link'

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400'

export default function PaymentItem({ _id, imageUrl, title = 'Sách không còn bán', price = 0, quantity = 1, sale = 0 }) {
	const path = `/book/${_id}`
	const discountedPrice = Math.round(price * (1 - (sale || 0)))
	const totalPrice = discountedPrice * quantity
	const discountPercent = Math.round((sale || 0) * 100)

	return (
		<div className="flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-3">
			{/* Thumbnail */}
			<Link
				to={path}
				className="w-14 h-18 sm:w-16 sm:h-20 flex-shrink-0 bg-gray-50 border border-gray-200 rounded-lg overflow-hidden flex items-center justify-center hover:shadow-xs transition-shadow"
			>
				<img
					src={imageUrl || FALLBACK_IMG}
					className="max-w-full max-h-full object-contain"
					alt={title}
					onError={(e) => { e.target.src = FALLBACK_IMG }}
				/>
			</Link>

			{/* Info */}
			<div className="flex-1 min-w-0">
				<Link
					to={path}
					className="text-xs sm:text-sm font-medium text-gray-900 hover:text-orange-600 transition-colors line-clamp-2 leading-snug"
				>
					{title || 'Tên sách'}
				</Link>

				<div className="mt-1 flex items-center gap-2 flex-wrap">
					<span className="text-xs sm:text-sm font-bold text-red-600">
						{formatPrice(discountedPrice)} đ
					</span>
					{sale > 0 && (
						<>
							<span className="text-[11px] text-gray-400 line-through">
								{formatPrice(price)} đ
							</span>
							<span className="text-[10px] font-bold text-red-600 bg-red-50 px-1 rounded">
								-{discountPercent}%
							</span>
						</>
					)}
					<span className="text-[11px] text-gray-500">× {quantity}</span>
				</div>
			</div>

			{/* Subtotal */}
			<div className="text-right shrink-0">
				<div className="text-sm font-bold text-orange-600">{formatPrice(totalPrice)} đ</div>
				{sale > 0 && (
					<div className="text-[11px] text-gray-400 line-through">
						{formatPrice(price * quantity)} đ
					</div>
				)}
			</div>
		</div>
	)
}
