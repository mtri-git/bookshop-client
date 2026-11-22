import React, { useState } from 'react'
import { useQuery, useSuspenseQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from '@tanstack/react-router'
import { Link } from '../../components/Link'
import BookCard from '../../components/BookCard'
import FlashSaleBanner from '../../components/BookDetail.jsx/FlashSaleBanner'
import DescriptionBox from '../../components/DescriptionBox'
import ImageModal from '../../components/ImageModal'
import { bestSellersQuery, bookQuery } from '../../lib/queries'
import { useCart } from '../../stores/cart'
import { useBookQuantityDetail } from '../../hooks/useBookQuantityDetail'
import { CART_PATH, HOME_PATH, SEARCH_PATH } from '../../constants/path'
import { toast_success } from '../../utils/toastNotify'
import Icon from '../../components/Icon'

export default function BookDetail() {
	const { id } = useParams({ from: '/_main/book/$id' })
	// Loaded by the route loader (SSR), so this never suspends on first render
	const { data: book } = useSuspenseQuery(bookQuery(id))
	const { data: bestSellers = [] } = useQuery(bestSellersQuery())
	const relatedBooks = bestSellers.filter((item) => item._id !== id)
	const [isShowImage, setIsShowImage] = useState(false)
	const { quantity } = useBookQuantityDetail()
	const addItem = useCart((state) => state.addItem)
	const navigate = useNavigate()
	const loading = false

	const addToCartClick = () => {
		addItem(book, quantity || 1)
		toast_success(`Đã thêm ${quantity || 1} sản phẩm vào giỏ hàng!`)
	}

	const buyNowClick = () => {
		addItem(book, quantity || 1)
		navigate({ to: CART_PATH })
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
						{loading ? null : (
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
											<Icon name='zoom-in' className="w-3.5 h-3.5" />
											<span>Xem ảnh lớn</span>
										</div>
									</div>

									{/* Policy highlights below image */}
									<div className="w-full max-w-sm mt-4 grid grid-cols-2 gap-2 text-[11px] text-gray-600">
										<div className="flex items-center gap-1.5 p-2 bg-gray-50 rounded border border-gray-200/70">
											<Icon name='shield-check' className='w-4 h-4 text-orange-500' />
											<span>100% Sách Thật</span>
										</div>
										<div className="flex items-center gap-1.5 p-2 bg-gray-50 rounded border border-gray-200/70">
											<Icon name='truck' className='w-4 h-4 text-orange-500' />
											<span>Giao Hàng Toàn Quốc</span>
										</div>
										<div className="flex items-center gap-1.5 p-2 bg-gray-50 rounded border border-gray-200/70">
											<Icon name='refresh' className='w-4 h-4 text-orange-500' />
											<span>Đổi Trả Trong 30 Ngày</span>
										</div>
										<div className="flex items-center gap-1.5 p-2 bg-gray-50 rounded border border-gray-200/70">
											<Icon name='gift' className='w-4 h-4 text-orange-500' />
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
													{book?.publisher || 'Đang cập nhật'}
												</span>
											</div>
											<div>
												<span className="text-gray-500 block">Năm xuất bản:</span>
												<span className="font-semibold text-gray-800">
													{book?.publication_year || 'Đang cập nhật'}
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
												<Icon name='cart' className="w-5 h-5" />
												<span>Thêm vào giỏ hàng</span>
											</button>
											<button
												onClick={buyNowClick}
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
							<Icon name='document' className="w-5 h-5 text-gray-700" />
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

						{relatedBooks.length > 0 ? (
							<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
								{relatedBooks.slice(0, 5).map((item) => (
									<BookCard key={item._id} {...item} />
								))}
							</div>
						) : (
							<div className="py-8 text-center text-gray-400 text-sm">Chưa có sản phẩm liên quan.</div>
						)}
					</div>
				</div>
			</main>
		</>
	)
}
