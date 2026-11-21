import React from 'react'
import QuantityBoxDetail from './QuantityBoxDetail'

export default function FlashSaleBanner({
	sale = 0,
	price = 0,
	sold = 10,
}) {
	const formatPrice = (val) =>
		Number(val || 0).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.')
	
	const discountAmount = Math.floor(price * sale)
	const discountedPrice = Math.floor(price * (1 - sale))
	const percent = Math.floor(sale * 100)

	return (
		<div className="w-full flex flex-col gap-4">
			{/* Price Section */}
			<div className="flex flex-col gap-1.5 pb-4 border-b border-gray-200">
				<div className="flex flex-wrap items-baseline gap-3">
					<span className="text-3xl sm:text-4xl text-red-600 font-extrabold tracking-tight">
						{formatPrice(discountedPrice)} đ
					</span>
					{sale > 0 && (
						<>
							<span className="text-base text-gray-400 line-through">
								{formatPrice(price)} đ
							</span>
							<span className="px-2 py-0.5 text-xs font-bold bg-red-600 text-white rounded">
								-{percent}%
							</span>
						</>
					)}
				</div>

				{sale > 0 && (
					<p className="text-xs text-emerald-700 font-medium flex items-center gap-1">
						<svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
							<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
						</svg>
						Tiết kiệm: {formatPrice(discountAmount)} đ so với giá bìa
					</p>
				)}
			</div>

			{/* Flash Sale Deal Status */}
			<div className="bg-red-50/70 border border-red-200 rounded-lg p-3">
				<div className="flex items-center justify-between text-xs mb-1.5">
					<span className="font-bold text-red-600 flex items-center gap-1.5">
						<span>⚡ Flash Sale</span>
						<span className="text-gray-500 font-normal">| Số lượng có hạn</span>
					</span>
					<span className="text-gray-600 font-medium">Đã bán {sold}</span>
				</div>
				<div className="w-full bg-red-200/80 rounded-full h-2 overflow-hidden">
					<div
						className="bg-red-600 h-full rounded-full transition-all duration-300"
						style={{ width: `${Math.min(Math.max((sold / 100) * 100, 15), 100)}%` }}
					/>
				</div>
			</div>

			{/* Quantity Selector */}
			<div className="pt-1">
				<QuantityBoxDetail />
			</div>
		</div>
	)
}
