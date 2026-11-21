import React from 'react'
import { Link } from 'react-router-dom'
import BookCard from '../../components/BookCard'
import { SEARCH_PATH } from '../../constants/path'

// Placeholder wishlist — in production, connect to Redux wishlist state or API
const SAMPLE_BOOKS = [
	{
		_id: 'wish-1',
		thumbnailUrl: 'https://cdn0.fahasa.com/media/catalog/product/i/m/image_195509_1_29246.jpg',
		title: 'Dạy sao cho trẻ nghe lời',
		price: 70000,
		sale: 0.3,
		sold: 10,
	},
	{
		_id: 'wish-2',
		thumbnailUrl: 'https://cdn0.fahasa.com/media/catalog/product/i/m/image_195509_1_29246.jpg',
		title: 'Nhà Giả Kim',
		price: 95000,
		sale: 0.15,
		sold: 320,
	},
	{
		_id: 'wish-3',
		thumbnailUrl: 'https://cdn0.fahasa.com/media/catalog/product/i/m/image_195509_1_29246.jpg',
		title: 'Đắc Nhân Tâm',
		price: 86000,
		sale: 0.2,
		sold: 580,
	},
]

export default function Wishlist() {
	const books = SAMPLE_BOOKS

	return (
		<section className="space-y-5">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
						<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
					</svg>
					<h2 className="text-base font-bold text-gray-900">Sách yêu thích</h2>
					{books.length > 0 && (
						<span className="text-xs bg-red-100 text-red-600 font-semibold px-2 py-0.5 rounded-full">
							{books.length}
						</span>
					)}
				</div>
				{books.length > 0 && (
					<button className="text-xs text-gray-500 hover:text-red-500 transition-colors">
						Xóa tất cả
					</button>
				)}
			</div>

			{books.length > 0 ? (
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
					{books.map((book) => (
						<div key={book._id} className="relative group">
							{/* Remove button */}
							<button
								className="absolute top-2 right-2 z-10 w-7 h-7 rounded-full bg-white shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 hover:text-red-500 text-gray-400"
								title="Xóa khỏi yêu thích"
							>
								<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
									<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
								</svg>
							</button>
							<BookCard {...book} thumbnailUrl={book.thumbnailUrl} />
						</div>
					))}
				</div>
			) : (
				<div className="py-16 text-center space-y-4">
					<div className="w-20 h-20 mx-auto bg-red-50 rounded-full flex items-center justify-center">
						<svg className="w-10 h-10 text-red-300" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
						</svg>
					</div>
					<div>
						<h3 className="text-base font-bold text-gray-800 mb-1">Chưa có sách yêu thích</h3>
						<p className="text-sm text-gray-500 max-w-xs mx-auto">
							Nhấn vào biểu tượng ♥ trên mỗi cuốn sách để thêm vào danh sách yêu thích của bạn.
						</p>
					</div>
					<Link
						to={SEARCH_PATH}
						className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-600 text-white text-sm font-semibold rounded-xl hover:bg-orange-700 transition-colors"
					>
						<svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0015.803 15.803z" />
						</svg>
						Khám phá sách ngay
					</Link>
				</div>
			)}
		</section>
	)
}
