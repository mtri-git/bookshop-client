import React from 'react'
import { useBookQuantityDetail } from '../../hooks/useBookQuantityDetail'

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
						<svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
							<path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
						</svg>
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
						<svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
							<path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
						</svg>
					</button>
				</div>
			</div>
			
			{/* Warning message for large quantities */}
			{quantity > 10 && (
				<div className="flex items-center gap-2 text-sm text-amber-600 bg-amber-50 px-3 py-2 rounded-lg border border-amber-200">
					<svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
						<path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
					</svg>
					<span className="font-medium">Số lượng lớn - Vui lòng kiểm tra tồn kho</span>
				</div>
			)}
			
			{/* Stock availability info */}
			<div className="flex items-center gap-2 text-xs text-gray-500">
				<svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
					<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
				</svg>
				<span>Còn hàng - Giao hàng trong 24h</span>
			</div>
		</div>
	)
}