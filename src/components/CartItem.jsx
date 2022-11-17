import React from 'react'
import QuantityBox from './BookDetail.jsx/QuantityBox'
import { formatPrice } from '../utils/format'
import { useDispatch } from 'react-redux'
import { removeFromCart } from '../redux/actions/cartAction'
import CustomDialog from './CustomDialog'
import { useState } from 'react'

export default function CartItem({
	_id,
	thumbnailUrl,
	title,
	price,
	sale,
	count,
}) {
	const dispatch = useDispatch()

	const onRemoveFromCart = () => {
		dispatch(removeFromCart(_id))
	}

	const [dialogIsOpen, setDialogIsOpen] = useState(false)

	const onOpenDialog = () => {
		setDialogIsOpen(true)
	}
	return (
		<>
		<CustomDialog open={dialogIsOpen} title='Xóa sản phẩm' content='Bạn có muốn xóa sản phẩm khỏi giỏ hàng?' onClick={onRemoveFromCart}/>
			<div className='wrapper w-7/1 h-7/12 m-auto'>
				<div className='container flex items-end py-4 gap-4 m-auto justify-center'>
					<div className='check-box-container'>
						<input
							type='checkbox'
							className='accent-red-500 w-5 h-4 mt-4 flex-1'
						/>
					</div>
					<div className='image-container h-44 w-44 flex-2'>
						<img src={thumbnailUrl} />
					</div>
					<div className='info px-2 flex-2 w-64'>
						<div className='pb-4'>
							<h2 className='text-xl max-w-xs'>
								<a>{title}</a>
							</h2>
						</div>
						<div className='cart-price pt-20 w-44 flex-1'>
							<div className='price-origin px-2 inline  font-medium text-xl'>
								<span>{formatPrice(price * (1 - sale))}</span>
							</div>
							<div className='price-old px-2 inline line-through text-gray-500 flex-1'>
								<span>{formatPrice(price)} đ</span>
							</div>
						</div>
					</div>
					<div className='cart-number align-text-bottom pt-40 flex-2'>
						<QuantityBox
							product_id={_id}
							className='pl-3 inline bottom-0'
							count={count}
						/>
					</div>
					<div className='price-total pl-2 inline bottom-0 text-red-500 font-bold text-xl flex-1'>
						{formatPrice(price * count)}
					</div>
					<div className='flex-1'>
						<img
							onClick={onRemoveFromCart}
							className='w-10 cursor-pointer'
							src='/icons/trashcan-icon.svg'
						/>
					</div>
				</div>
			</div>
		</>
	)
}
