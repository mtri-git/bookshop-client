import React, { useEffect } from 'react'
import BookCard from '../components/BookCard'
import { v4 as uuidv4 } from 'uuid'
import Slider from '../components/Slider'
import { useBooks } from '../hooks/useBooks'
import Loading from '../components/Loading'
import { useTotalCartItem } from '../redux/selectors/useTotalCartItem'

export default function Home() {
	const books = useBooks()
	const total = useTotalCartItem()
	console.log('total ITem: ', total);
	useEffect(() => {
		// scroll to top when access this page
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		})
	}, [])

	const book = {
		_id:"12",
		thumbnailUrl:
			'https://cdn0.fahasa.com/media/catalog/product/i/m/image_195509_1_29246.jpg',
		title: 'Dạy sao cho trẻ nghe lời',
		price: 70000,
		sale: 0.3,
		sold: 10,
	}
	return (
		<main className='homepage pb-20'>
			<div className='p-10 w-full h-9/12 sm:h-1/12 m-auto'>
				<Slider />
			</div>
			<div className='wrapper divide-y'>
				<div className='p-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-8'>
					<h2 className='text-2xl lg:text-3xl font-bold text-center pt-5 col-span-full'>
						Mới nhất
					</h2>
					{books ? (
						books.map((book) => (
							<BookCard key={uuidv4()} {...book} thumbnailUrl={book.imageUrl} />
						))
					) 
					: 
					(
						<div className='col-span-full'>
							<Loading/>
						</div>
					)}
				</div>

				<div className='px-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-5'>
					<h2 className='text-3xl font-bold text-center pt-5 col-span-full'>
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
