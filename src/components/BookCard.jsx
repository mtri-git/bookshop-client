import React, { useState } from 'react'
import { Link, generatePath } from 'react-router-dom'
import { BOOK_DETAIL_PATH } from '../constants/path'
import { formatPrice } from '../utils/format'
import { useDispatch } from 'react-redux'
import { addToCart } from '../redux/actions/cartAction'
import { toast_success } from '../utils/toastNotify'
import Icon from './Icon'

export default function BookCard({
	_id,
	thumbnailUrl,
	title,
	price,
	sale = 0,
	sold = 0,
	author,
	category,
}) {
	const [imgError, setImgError] = useState(false)
	const [isLiked, setIsLiked] = useState(false)
	const path = generatePath(BOOK_DETAIL_PATH, { id: _id || '1' })
	const dispatch = useDispatch()
	const fallbackImg = 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400'

	const addToCartClick = (e) => {
		e.preventDefault()
		e.stopPropagation()
		dispatch(addToCart({ _id, thumbnailUrl: imgError ? fallbackImg : (thumbnailUrl || fallbackImg), title, price, sale }, 1))
		toast_success(`Đã thêm "${title?.slice(0, 25)}..." vào giỏ!`)
	}

	const toggleLike = (e) => {
		e.preventDefault()
		e.stopPropagation()
		setIsLiked(!isLiked)
		if (!isLiked) {
			toast_success('Đã lưu vào danh sách yêu thích!')
		}
	}

	const categoryLabel = (Array.isArray(category) ? category.find(Boolean) : category) || ''
	const discountPercentage = Math.round(sale * 100)
	const discountedPrice = price * (1 - sale)

	return (
		<div className="group relative min-w-0 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 flex flex-col h-full overflow-hidden hover:border-gray-300">
			{/* Top Badges */}
			<div className="absolute top-2 left-2 right-2 z-10 flex items-center justify-between pointer-events-none">
				{sale > 0 ? (
					<span className="bg-red-600 text-white px-2 py-0.5 rounded text-xs font-bold pointer-events-auto shadow-sm">
						-{discountPercentage}%
					</span>
				) : (
					<span />
				)}

				<button
					onClick={toggleLike}
					className={`p-1.5 rounded-full shadow-sm transition-colors duration-150 pointer-events-auto border ${
						isLiked
							? 'bg-red-50 text-red-500 border-red-200'
							: 'bg-white/90 text-gray-400 border-gray-200 hover:text-red-500 hover:bg-white'
					}`}
					title={isLiked ? 'Bỏ yêu thích' : 'Yêu thích'}
				>
					<Icon name='heart-solid' className="w-3.5 h-3.5" />
				</button>
			</div>

			{/* Book Image */}
			<Link to={path} className="block relative bg-gray-50/70 aspect-[3/4] border-b border-gray-100 overflow-hidden">
				<img
					className="absolute inset-0 w-full h-full p-3 object-contain transition-transform duration-200 group-hover:scale-105"
					src={imgError || !thumbnailUrl ? fallbackImg : thumbnailUrl}
					alt={title}
					onError={() => setImgError(true)}
					loading="lazy"
				/>
				{categoryLabel && (
					<span className="absolute bottom-2 left-2 bg-white text-gray-600 text-[10px] px-1.5 py-0.5 rounded border border-gray-200 font-medium">
						{categoryLabel}
					</span>
				)}
			</Link>

			{/* Content */}
			<div className="p-3 flex flex-col flex-1 justify-between gap-2">
				<div>
					<p className="text-[11px] text-gray-500 line-clamp-1 mb-0.5 min-h-[1rem]">
						{author || ' '}
					</p>
					<Link to={path}>
						<h3 className="font-medium text-gray-900 text-xs sm:text-sm leading-snug line-clamp-2 hover:text-orange-600 transition-colors duration-150 min-h-[2.0625rem] sm:min-h-[2.40625rem]">
							{title}
						</h3>
					</Link>
				</div>

				{/* Price and Ratings */}
				<div className="space-y-1 pt-1.5 border-t border-gray-100">
					<div className="flex items-baseline gap-1.5 flex-wrap">
						<span className="text-sm sm:text-base font-bold text-red-600">
							{formatPrice(discountedPrice)} đ
						</span>
						{sale > 0 && (
							<span className="text-[11px] text-gray-400 line-through">
								{formatPrice(price)} đ
							</span>
						)}
					</div>

					<div className="flex items-center justify-between text-[11px] text-gray-500">
						<div className="flex items-center gap-1">
							<Icon name='star-solid' className="w-3.5 h-3.5 text-amber-400" />
							<span className="font-medium text-gray-700">4.9</span>
						</div>
						<span>Đã bán {sold}</span>
					</div>

					{/* Progress bar */}
					<div className="w-full bg-gray-100 rounded-full h-1 overflow-hidden">
						<div
							className="bg-orange-500 h-full rounded-full transition-all duration-300"
							style={{ width: `${Math.min(Math.max((sold / 2000) * 100, 15), 100)}%` }}
						/>
					</div>
				</div>

				{/* Add to Cart button */}
				<button
					onClick={addToCartClick}
					className="w-full mt-1 bg-white hover:bg-orange-600 text-orange-600 hover:text-white font-medium py-1.5 px-2 rounded-lg transition-colors duration-150 flex items-center justify-center gap-1 text-xs whitespace-nowrap border border-orange-300 hover:border-orange-600 shadow-sm active:scale-95"
				>
					<Icon name='cart' className="w-3.5 h-3.5" />
					<span>Thêm giỏ hàng</span>
				</button>
			</div>
		</div>
	)
}
