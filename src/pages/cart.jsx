import React from 'react'
import CartItem from '../components/CartItem'

export default function Cart() {
	return (

		<main>
			<div className='mx-auto my-5 font-normal text-xl w-8/12'>
				<div className='flex gap-5 text-lg rounded-xl border'>
					<div className='flex-initial w-2/6 text-right p-5'><span>Sản phẩm</span></div>
					<div className='flex-initial text-right w-4/12 p-5'><span>Số lượng</span></div>
					<div className='flex-initial text-right pl-10 p-5'><span>Thành tiền</span></div>
				</div>
				<div className='border rounded-xl mt-5'>
				<CartItem />
				<CartItem />
				<CartItem />
				</div>
			</div>
			<div className='text-center w-8/12 mx-auto'>
				<div className='p-4'>
					<span className='text-xl font-bold p-4 '>Thành tiền</span>
					<span className='text-xl font-bold text-red-600 p-4'>200.000đ</span>
				</div>
				<button className='bg-red-600 text-white text-xl px-5 py-2 rounded-xl w-full m-5'>Thanh toán</button>
			</div>
		</main>
	)
}
