import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import FlashSaleBanner from '../../components/BookDetail.jsx/FlashSaleBanner'
import { useQuery } from '../../hooks/useQuery'
import bookService from '../../services/bookService'

export default function BookDetail() {
	const { id } = useParams()
	const [book, setBook] = useState()

	useEffect(() => {
		window.scroll({
			top: 0,
			behavior: 'smooth',
		})

		bookService.getBookById(id).then((res) => {
			setBook(res.data.book)
		})
	}, [])

	// const { data, loading, error } = useQuery(
	// 	(id) => bookService.getBookById(id)
	// )
	console.log(id)
	console.log('Book detail', book)

	return (
		<main className='bg-gray-100 p-5 rounded'>
			<div className='flex rounded bg-white'>
				<div className='image-all width:auto ml-0'>
					<div className='main-image align-middle w-1/2 inline-block'>
						<img className='w-full' src={book?.imageUrl} />
					</div>
					<button></button>
				</div>

				<div className='book-detail p-2'>
					<h1 className='text-3xl align-middle'>{book?.title}</h1>
					<div className=' m-2 p-2'>
						<div className='sa1'>
							<div className='supplier inline'>
								<span>Nhà cung cấp: </span>
								<span className='font-bold mr-5'>
									Minh Long
								</span>
							</div>
							<div className='author inline'>
								<span className=''>Tác giả:</span>
								<span className='font-bold'>Hoa Dương</span>
							</div>
						</div>
						<div className='sa2'>
							<div className='publisher inline'>
								<span>Nhà xuất bản:</span>
								<span className='font-bold mr-5'>
									NXB Phụ Nữ
								</span>
							</div>
							<div className='cover inline'>
								<span>Hình thức bìa:</span>
								<span className='font-bold'>Bìa Mềm</span>
							</div>
						</div>
					</div>
					<div>
						<FlashSaleBanner
							price={book?.price}
							sale={book?.sale}
						/>
					</div>
				</div>
			</div>

			<div className='info-detail bg-white rounded mt-5'>
				<h1 className='font-bold'>Thông tin sản phẩm</h1>
				<table></table>
				<div className='description'>{book?.description}</div>
			</div>
		</main>
	)
}
