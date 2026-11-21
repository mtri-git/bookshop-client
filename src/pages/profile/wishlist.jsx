import React from 'react'
import { Link } from 'react-router-dom'
import BookCard from '../../components/BookCard'
import { SEARCH_PATH } from '../../constants/path'
import Icon from '../../components/Icon'

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
					<Icon name='heart-solid' className="w-5 h-5 text-red-500" />
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
								<Icon name='heart-solid' className="w-4 h-4" />
							</button>
							<BookCard {...book} thumbnailUrl={book.thumbnailUrl} />
						</div>
					))}
				</div>
			) : (
				<div className="py-16 text-center space-y-4">
					<div className="w-20 h-20 mx-auto bg-red-50 rounded-full flex items-center justify-center">
						<Icon name='heart' className="w-10 h-10 text-red-300" strokeWidth={1.5} />
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
						<Icon name='search' className="w-4 h-4" />
						Khám phá sách ngay
					</Link>
				</div>
			)}
		</section>
	)
}
