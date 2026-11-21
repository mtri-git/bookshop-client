import React, { useState } from 'react'
import { Link, generatePath } from 'react-router-dom'
import { BOOK_DETAIL_PATH } from '../constants/path'
import { formatPrice } from '../utils/format'
import { useDispatch } from 'react-redux'
import { addToCart } from '../redux/actions/cartAction'
import { toast_success } from '../utils/toastNotify'

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

	const discountPercentage = Math.floor(sale * 100)
	const discountedPrice = price * (1 - sale)

	return (
		<div className="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 flex flex-col h-full overflow-hidden hover:border-gray-300">
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
					<svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
						<path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
					</svg>
				</button>
			</div>

			{/* Book Image */}
			<Link to={path} className="block relative bg-gray-50/70 p-3 aspect-[3/4] border-b border-gray-100 flex items-center justify-center">
				<img
					className="w-full h-full object-contain transition-transform duration-200 group-hover:scale-105"
					src={imgError || !thumbnailUrl ? fallbackImg : thumbnailUrl}
					alt={title}
					onError={() => setImgError(true)}
					loading="lazy"
				/>
				{category && (
					<span className="absolute bottom-2 left-2 bg-white text-gray-600 text-[10px] px-1.5 py-0.5 rounded border border-gray-200 font-medium">
						{category}
					</span>
				)}
			</Link>

			{/* Content */}
			<div className="p-3 flex flex-col flex-1 justify-between gap-2">
				<div>
					{author && (
						<p className="text-[11px] text-gray-500 line-clamp-1 mb-0.5">
							{author}
						</p>
					)}
					<Link to={path}>
						<h3 className="font-medium text-gray-900 text-xs sm:text-sm leading-snug line-clamp-2 hover:text-orange-600 transition-colors duration-150 min-h-[2.4rem]">
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
							<svg className="w-3.5 h-3.5 text-amber-400 fill-current" viewBox="0 0 20 20">
								<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
							</svg>
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
					className="w-full mt-1 bg-white hover:bg-orange-600 text-orange-600 hover:text-white font-medium py-1.5 px-3 rounded-lg transition-colors duration-150 flex items-center justify-center gap-1.5 text-xs border border-orange-300 hover:border-orange-600 shadow-sm active:scale-95"
				>
					<svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
						<path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
					</svg>
					<span>Thêm giỏ hàng</span>
				</button>
			</div>
		</div>
	)
}
