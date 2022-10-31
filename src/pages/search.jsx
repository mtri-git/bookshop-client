import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import BookCard from '../components/BookCard'

export default function Search() {
	useEffect(() => {
		// scroll to top when access this page
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		})
	}, [])

	const book = {
		thumbnailUrl:
			'https://cdn0.fahasa.com/media/catalog/product/i/m/image_195509_1_29246.jpg',
		title: 'Dạy sao cho trẻ nghe lời',
		price: '70.000',
		salePrice: '80.000',
		sold: '10',
	}

	const [searchParams] = useSearchParams()

	return (
		<main>
			<div className='text-2xl text-center p-5'>
				<span>Kết quả tìm kiếm cho: </span>
				<span className='font-bold text-orange-500'>
					"{searchParams.get('q')}"
				</span>
			</div>
			<div className='grid gap-4 p-5 m-5 sm:grid sm:grid-cols-5'>
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
				<BookCard key={uuidv4()} {...book} />
				<BookCard key={uuidv4()} {...book} />
				<BookCard key={uuidv4()} {...book} />
			</div>
		</main>
	)
}
