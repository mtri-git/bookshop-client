import React, { useEffect } from 'react'
import BookCard from '../components/BookCard'
import { v4 as uuidv4 } from 'uuid'
import Slider from '../components/Slider'

export default function Home() {
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
	return (
		<main className='homepage'>
			<div className='p-10 w-10/12 m-auto'>
				<Slider/>
			</div>
			<div className='wrapper divide-y'>
				<div className='grid gap-4 p-5 m-5 sm:grid sm:grid-cols-5'>
					<h2 className='text-4xl font-bold text-center pt-5 sm:grid-cols-2 sm:col-span-5'>
						Mới nhất
					</h2>
					<BookCard key={uuidv4()} {...book} />
					<BookCard key={uuidv4()} {...book} />
					<BookCard key={uuidv4()} {...book} />
					<BookCard key={uuidv4()} {...book} />
					<BookCard key={uuidv4()} {...book} />
					<BookCard key={uuidv4()} {...book} />
					<BookCard key={uuidv4()} {...book} />
				</div>

				<div className='grid gap-4 p-5 m-5 sm:grid sm:grid-cols-5'>
					<h2 className='text-4xl font-bold text-center pt-5 sm:grid-cols-2 sm:col-span-5'>
						Bán chạy nhất
					</h2>
					<BookCard {...book} />
					<BookCard {...book} />
					<BookCard {...book} />
					<BookCard {...book} />
				</div>
			</div>
		</main>
	)
}
