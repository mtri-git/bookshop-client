import React from 'react'
import { useDispatch } from 'react-redux'
import { decreaseCartItemQuantity, increaseCartItemQuantity } from '../../redux/actions/cartAction'
import Icon from '../Icon'

export default function QuantityBox({ className = '', product_id, count = 1 }) {
	const dispatch = useDispatch()

	const onIncrease = (e) => {
		e.stopPropagation()
		dispatch(increaseCartItemQuantity(product_id))
	}

	const onDecrease = (e) => {
		e.stopPropagation()
		if (count > 1) {
			dispatch(decreaseCartItemQuantity(product_id))
		}
	}

	return (
		<div className={`inline-flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white shadow-xs ${className}`}>
			<button
				type="button"
				onClick={onDecrease}
				disabled={count <= 1}
				aria-label="Giảm số lượng"
				className={`w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center transition-colors ${
					count <= 1
						? 'text-gray-300 bg-gray-50 cursor-not-allowed'
						: 'text-gray-600 hover:bg-gray-100 hover:text-orange-600 active:bg-gray-200'
				}`}
			>
				<Icon name='minus' className="w-3.5 h-3.5" />
			</button>

			<span className="w-8 sm:w-10 text-center text-xs sm:text-sm font-semibold text-gray-800 select-none">
				{count}
			</span>

			<button
				type="button"
				onClick={onIncrease}
				aria-label="Tăng số lượng"
				className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 hover:text-orange-600 active:bg-gray-200 transition-colors"
			>
				<Icon name='plus' className="w-3.5 h-3.5" />
			</button>
		</div>
	)
}
