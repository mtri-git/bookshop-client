import React, { useState } from 'react'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { Link } from '../../components/Link'
import Loading from '../../components/Loading'
import { searchBooksQuery } from '../../lib/queries'
import BookCard from '../../components/BookCard'
import Pagination from '../../components/Pagination'
import { HOME_PATH } from '../../constants/path'
import Icon from '../../components/Icon'

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

export const SORT_VALUES = SORT_OPTIONS.map((o) => o.val)
export const PRICE_VALUES = PRICE_RANGES.map((o) => o.value).filter(Boolean)
export const CATEGORY_VALUES = CATEGORIES_LIST.slice(1)

export default function Search() {
	const search = useSearch({ from: '/_main/search' })
	const navigate = useNavigate()
	const [mobileFilterOpen, setMobileFilterOpen] = useState(false)

	const { data, isPending, isError } = useQuery({ ...searchBooksQuery(search), placeholderData: keepPreviousData })
	const books = data?.books ?? null
	const paginate = data?.paginate ?? { pageSize: 15, totalPage: 1, total: 0 }
	const loading = isPending

	const currentSort = search.sort || 'best-seller'
	const currentPrice = search.price || ''
	const currentCategory = search.category || 'Tất cả'
	const searchTitle = search.title || ''
	const currentPage = search.offset || 1

	// Every filter change resets to page 1
	const updateSearch = (patch) =>
		navigate({ to: '/search', search: (prev) => ({ ...prev, offset: undefined, ...patch }) })

	const onPageChange = (page) => updateSearch({ offset: page > 1 ? page : undefined })
	const onSortChange = (sortValue) => updateSearch({ sort: sortValue === 'best-seller' ? undefined : sortValue })
	const onCategoryChange = (cat) => updateSearch({ category: cat === 'Tất cả' ? undefined : cat })
	const onPriceChange = (priceVal) => updateSearch({ price: priceVal || undefined })

	const clearAllFilters = () => {
		navigate({ to: '/search', search: searchTitle ? { title: searchTitle } : {} })
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
						const isActive = (cat === 'Tất cả' && !search.category) || currentCategory === cat
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
						<Icon name='filter' className="w-4 h-4" />
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
									<Icon name='x' className="w-5 h-5" />
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
											key={book._id}
											{...book}
											thumbnailUrl={book.imageUrl}
										/>
									))}
								</div>
							) : (
								<div className="py-20 text-center space-y-3">
									<Icon name='search' className="w-12 h-12 mx-auto text-gray-300" strokeWidth={1.5} />
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
									current={currentPage}
									totalPage={paginate.totalPage}
									onChange={onPageChange}
								/>
							</div>
						)}
					</div>
				</div>
			</div>
		</main>
	)
}
