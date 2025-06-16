import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import BookCard from '../../components/BookCard'
import FlashSaleBanner from '../../components/BookDetail.jsx/FlashSaleBanner'
import Loading from '../../components/Loading'
import { addToCart } from '../../redux/actions/cartAction'
import bookService from '../../services/bookService'
import { v4 as uuidv4 } from 'uuid'
import {
	BookQuantityProvider,
	useBookQuantityDetail,
} from '../../hooks/useBookQuantityDetail'
import DescriptionBox from '../../components/DescriptionBox'
import ImageModal from '../../components/ImageModal'

export default function BookDetail() {
	const { id } = useParams()
	const [book, setBook] = useState()
	const { quantity } = useBookQuantityDetail()
	const [bestSellerBook, setBestSellerBook] = useState([])
	const [isShowImage, setIsShowImage] = useState(false)

	const dispatch = useDispatch()

	const fetchBestSeller = async () => {
		const data = await bookService.getBestSellerBook()
		setBestSellerBook(data.data.book)
	}

	useEffect(() => {
		const onScroll = () => {
			if (!isShowImage) {
				setIsShowImage(false)
			}
		}
		// clean up code
		window.removeEventListener('scroll', onScroll)
		window.addEventListener('scroll', onScroll, { passive: true })
		return () => window.removeEventListener('scroll', onScroll)
	}, [])

	console.log(isShowImage);

	useEffect(() => {
		window.scroll({
			top: 0,
			behavior: 'smooth',
		})

		bookService.getBookById(id).then((res) => {
			setBook(res.data.book)
		})

		fetchBestSeller()
	}, [id])

	const addToCartClick = () => {
		const { _id, imageUrl: thumbnailUrl, title, price, sale } = book
		dispatch(addToCart({ _id, thumbnailUrl, title, price, sale }, quantity))
	}

	return (
		<>
			<ImageModal
				src={book?.imageUrl}
				isShow={isShowImage}
				onClick={() => setIsShowImage(false)}
			/>			<main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-8">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-8 max-w-7xl">
					{/* Main Product Section */}
					<div className="bg-white rounded-3xl shadow-xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 backdrop-blur-sm border border-white/20">
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
							{/* Image Section */}
							<div className="flex justify-center lg:justify-start">
								<div className="relative group w-full max-w-sm">
									<div className="main-image w-full aspect-[3/4] bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center overflow-hidden shadow-2xl border border-gray-100">
										<img
											onClick={() => setIsShowImage(true)}
											className="w-full h-full object-contain cursor-pointer transition-all duration-300 hover:scale-110 group-hover:shadow-2xl"
											src={book?.imageUrl}
											alt={book?.title}
										/>
									</div>
									{/* Zoom indicator */}
									<div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
										<svg className="w-4 h-4 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
											<path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
										</svg>
										Phóng to
									</div>
								</div>
							</div>							{/* Book Details Section */}
							<div className="flex flex-col justify-center space-y-4 sm:space-y-6">
								<div>
									<h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-3 sm:mb-4 break-words">
										{book?.title}
									</h1>
									{/* Book Info Grid */}
									<div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
										<div className="bg-gray-50 rounded-xl p-3 sm:p-4 border border-gray-100 transition-all duration-300 hover:bg-gray-100">
											<div className="flex items-center space-x-2 mb-2">
												<svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
													<path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
												</svg>
												<span className="text-sm font-medium text-gray-600">Nhà cung cấp</span>
											</div>
											<span className="font-bold text-gray-900">Minh Long</span>
										</div>

										<div className="bg-gray-50 rounded-xl p-3 sm:p-4 border border-gray-100 transition-all duration-300 hover:bg-gray-100">
											<div className="flex items-center space-x-2 mb-2">
												<svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
													<path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
												</svg>
												<span className="text-sm font-medium text-gray-600">Tác giả</span>
											</div>
											<span className="font-bold text-gray-900 break-words">{book?.author}</span>
										</div>

										<div className="bg-gray-50 rounded-xl p-3 sm:p-4 border border-gray-100 transition-all duration-300 hover:bg-gray-100">
											<div className="flex items-center space-x-2 mb-2">
												<svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
													<path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
													<path fillRule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd" />
												</svg>
												<span className="text-sm font-medium text-gray-600">Nhà xuất bản</span>
											</div>
											<span className="font-bold text-gray-900 break-words">{book?.publisher}</span>
										</div>

										<div className="bg-gray-50 rounded-xl p-3 sm:p-4 border border-gray-100 transition-all duration-300 hover:bg-gray-100">
											<div className="flex items-center space-x-2 mb-2">
												<svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
													<path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z" clipRule="evenodd" />
												</svg>
												<span className="text-sm font-medium text-gray-600">Hình thức bìa</span>
											</div>
											<span className="font-bold text-gray-900">Bìa Mềm</span>
										</div>
									</div>
								</div>								{/* Price Section */}
								<div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-5 sm:p-6 border border-orange-100 shadow-sm">
									<FlashSaleBanner price={book?.price} sale={book?.sale} />
								</div>								{/* Action Buttons */}
								<div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4">
									<button
										className="flex-1 group relative overflow-hidden bg-white border-2 border-red-500 text-red-500 px-4 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg transition-all duration-300 hover:bg-red-500 hover:text-white hover:shadow-xl hover:-translate-y-1 active:translate-y-0 active:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
										onClick={addToCartClick}
									>
										<span className="relative z-10 flex items-center justify-center">
											<svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
												<path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
											</svg>
											Thêm vào giỏ hàng
										</span>
									</button>
									<button className="flex-1 group relative overflow-hidden bg-gradient-to-r from-red-500 to-red-600 text-white px-4 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg transition-all duration-300 hover:from-red-600 hover:to-red-700 hover:shadow-xl hover:-translate-y-1 active:translate-y-0 active:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
										<span className="relative z-10 flex items-center justify-center">
											<svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
												<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
											</svg>
											Mua ngay
										</span>
									</button>
								</div>
							</div>
						</div>
					</div>					{/* Product Information Section */}
					<div className="bg-white rounded-3xl shadow-xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 backdrop-blur-sm border border-white/20">
						<div className="flex flex-col sm:flex-row sm:items-center mb-4 sm:mb-6 gap-2">
							<div className="flex items-center">
								<img className="w-8 h-8 mr-2" src="/icons/info-icon.svg" alt="Info Icon" />
								<h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Thông tin sản phẩm</h2>
							</div>
							<div className="hidden sm:block h-6 w-px bg-gray-300 mx-3"></div>
							<span className="text-sm text-gray-500">Chi tiết và đặc điểm nổi bật</span>
						</div>
						<div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-4 sm:p-6 border border-gray-200">
							<DescriptionBox content={book?.description} />
						</div>
					</div>					{/* Related Products Section */}
					<div className="bg-white rounded-3xl shadow-xl p-4 sm:p-6 lg:p-8 backdrop-blur-sm border border-white/20">
						<div className="text-center mb-6 sm:mb-8">
							<h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 flex items-center justify-center">
								<img className="w-8 h-8 mr-2" src="/icons/star-icon.svg" alt="Related Products Icon" />
								Sản phẩm liên quan
								<img className="w-8 h-8 ml-2" src="/icons/star-icon.svg" alt="Related Products Icon" />
							</h2>
							<p className="text-gray-600 text-base sm:text-lg">Khám phá những cuốn sách tuyệt vời khác</p>
						</div>

						{bestSellerBook && bestSellerBook.length > 0 ? (
							<div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-4 lg:gap-5">
								{bestSellerBook.map((book) => (
									<div key={uuidv4()} className="w-full transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
										<BookCard
											{...book}
											thumbnailUrl={book.imageUrl}
										/>
									</div>
								))}
							</div>
						) : (
							<div className="flex justify-center items-center py-8 sm:py-12">
								<div className="text-center">
									<div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl p-6 sm:p-8 mb-4 w-full max-w-sm mx-auto shadow-md">
										<Loading />
									</div>
									<p className="text-gray-500 text-lg">Đang tải sản phẩm liên quan...</p>
								</div>
							</div>
						)}
					</div>
				</div>
			</main>
		</>
	)
}