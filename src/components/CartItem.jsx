import React from 'react'
import QuantityBox from './BookDetail.jsx/QuantityBox'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

export default function CartItem() {
	return (
		<div className='wrapper border-y-2 w-10/12 m-auto'>
			<div className='container flex py-4 gap-4 m-auto justify-center'>
				<div className='check-box-container'>
					<input type='checkbox' className='accent-red-500 w-5 h-4 mt-4' />
				</div>
				<div className='image-container h-52 w-52'>
					<img
						className='w-full h-full'
						src='https://cdn0.fahasa.com/media/catalog/product//8/9/8935251416084.jpg'
					/>
				</div>
				<div className='info px-2'>
					<div className='pb-4'>
						<h2 className='text-xl max-w-xs'>
							<a>Title Lorem ipsum dolor sit amet consectetur .</a>
						</h2>
					</div>
					<div className='cart-price pt-28 w-44'>
						<div className='price-origin px-2 inline  font-medium text-xl'>
							<span>100.000đ</span>
						</div>
						<div className='price-old px-2 inline line-through text-gray-500'>
							<span>200.000đ</span>
						</div>
					</div>
				</div>
				<div className='cart-number align-text-bottom pt-40'>
					<QuantityBox className='pl-3 inline bottom-0' />
					<div className='price-total pl-2 inline bottom-0 text-red-500 font-bold text-xl'>200.000 đ</div>
				</div>
				<div className='remove pt-40 text-red-500'>
					<FontAwesomeIcon icon={faTrashCan} />
				</div>
			</div>
		</div>
	)
}
