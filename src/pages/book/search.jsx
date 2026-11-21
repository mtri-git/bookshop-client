import React, { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import Loading from '../../components/Loading'
import bookService from '../../services/bookService'
import BookCard from '../../components/BookCard'
import Pagination from 'rc-pagination'
import './paginate-decor.less'
import { HOME_PATH } from '../../constants/path'

const CATEGORIES_LIST = [
	'Tất cả',
	'Văn học',
	'Kinh tế',
	'Kỹ năng',
	'Thiếu nhi',
	'Manga - Comic',
	'Ngoại văn',
	'Khoa học',
	'Tâm lý',
]

const PRICE_RANGES = [
	{ label: 'Tất cả mức giá', value: '' },
	{ label: 'Dưới 50.000 đ', value: '0,50000' },
	{ label: '50.000 đ - 100.000 đ', value: '50000,100000' },
	{ label: '100.000 đ - 200.000 đ', value: '100000,200000' },
	{ label: 'Trên 200.000 đ', value: '200000,10000000' },
]

const SORT_OPTIONS = [
	{ label: 'Bán chạy', val: 'best-seller' },
	{ label: 'Mới nhất', val: 'newest' },
	{ label: 'Giá thấp', val: 'cheapest' },
	{ label: 'Giá cao', val: 'most-expensive' },
]

export default function Search() {
	const [books, setBooks] = useState(null)
	const [searchParams, setSearchParams] = useSearchParams()
	const [currentPage, setCurrentPage] = useState(1)
	const [paginate, setPaginate] = useState({ pageSize: 15, totalPage: 1, total: 0 })
	const [loading, setLoading] = useState(true)
	const [mobileFilterOpen, setMobileFilterOpen] = useState(false)

	const currentSort = searchParams.get('sort') || 'best-seller'
	const currentPrice = searchParams.get('price') || ''
	const currentCategory = searchParams.get('category') || 'Tất cả'
	const searchTitle = searchParams.get('title') || ''

	const fetchBooks = async () => {
		setLoading(true)
		try {
			const data = await bookService.searchBook(`${searchParams}`)
			if (data?.data?.book) {
				setBooks(data.data.book)
				if (data.data.paginate) {
					setPaginate(data.data.paginate)
				}
			} else {
				setBooks([])
			}
		} catch (error) {
			console.warn('Error fetching search books:', error)
			setBooks([])
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		document.title = searchTitle ? `Tìm kiếm "${searchTitle}" - BookShop` : 'Kho Sách - BookShop'
	}, [searchTitle])

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' })
		fetchBooks()
	}, [searchParams, currentPage])

	const onPageChange = (page) => {
		setCurrentPage(page)
		searchParams.set('offset', page)
		setSearchParams(searchParams)
	}

	const onSortChange = (sortValue) => {
		searchParams.set('sort', sortValue)
		searchParams.set('offset', '1')
		setCurrentPage(1)
		setSearchParams(searchParams)
	}

	const onCategoryChange = (cat) => {
		if (cat === 'Tất cả') {
			searchParams.delete('category')
		} else {
			searchParams.set('category', cat)
		}
		searchParams.set('offset', '1')
		setCurrentPage(1)
		setSearchParams(searchParams)
	}

	const onPriceChange = (priceVal) => {
		if (!priceVal) {
			searchParams.delete('price')
		} else {
			searchParams.set('price', priceVal)
		}
		searchParams.set('offset', '1')
		setCurrentPage(1)
		setSearchParams(searchParams)
	}

	const clearAllFilters = () => {
		setSearchParams({})
		setCurrentPage(1)
		setMobileFilterOpen(false)
	}

	const hasActiveFilters = currentPrice || currentCategory !== 'Tất cả' || currentSort !== 'best-seller'

	// Reusable filter panel content
	const FilterPanel = ({ onApply }) => (
		<div className="space-y-5">
			{/* Category */}
			<div>
				<h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider pb-2 border-b border-gray-200">
					Danh mục sách
				</h3>
				<ul className="mt-3 space-y-1 text-xs">
					{CATEGORIES_LIST.map((cat, idx) => {
						const isActive = (cat === 'Tất cả' && !searchParams.get('category')) || currentCategory === cat
						return (
							<li key={idx}>
								<button
									onClick={() => { onCategoryChange(cat); onApply?.() }}
									className={`w-full text-left px-2.5 py-1.5 rounded transition-colors flex items-center justify-between ${
										isActive
											? 'bg-orange-50 text-orange-600 font-bold'
											: 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
									}`}
								>
									<span>{cat}</span>
									{isActive && <span className="text-orange-600">●</span>}
								</button>
							</li>
						)
					})}
				</ul>
			</div>

			{/* Price */}
			<div>
				<h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider pb-2 border-b border-gray-200">
					Khoảng giá
				</h3>
				<div className="mt-3 space-y-2 text-xs">
					{PRICE_RANGES.map((pr, idx) => {
						const isChecked = currentPrice === pr.value
						return (
							<label key={idx} className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-orange-600">
								<input
									type="radio"
									name="price-filter"
									checked={isChecked}
									onChange={() => { onPriceChange(pr.value); onApply?.() }}
									className="accent-orange-600"
								/>
								<span className={isChecked ? 'font-semibold text-orange-600' : ''}>{pr.label}</span>
							</label>
						)
					})}
				</div>
			</div>

			{/* Reset */}
			<button
				onClick={clearAllFilters}
				className="w-full py-2 px-3 border border-gray-300 rounded-lg text-xs font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition"
			>
				Xóa tất cả bộ lọc
			</button>
		</div>
	)

	return (
		<main className="min-h-screen bg-gray-50/60 pb-12">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 max-w-7xl">

				{/* BREADCRUMB */}
				<nav className="flex items-center text-xs text-gray-500 mb-4 gap-1.5 flex-wrap">
					<Link to={HOME_PATH} className="hover:text-orange-600 transition-colors">
						Trang chủ
					</Link>
					<span>/</span>
					<span className="text-gray-900 font-medium">
						{searchTitle ? `Kết quả cho "${searchTitle}"` : 'Tất cả sách'}
					</span>
				</nav>

				{/* Mobile: Filter toggle bar */}
				<div className="lg:hidden mb-3 flex items-center gap-2">
					<button
						onClick={() => setMobileFilterOpen(true)}
						className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 shadow-sm hover:border-orange-300 hover:text-orange-600 transition-colors"
					>
						<svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
						</svg>
						Lọc & Sắp xếp
						{hasActiveFilters && (
							<span className="w-2 h-2 rounded-full bg-orange-500 inline-block" />
						)}
					</button>
					{/* Mobile sort chips */}
					<div className="flex items-center gap-1.5 overflow-x-auto flex-1 pb-0.5">
						{SORT_OPTIONS.map((s) => (
							<button
								key={s.val}
								onClick={() => onSortChange(s.val)}
								className={`flex-shrink-0 px-3 py-2 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
									currentSort === s.val
										? 'bg-gray-900 text-white'
										: 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
								}`}
							>
								{s.label}
							</button>
						))}
					</div>
				</div>

				{/* Mobile Filter Drawer overlay */}
				{mobileFilterOpen && (
					<div className="lg:hidden fixed inset-0 z-50 flex">
						{/* Backdrop */}
						<div
							className="absolute inset-0 bg-black/40 backdrop-blur-sm"
							onClick={() => setMobileFilterOpen(false)}
						/>
						{/* Drawer */}
						<div className="relative ml-auto w-80 max-w-[85vw] h-full bg-white shadow-2xl flex flex-col">
							<div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
								<h2 className="font-bold text-gray-900">Bộ lọc tìm kiếm</h2>
								<button
									onClick={() => setMobileFilterOpen(false)}
									className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
								>
									<svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
									</svg>
								</button>
							</div>
							<div className="flex-1 overflow-y-auto px-5 py-4">
								<FilterPanel onApply={() => setMobileFilterOpen(false)} />
							</div>
							<div className="px-5 py-4 border-t border-gray-200">
								<button
									onClick={() => setMobileFilterOpen(false)}
									className="w-full py-2.5 bg-orange-600 text-white text-sm font-semibold rounded-xl hover:bg-orange-700 transition-colors"
								>
									Xem kết quả {paginate.total > 0 ? `(${paginate.total})` : ''}
								</button>
							</div>
						</div>
					</div>
				)}

				{/* SEARCH PAGE GRID: SIDEBAR + RESULTS */}
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

					{/* LEFT SIDEBAR FILTER — desktop only */}
					<aside className="hidden lg:block lg:col-span-3 bg-white p-5 rounded-xl border border-gray-200 shadow-sm sticky top-20">
						<FilterPanel />
					</aside>

					{/* RIGHT CONTENT: TOOLBAR & BOOKS */}
					<div className="lg:col-span-9 space-y-4">
						{/* Top Sort Bar — desktop */}
						<div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
							<div className="flex items-center gap-2">
								<h1 className="text-base sm:text-lg font-bold text-gray-900">
									{searchTitle ? (
										<span>Kết quả cho: <span className="text-orange-600 font-extrabold">"{searchTitle}"</span></span>
									) : (
										<span>Tất cả sản phẩm</span>
									)}
								</h1>
								{paginate.total > 0 && (
									<span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full font-medium">
										{paginate.total} cuốn
									</span>
								)}
							</div>

							{/* Sort Pills — desktop */}
							<div className="hidden lg:flex items-center gap-1.5 flex-wrap">
								<span className="text-xs text-gray-500 mr-1">Sắp xếp:</span>
								{SORT_OPTIONS.map((s) => (
									<button
										key={s.val}
										onClick={() => onSortChange(s.val)}
										className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
											currentSort === s.val
												? 'bg-gray-900 text-white font-semibold'
												: 'bg-gray-100 text-gray-700 hover:bg-gray-200'
										}`}
									>
										{s.label}
									</button>
								))}
							</div>
						</div>

						{/* Products Grid */}
						<div className="bg-white p-4 sm:p-5 rounded-xl border border-gray-200 shadow-sm min-h-[420px]">
							{loading ? (
								<div className="py-24 flex justify-center items-center">
									<Loading />
								</div>
							) : books && books.length > 0 ? (
								<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
									{books.map((book) => (
										<BookCard
											key={book._id || uuidv4()}
											{...book}
											thumbnailUrl={book.imageUrl}
										/>
									))}
								</div>
							) : (
								<div className="py-20 text-center space-y-3">
									<svg className="w-12 h-12 mx-auto text-gray-300" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0015.803 15.803z" />
									</svg>
									<h3 className="text-base font-bold text-gray-800">Không tìm thấy sản phẩm nào</h3>
									<p className="text-xs text-gray-500 max-w-sm mx-auto">
										Hãy thử tìm kiếm với từ khóa khác hoặc xóa bớt các bộ lọc đang chọn.
									</p>
									<button
										onClick={clearAllFilters}
										className="inline-block mt-2 px-4 py-2 bg-orange-600 text-white text-xs font-semibold rounded-lg hover:bg-orange-700 transition"
									>
										Xóa bộ lọc tìm kiếm
									</button>
								</div>
							)}
						</div>

						{/* Pagination */}
						{paginate.totalPage > 1 && (
							<div className="flex justify-center pt-4">
								<Pagination
									onChange={onPageChange}
									current={currentPage}
									total={paginate.totalPage * 10}
									showTitle={false}
								/>
							</div>
						)}
					</div>
				</div>
			</div>
		</main>
	)
}
