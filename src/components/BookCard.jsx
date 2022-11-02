import React from 'react'
import { Link } from 'react-router-dom'
import { generatePath } from 'react-router-dom'
import { BOOK_DETAIL_PATH } from '../constants/path'

export default function BookCard({
	thumbnailUrl,
	title,
	price,
	salePrice,
	sold,
}) {
	//
	const path = generatePath(BOOK_DETAIL_PATH, { id: title })
	return (
        <div className='p-1 m-1 hover:shadow-xl'>
		<Link className='hover:shadow' to={path}>
			<div className='bg-orange-500 rounded-full px-1 py-2 m-1 text-white font-bold absolute text-right top-0 right-0'>
				<span>47%</span>
			</div>
			<div className='book-content'>
				<div>
					<div className='image-container'>
						<img src={thumbnailUrl} alt='Image' />
					</div>
				</div>
				<h2 className='text-center'>{title}</h2>
				<div className='w-60'>
					<div className=' text-orange-500 pl-4'>{price} đ</div>
					<div className='line-through text-gray-400 pl-4'>
						{salePrice} đ
					</div>
				</div>
				<div className='progress bg-orange-500 rounded-full text-center m-3'>
					<span className='text-white'>Đã bán {sold}</span>
					<div className='progress-bar progress bg-red-500 rounded-full content-center m-3 w-full'></div>
				</div>
			</div>
		</Link>
        </div>
	)
}
