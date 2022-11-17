import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import BookCard from '../../components/BookCard'

export default function Search() {
	useEffect(() => {
		// scroll to top when access this page
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		})
	}, [])

	const book = {
		_id: '12',
		thumbnailUrl:
			'https://cdn0.fahasa.com/media/catalog/product/i/m/image_195509_1_29246.jpg',
		title: 'Dạy sao cho trẻ nghe lời',
		price: 70000,
		sale: 0.3,
		sold: 10,
	}

	const [searchParams] = useSearchParams()

	return (
		<main>
			{/* filter */}
			<div className='filter-group flex gap-5 pl-5'>
				<div>
					<label>Sắp xếp theo: </label>
					<select name='Sắp xếp theo'>
						<option>Bán chạy nhất</option>
						<option>Mới nhất</option>
						<option>Cũ nhất</option>
						<option>Giá tốt nhất</option>
					</select>
				</div>

				<div>
					<label>Thể loại: </label>
					<select name='Sắp xếp theo'>
						<option>Bán chạy nhất</option>
						<option>Mới nhất</option>
						<option>Cũ nhất</option>
						<option>Giá tốt nhất</option>
					</select>
				</div>
			</div>

			<div className='text-2xl text-center p-5'>
				<span>Kết quả tìm kiếm cho: </span>
				<span className='font-bold text-orange-500'>
					"{searchParams.get('q')}"
				</span>
			</div>
			<div className='p-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-8'>
				<BookCard key={uuidv4()} {...book} />
				<BookCard key={uuidv4()} {...book} />
				<BookCard key={uuidv4()} {...book} />
				<BookCard key={uuidv4()} {...book} />
				<BookCard key={uuidv4()} {...book} />
				<BookCard key={uuidv4()} {...book} />
				<BookCard key={uuidv4()} {...book} />
				<BookCard key={uuidv4()} {...book} />
				<BookCard key={uuidv4()} {...book} />
				<BookCard key={uuidv4()} {...book} />
				<BookCard key={uuidv4()} {...book} />
			</div>
			
		</main>
	)
}
