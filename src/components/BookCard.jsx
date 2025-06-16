import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { generatePath } from 'react-router-dom'
import { BOOK_DETAIL_PATH } from '../constants/path'
import { formatPrice } from '../utils/format'
import { useDispatch } from 'react-redux'
import { addToCart } from '../redux/actions/cartAction'

export default function BookCard({
	_id,
	thumbnailUrl,
	title,
	price,
	sale,
	sold,
}) {
	const [imgError, setImgError] = useState(false)
	const path = generatePath(BOOK_DETAIL_PATH, { id: _id })
	const dispatch = useDispatch()
	const fallbackImg = '/vite.svg'

	const addToCCartClick = (e) => {
		e.preventDefault()
		e.stopPropagation()
		dispatch(addToCart({ _id, thumbnailUrl, title, price, sale }, 1))
	}

	const discountPercentage = Math.floor(sale * 100)
	const discountedPrice = price * (1 - sale)

	return (
		<div className="group relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden border border-gray-100 max-w-sm mx-auto">
			{/* Discount Badge */}
			{sale > 0 && (
				<div className="absolute top-3 right-3 z-20">
					<div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
						-{discountPercentage}%
					</div>
				</div>
			)}

			{/* Book Image Container */}
			<Link to={path} className="block">
				<div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 aspect-[3/4] p-4">
					<img
						className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
						src={imgError ? fallbackImg : thumbnailUrl}
						alt={title}
						onError={() => setImgError(true)}
					/>
					
					{/* Overlay gradient on hover */}
					<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
				</div>
			</Link>

			{/* Book Details */}
			<div className="p-4 space-y-3">
				{/* Title */}
				<Link to={path}>
					<h3 className="font-semibold text-gray-800 text-sm leading-5 line-clamp-2 hover:text-orange-600 transition-colors duration-200 min-h-[2.5rem]">
						{title}
					</h3>
				</Link>

				{/* Price Section */}
				<div className="space-y-1">
					<div className="flex items-center space-x-2">
						<span className="text-lg font-bold text-orange-600">
							{formatPrice(discountedPrice)} đ
						</span>
						{sale > 0 && (
							<span className="text-sm text-gray-400 line-through">
								{formatPrice(price)} đ
							</span>
						)}
					</div>
				</div>

				{/* Sales Info */}
				<div className="flex items-center justify-between text-xs text-gray-500">
					<span>Đã bán {sold}</span>
					<div className="flex items-center space-x-1">
						<svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
							<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
						</svg>
						<span className="text-yellow-600 font-medium">4.5</span>
					</div>
				</div>

				{/* Progress Bar */}
				<div className="w-full bg-gray-200 rounded-full h-1.5">
					<div 
						className="bg-gradient-to-r from-orange-400 to-red-500 h-1.5 rounded-full transition-all duration-300"
						style={{ width: `${Math.min((sold / 100) * 100, 100)}%` }}
					></div>
				</div>

				{/* Add to Cart Button */}
				<button
					onClick={addToCCartClick}
					className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
				>
					<div className="flex items-center justify-center space-x-2">
						<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
							<path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
						</svg>
						<span>Thêm vào giỏ</span>
					</div>
				</button>
			</div>

			{/* Quick Actions on Hover */}
			<div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 space-y-2">
				<button className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors duration-200">
					<svg className="w-4 h-4 text-gray-600 hover:text-red-500" fill="currentColor" viewBox="0 0 20 20">
						<path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
					</svg>
				</button>
				<button className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors duration-200">
					<svg className="w-4 h-4 text-gray-600 hover:text-orange-500" fill="currentColor" viewBox="0 0 20 20">
						<path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
						<path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
					</svg>
				</button>
			</div>

			{/* Shimmer effect on hover */}
			<div className="absolute inset-0 -top-full group-hover:top-0 bg-gradient-to-b from-transparent via-white/20 to-transparent transform rotate-12 transition-all duration-700 opacity-0 group-hover:opacity-100 pointer-events-none"></div>
		</div>
	)
}