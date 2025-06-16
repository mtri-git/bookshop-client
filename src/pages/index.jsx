import React, { useEffect, Suspense } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Slider from '../components/Slider'
import Loading from '../components/Loading'
import bookService from '../services/bookService'
import { useState } from 'react'
import { lazy } from 'react'

const BookCard = lazy(() => import('../components/BookCard'))

export default function Home() {
	// const books = useBooks()
	const [books, setBooks] = useState([])
	const [bestSellerBook, setBestSellerBook] = useState([])

	const fetchNewBook = async () => {
		const data = await bookService.getNewBook()
		setBooks(data.data.book)
	}
	const fetchBestSeller = async () => {
		const data = await bookService.getBestSellerBook()
		setBestSellerBook(data.data.book)
	}


	useEffect(() => {
		// scroll to top when access this page
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		})
		document.title = 'BookShop - Trang chủ'
		fetchNewBook()
		fetchBestSeller()
	}, [])


	return (
		<main className="homepage pb-8 bg-white rounded-xl min-h-screen">
			{/* Responsive flex: column on mobile, row on md+ */}
			<div className="flex flex-col md:flex-row gap-4 md:gap-8 justify-between items-center md:items-stretch p-4 md:p-10">
				<div className="w-full md:w-2/3 lg:w-3/5 h-auto md:h-[400px]">
					<div className="w-full h-full">
						<Slider />
					</div>
				</div>
				<div className="flex flex-col gap-4 w-full md:w-1/3 lg:w-2/5 h-auto md:h-[400px]">
					<div className="flex-1">
						<img className="rounded-lg w-full h-full object-cover" src="https://cdn0.fahasa.com/media/wysiwyg/Thang-12-2022/Branday_flashsale_Sub%20banner_392x156.jpg" alt="Banner 1" />
					</div>
					<div className="flex-1">
						<img className="rounded-lg w-full h-full object-cover" src="https://cdn1.fahasa.com/media/wysiwyg/Thang-06-2025/ThanhToanKhongTienMat_Resize_392x156.png" alt="Banner 2" />
					</div>
				</div>
			</div>
			<div className="wrapper divide-y">
				<div className="p-4 md:p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-8">
					<h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center pt-2 sm:pt-5 col-span-full">
						Mới nhất
					</h2>
					{books ? (
						<Suspense fallback={<div className="col-span-full"><Loading /></div>}>
							{books.map((book) => (
								<BookCard key={uuidv4()} {...book} thumbnailUrl={book.imageUrl} />
							))}
						</Suspense>
					) : (
						<div className="col-span-full">
							<Loading />
						</div>
					)}
				</div>

				<div className="px-4 md:px-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5">
					<h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center pt-2 sm:pt-5 col-span-full">
						Bán chạy nhất
					</h2>					{bestSellerBook ? (
						<Suspense fallback={<div className="col-span-full"><Loading /></div>}>
							{bestSellerBook.map((book) => (
								<BookCard key={uuidv4()} {...book} thumbnailUrl={book.imageUrl} />
							))}
						</Suspense>
					) : (
						<div className="col-span-full">
							<Loading />
						</div>
					)}
				</div>
			</div>
		</main>
	)
}
