import React from 'react'
import QuantityBoxDetail from './QuantityBoxDetail'

export default function FlashSaleBanner({
	sale = 0,
	price = 0
}) {
	const formatPrice = (string) =>
		string.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.')
	
	return (
		<div className='w-full flex flex-col gap-4 sm:gap-6'>
			{/* Progress Bar Section */}
			<div className='w-full'>
				<div className='flex items-center justify-between mb-3'>
					<div className='flex items-center'>
						<svg className="w-5 h-5 text-orange-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
							<path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
						</svg>
						<span className="text-sm font-semibold text-gray-700">Flash Sale</span>
					</div>
					<span className="text-xs text-gray-500">Còn lại: 90</span>
				</div>
				
				<div className='relative h-8 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg overflow-hidden shadow-sm border'>
					<div
						className='absolute top-0 left-0 h-full bg-gradient-to-r from-orange-400 to-red-500 transition-all duration-300 ease-out'
						style={{ width: '20%' }}
						aria-label="Đã bán 20%">
					</div>
					<div className='absolute inset-0 flex items-center justify-center font-medium text-sm text-gray-800 drop-shadow-sm'>
						Đã bán: 10
					</div>
				</div>
			</div>
			
			{/* Price Section */}
			<div className='w-full'>
				<div className='flex flex-wrap items-center gap-2 sm:gap-3 mb-2'>
					<span className='text-2xl sm:text-3xl lg:text-4xl text-red-600 font-bold leading-tight'>
						{formatPrice(Math.floor(price * (1 - sale)))}đ
					</span>
					<span className='text-base sm:text-lg text-gray-500 line-through'>
						{formatPrice(price)}đ
					</span>
					<span className='px-2 py-1 text-xs sm:text-sm font-bold bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-md shadow-sm'>
						-{Math.floor(sale * 100)}%
					</span>
				</div>
				
				<div className='flex items-center'>
					<svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
						<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
					</svg>
					<span className="text-sm text-green-600 font-medium">
						Tiết kiệm: {formatPrice(Math.floor(price * sale))}đ
					</span>
				</div>
			</div>
			
			{/* Quantity Control Section */}
			<div className='w-full'>
				<QuantityBoxDetail/>
			</div>
		</div>
	)
}