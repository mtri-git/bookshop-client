import React from 'react'
import CartItem from '../components/CartItem'
import { v4 as uuidv4 } from 'uuid'
import { useSelector } from 'react-redux'
import { formatPrice } from '../utils/format'
import { useNavigate } from 'react-router-dom'
import { PAYMENT_PATH } from '../constants/path'

export default function Cart() {
	const cart = useSelector((state) => state.cart)
	const totalWithSale = cart.cart.reduce((acc, cartItem) => acc + (1 - cartItem.sale )*cartItem.price*cartItem.count, 0)
	const total = cart.cart.reduce((acc, cartItem) => acc + cartItem.price*cartItem.count, 0)
	
	const navigate = useNavigate()

	const onClickPayment = () => {
		navigate()
	}

	return (
		<main>
			<div className='mx-auto my-5 font-normal text-xl w-8/12'>
				<div className='flex gap-5 text-lg rounded-xl border'>
					<div className='flex-initial w-2/6 text-right p-5'>
						<span>Sản phẩm</span>
					</div>
					<div className='flex-initial text-right w-4/12 p-5'>
						<span>Số lượng</span>
					</div>
					<div className='flex-initial text-right pl-10 p-5'>
						<span>Thành tiền</span>
					</div>
				</div>
				<div className='border rounded-xl mt-5'>
					{cart ? (
						cart.cart.map((cartItem) => 
							<CartItem key={uuidv4()} {...cartItem} />
					)
					) : (
						<div>Đăng tải</div>
					)}
				</div>
			</div>
			<div className='text-center w-8/12 mx-auto'>
				<div className='p-4'>
					<span className='text-xl font-bold p-4 '>Thành tiền</span>
					<span className='text-xl font-bold text-red-600 p-4'>
						{formatPrice(totalWithSale)} đ
					</span>
					<span className='text-lg line-through font-bold text-gray-600 p-4'>
						{formatPrice(total)} đ
					</span>
				</div>
				<button className='bg-red-600 text-white text-xl px-5 py-2 rounded-xl w-full m-5'
						onClick={() => navigate(PAYMENT_PATH)}>
					Thanh toán
				</button>
			</div>
		</main>
	)
}
