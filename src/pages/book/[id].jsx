import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import BookCard from '../../components/BookCard'
import FlashSaleBanner from '../../components/BookDetail.jsx/FlashSaleBanner'
import Loading from '../../components/Loading'
import DescriptionBox from '../../components/DescriptionBox'
import ImageModal from '../../components/ImageModal'
import { addToCart } from '../../redux/actions/cartAction'
import bookService from '../../services/bookService'
import { useBookQuantityDetail } from '../../hooks/useBookQuantityDetail'
import { HOME_PATH, SEARCH_PATH } from '../../constants/path'
import { toast_success } from '../../utils/toastNotify'

export default function BookDetail() {
	const { id } = useParams()
	const [book, setBook] = useState(null)
	const [bestSellerBook, setBestSellerBook] = useState([])
	const [isShowImage, setIsShowImage] = useState(false)
	const [loading, setLoading] = useState(true)
	const { quantity } = useBookQuantityDetail()
	const dispatch = useDispatch()

	const fetchBestSeller = async () => {
		try {
			const data = await bookService.getBestSellerBook()
			setBestSellerBook(data?.data?.book || [])
		} catch (e) {
			console.warn('Could not load bestsellers', e)
		}
	}

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' })
		setLoading(true)

		bookService
			.getBookById(id)
			.then((res) => {
				setBook(res.data?.book || null)
			})
			.catch((err) => {
				console.warn('Error fetching book detail:', err)
			})
			.finally(() => {
				setLoading(false)
			})

		fetchBestSeller()
	}, [id])

	const addToCartClick = () => {
		if (!book) return
		const { _id, imageUrl: thumbnailUrl, title, price, sale } = book
		dispatch(addToCart({ _id, thumbnailUrl, title, price, sale }, quantity || 1))
		toast_success(`Đã thêm ${quantity || 1} sản phẩm vào giỏ hàng!`)
	}

	const fallbackImg = 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400'

	return (
		<>
			<ImageModal
				src={book?.imageUrl || fallbackImg}
				isShow={isShowImage}
				onClick={() => setIsShowImage(false)}
			/>

			<main className="min-h-screen bg-gray-50/60 pb-12">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 max-w-7xl">
					{/* BREADCRUMB */}
					<nav className="flex items-center text-xs text-gray-500 mb-4 gap-1.5 flex-wrap">
						<Link to={HOME_PATH} className="hover:text-orange-600 transition-colors">
							Trang chủ
						</Link>
						<span>/</span>
						<Link to={SEARCH_PATH} className="hover:text-orange-600 transition-colors">
							Sách
						</Link>
						<span>/</span>
						<span className="text-gray-900 font-medium line-clamp-1">
							{book?.title || 'Chi tiết sách'}
						</span>
					</nav>

					{/* MAIN PRODUCT DETAIL CARD */}
					<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8 mb-6">
						{loading ? (
							<div className="py-20 flex justify-center items-center">
								<Loading />
							</div>
						) : (
							<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
								{/* Image Column */}
								<div className="lg:col-span-5 flex flex-col items-center">
									<div className="relative group w-full max-w-sm aspect-[3/4] bg-white rounded-lg border border-gray-200 p-4 flex items-center justify-center overflow-hidden">
										<img
											onClick={() => setIsShowImage(true)}
											className="w-full h-full object-contain cursor-zoom-in transition-transform duration-200 group-hover:scale-105"
											src={book?.imageUrl || fallbackImg}
											alt={book?.title}
										/>
										<div className="absolute bottom-3 right-3 bg-gray-900/75 text-white px-2.5 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center gap-1">
											<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
											</svg>
											<span>Xem ảnh lớn</span>
										</div>
									</div>

									{/* Policy highlights below image */}
									<div className="w-full max-w-sm mt-4 grid grid-cols-2 gap-2 text-[11px] text-gray-600">
										<div className="flex items-center gap-1.5 p-2 bg-gray-50 rounded border border-gray-200/70">
											<span className="text-emerald-600 text-sm">✔</span>
											<span>100% Sách Thật</span>
										</div>
										<div className="flex items-center gap-1.5 p-2 bg-gray-50 rounded border border-gray-200/70">
											<span className="text-blue-600 text-sm">🚚</span>
											<span>Giao Hàng Toàn Quốc</span>
										</div>
										<div className="flex items-center gap-1.5 p-2 bg-gray-50 rounded border border-gray-200/70">
											<span className="text-purple-600 text-sm">🔄</span>
											<span>Đổi Trả Trong 30 Ngày</span>
										</div>
										<div className="flex items-center gap-1.5 p-2 bg-gray-50 rounded border border-gray-200/70">
											<span className="text-orange-600 text-sm">🎁</span>
											<span>Tặng Kèm Bookmark</span>
										</div>
									</div>
								</div>

								{/* Info Column */}
								<div className="lg:col-span-7 flex flex-col justify-between space-y-6">
									<div className="space-y-4">
										<div>
											<span className="text-xs font-semibold text-orange-600 uppercase tracking-wider">
												{book?.category?.join(', ') || 'Sách Tuyển Chọn'}
											</span>
											<h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mt-1 leading-snug">
												{book?.title}
											</h1>
										</div>

										{/* Meta spec table */}
										<div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-gray-50 p-3.5 rounded-lg border border-gray-200/80 text-xs">
											<div>
												<span className="text-gray-500 block">Tác giả:</span>
												<span className="font-semibold text-gray-800 line-clamp-1">
													{book?.author || 'Nhiều tác giả'}
												</span>
											</div>
											<div>
												<span className="text-gray-500 block">Nhà xuất bản:</span>
												<span className="font-semibold text-gray-800 line-clamp-1">
													{book?.publisher || 'NXB Trẻ'}
												</span>
											</div>
											<div>
												<span className="text-gray-500 block">Năm xuất bản:</span>
												<span className="font-semibold text-gray-800">
													{book?.publication_year || '2024'}
												</span>
											</div>
											<div>
												<span className="text-gray-500 block">Hình thức bìa:</span>
												<span className="font-semibold text-gray-800">
													{book?.book_layout || 'Bìa mềm'}
												</span>
											</div>
										</div>

										{/* Price & Buy Section */}
										<div className="bg-gray-50 p-4 sm:p-5 rounded-lg border border-gray-200">
											<FlashSaleBanner
												price={book?.price}
												sale={book?.sale}
												sold={book?.sold}
											/>
										</div>

										{/* Action Buttons */}
										<div className="flex flex-col sm:flex-row gap-3 pt-2">
											<button
												onClick={addToCartClick}
												className="flex-1 bg-white border-2 border-red-600 text-red-600 hover:bg-red-50 font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 active:scale-98 shadow-sm"
											>
												<svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
													<path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
												</svg>
												<span>Thêm vào giỏ hàng</span>
											</button>
											<button
												onClick={addToCartClick}
												className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 active:scale-98 shadow-sm"
											>
												<span>Mua ngay</span>
											</button>
										</div>
									</div>
								</div>
							</div>
						)}
					</div>

					{/* PRODUCT DESCRIPTION SECTION */}
					<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 sm:p-7 mb-6">
						<div className="flex items-center gap-2 pb-3 mb-4 border-b border-gray-200">
							<svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
							</svg>
							<h2 className="text-lg sm:text-xl font-bold text-gray-900">
								Mô tả sản phẩm
							</h2>
						</div>

						<div className="bg-gray-50/60 p-4 sm:p-6 rounded-lg border border-gray-200/80">
							<DescriptionBox content={book?.description || 'Nội dung đang được cập nhật.'} />
						</div>
					</div>

					{/* RELATED BOOKS SECTION */}
					<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 sm:p-7">
						<div className="flex items-center justify-between pb-3 mb-5 border-b border-gray-200">
							<h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
								<span>Sản phẩm liên quan</span>
							</h2>
							<Link
								to={SEARCH_PATH}
								className="text-xs sm:text-sm font-semibold text-orange-600 hover:underline"
							>
								Xem tất cả &rarr;
							</Link>
						</div>

						{bestSellerBook && bestSellerBook.length > 0 ? (
							<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
								{bestSellerBook.slice(0, 5).map((item) => (
									<BookCard key={item._id || uuidv4()} {...item} thumbnailUrl={item.imageUrl} />
								))}
							</div>
						) : (
							<div className="py-8 text-center text-gray-400 text-sm">
								Đang tải sản phẩm liên quan...
							</div>
						)}
					</div>
				</div>
			</main>
		</>
	)
}
