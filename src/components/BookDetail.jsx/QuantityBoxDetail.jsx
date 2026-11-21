import React from 'react'
import { useBookQuantityDetail } from '../../hooks/useBookQuantityDetail'
import Icon from '../Icon'

export default function QuantityBoxDetail() {
	const {quantity, setQuantity} = useBookQuantityDetail()
	
	const onIncrease = () => {
		setQuantity(quantity + 1)
	}
	
	const onDecrease = () => {
		if (quantity > 1) setQuantity(quantity - 1)
	}

	return (
		<div className='flex flex-col gap-3'>
			{/* Main quantity selector */}
			<div className='flex items-center gap-3'>
				<label className='text-sm font-semibold text-gray-700 min-w-fit'>
					Số lượng:
				</label>
				
				<div className='flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm hover:border-orange-400 focus-within:ring-2 focus-within:ring-orange-200 focus-within:border-orange-500 transition-all duration-200'>
					<button
						className={`w-10 h-10 flex items-center justify-center text-gray-600 transition-all duration-150 focus:outline-none ${
							quantity <= 1 
								? 'bg-gray-50 text-gray-400 cursor-not-allowed' 
								: 'bg-gray-50 hover:bg-gray-100 active:bg-gray-200'
						}`}
						onClick={onDecrease}
						aria-label="Giảm số lượng"
						disabled={quantity <= 1}
					>
						<Icon name='minus' className="h-4 w-4" />
					</button>
					
					<div className='flex items-center justify-center w-16 h-10 bg-white border-x border-gray-200'>
						<input
							id='quantity-input'
							className='w-full h-full text-center bg-transparent text-gray-800 font-medium focus:outline-none text-sm'
							value={quantity}
							readOnly
							aria-label="Số lượng sản phẩm"
						/>
					</div>
					
					<button
						className='w-10 h-10 flex items-center justify-center bg-gray-50 hover:bg-gray-100 active:bg-gray-200 text-gray-600 transition-all duration-150 focus:outline-none'
						onClick={onIncrease}
						aria-label="Tăng số lượng"
					>
						<Icon name='plus' className="h-4 w-4" />
					</button>
				</div>
			</div>
			
			{/* Warning message for large quantities */}
			{quantity > 10 && (
				<div className="flex items-center gap-2 text-sm text-amber-600 bg-amber-50 px-3 py-2 rounded-lg border border-amber-200">
					<Icon name='exclamation-solid' className="w-4 h-4 flex-shrink-0" />
					<span className="font-medium">Số lượng lớn - Vui lòng kiểm tra tồn kho</span>
				</div>
			)}
			
			{/* Stock availability info */}
			<div className="flex items-center gap-2 text-xs text-gray-500">
				<Icon name='check-circle-solid' className="w-3 h-3 text-green-500" />
				<span>Còn hàng - Giao hàng trong 24h</span>
			</div>
		</div>
	)
}