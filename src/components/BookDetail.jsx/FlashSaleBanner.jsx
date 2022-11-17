import React from 'react'
import CountDown from './CountDown'
import QuantityBox from './QuantityBox'

export default function FlashSaleBanner({ sale = 0, price = 0 }) {
	const formatPrice = (string) =>
		string.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.')

	return (
		<div className='flash-sale'>
			<div className='flashsale-product'>
				{/* <div className='flash-sale-banner'>
					<img src='https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/flashsale/label-flashsale.svg?q=101564' />
					<CountDown />
				</div> */}
				<div className='flash-sale-last'>
					<div
						className='progress-bar'
						style={{ width: '20%' }}></div>
					<div className='bg-orange-400 text-center text-white w-8/12 rounded-xl mx-auto'>Đã bán: 10</div>
				</div>
			</div>
			<div className='price-box-block'>
				<div className='price-box pb-2'>
					<span className='special m-2 text-3xl text-red-600 font-bold'>
						{formatPrice(price)}đ
					</span>
					<span className='old m-2 line-through'>
						{formatPrice(price * (1 - sale))}đ
					</span>
					<span className='discount m-2 p-0.5 text-center bg-red-500 text-white font-bold rounded'>
						-{sale * 100}%
					</span>
				</div>
			</div>
			<QuantityBox />
			<div>
				{/* <div className='message-error'>Hết hàng</div> */}
				<div className='button-handle flex gap-5'>
					<button className=' border border-red-600 text-red-500 rounded-md p-1'>
            <i class='fa fa-shopping-cart' aria-hidden='true'></i>
						Thêm vào giỏ hàng
					</button>
					<button className='bg-red-500 text-white p-1 rounded-md'>
						<span> Mua ngay</span>
					</button>
				</div>
			</div>
		</div>
	)
}
