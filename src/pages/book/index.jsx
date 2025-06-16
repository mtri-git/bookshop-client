import React, { useEffect } from 'react'
import BookCard from '../../components/BookCard'
import Loading from '../../components/Loading'
import { useBooks } from '../../hooks/useBooks'

export default function Book() {
	const books = useBooks()

	useEffect(() => {
		// scroll to top when access this page
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		})
	}, [])

	return (
		<div className='bg-white min-h-screen px-2 sm:px-4 md:px-8 lg:px-16 py-4'>
			<div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6'>
				<label className='font-medium text-base mb-1 sm:mb-0'>Sắp xếp theo:</label>
				<select name='Sắp xếp theo' className='border rounded px-3 py-2 w-full sm:w-auto'>
					<option>Bán chạy nhất</option>
					<option>Mới nhất</option>
					<option>Cũ nhất</option>
					<option>Giá tốt nhất</option>
				</select>
			</div>
			<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6'>
				{books ? (
					books.map((book) => <BookCard key={book._id} {...book} thumbnailUrl={book.imageUrl} />)
				) : (
					<Loading />
				)}
			</div>
		</div>
	)
}
