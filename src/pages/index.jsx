import React, { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import Slider from '../components/Slider'
import BookCard from '../components/BookCard'
import bookService, { FALLBACK_BOOKS } from '../services/bookService'
import { SEARCH_PATH } from '../constants/path'
import { toast_success } from '../utils/toastNotify'

// Service highlights list with clean solid icons
const FEATURES = [
	{
		icon: (
			<svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
			</svg>
		),
		title: 'Freeship từ 150K',
		desc: 'Giao hàng tận nơi toàn quốc',
	},
	{
		icon: (
			<svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
			</svg>
		),
		title: '100% Sách thật',
		desc: 'Cam kết nguồn gốc xuất bản',
	},
	{
		icon: (
			<svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
			</svg>
		),
		title: 'Giao nhanh 2h',
		desc: 'Nội thành Hà Nội & TP.HCM',
	},
	{
		icon: (
			<svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
			</svg>
		),
		title: 'Đổi trả 30 ngày',
		desc: 'Thủ tục hoàn tiền dễ dàng',
	},
	{
		icon: (
			<svg className="w-5 h-5 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
			</svg>
		),
		title: 'Tích lũy điểm thưởng',
		desc: 'Đổi voucher cho đơn sau',
	},
]

// Professional SVG icons for categories (clean, unified stroke)
const CATEGORIES = [
	{
		name: 'Văn học',
		count: '1,240+ cuốn',
		icon: (
			<svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
			</svg>
		),
	},
	{
		name: 'Kinh tế',
		count: '850+ cuốn',
		icon: (
			<svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
			</svg>
		),
	},
	{
		name: 'Kỹ năng',
		count: '920+ cuốn',
		icon: (
			<svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
			</svg>
		),
	},
	{
		name: 'Thiếu nhi',
		count: '640+ cuốn',
		icon: (
			<svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
			</svg>
		),
	},
	{
		name: 'Manga - Comic',
		count: '1,500+ cuốn',
		icon: (
			<svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M13 10V3L4 14h7v7l9-11h-7z" />
			</svg>
		),
	},
	{
		name: 'Ngoại văn',
		count: '430+ cuốn',
		icon: (
			<svg className="w-5 h-5 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
			</svg>
		),
	},
	{
		name: 'Khoa học',
		count: '310+ cuốn',
		icon: (
			<svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
			</svg>
		),
	},
	{
		name: 'Tâm lý',
		count: '520+ cuốn',
		icon: (
			<svg className="w-5 h-5 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
			</svg>
		),
	},
]

// Natural skeleton loader
function BookCardSkeleton() {
	return (
		<div className="bg-white rounded-xl p-3 border border-gray-200 animate-pulse flex flex-col space-y-3">
			<div className="bg-gray-100 rounded-lg aspect-[3/4] w-full" />
			<div className="space-y-1.5 pt-1">
				<div className="h-3.5 bg-gray-100 rounded w-3/4" />
				<div className="h-3 bg-gray-100 rounded w-1/2" />
			</div>
			<div className="h-4 bg-gray-100 rounded w-1/3 pt-1" />
			<div className="h-8 bg-gray-100 rounded-lg w-full" />
		</div>
	)
}

export default function Home() {
	const [newBooks, setNewBooks] = useState([])
	const [bestSellerBooks, setBestSellerBooks] = useState([])
	const [loading, setLoading] = useState(true)
	const [activeTab, setActiveTab] = useState('all') // 'all', 'new', 'bestseller'
	const [newsletterEmail, setNewsletterEmail] = useState('')

	// Countdown timer state for Flash Sale
	const [timeLeft, setTimeLeft] = useState({
		hours: 4,
		minutes: 19,
		seconds: 45,
	})

	useEffect(() => {
		const timer = setInterval(() => {
			setTimeLeft((prev) => {
				if (prev.seconds > 0) {
					return { ...prev, seconds: prev.seconds - 1 }
				} else if (prev.minutes > 0) {
					return { ...prev, minutes: 59, seconds: 59 }
				} else if (prev.hours > 0) {
					return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
				}
				return { hours: 8, minutes: 0, seconds: 0 }
			})
		}, 1000)
		return () => clearInterval(timer)
	}, [])

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' })
		document.title = 'BookShop - Nhà Sách Trực Tuyến'

		const fetchData = async () => {
			setLoading(true)
			try {
				const [newRes, bestRes] = await Promise.allSettled([
					bookService.getNewBook(),
					bookService.getBestSellerBook(),
				])

				if (newRes.status === 'fulfilled' && newRes.value?.data?.book) {
					setNewBooks(newRes.value.data.book)
				} else {
					setNewBooks(FALLBACK_BOOKS.slice(0, 5))
				}

				if (bestRes.status === 'fulfilled' && bestRes.value?.data?.book) {
					setBestSellerBooks(bestRes.value.data.book)
				} else {
					setBestSellerBooks(FALLBACK_BOOKS.slice(5, 10))
				}
			} catch (error) {
				setNewBooks(FALLBACK_BOOKS.slice(0, 5))
				setBestSellerBooks(FALLBACK_BOOKS.slice(5, 10))
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [])

	const displayedBooks = useMemo(() => {
		if (activeTab === 'new') return newBooks
		if (activeTab === 'bestseller') return bestSellerBooks
		return [...bestSellerBooks, ...newBooks]
	}, [activeTab, newBooks, bestSellerBooks])

	const handleNewsletterSubmit = (e) => {
		e.preventDefault()
		if (!newsletterEmail || !newsletterEmail.includes('@')) return
		toast_success('Chúc mừng! Mã giảm giá BOOK20 đã gửi tới email của bạn.')
		setNewsletterEmail('')
	}

	return (
		<main className="homepage pb-12 bg-white rounded-xl shadow-sm border border-gray-200/80 min-h-screen space-y-8 overflow-hidden">
			{/* HERO SECTION */}
			<section className="p-4 sm:p-6 lg:p-8 pb-0">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-stretch">
					{/* Main Slider */}
					<div className="lg:col-span-8 min-h-[260px] sm:min-h-[340px] lg:min-h-[380px]">
						<Slider />
					</div>

					{/* Side Promo Banners */}
					<div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4">
						<div className="flex-1 relative rounded-xl overflow-hidden group border border-gray-200 min-h-[160px] bg-gray-50">
							<img
								className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
								src="https://cdn0.fahasa.com/media/wysiwyg/Thang-12-2022/Branday_flashsale_Sub%20banner_392x156.jpg"
								alt="Hot Promotion 1"
							/>
							<div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-4 text-white">
								<span className="text-[10px] font-bold bg-red-600 px-2 py-0.5 rounded w-fit uppercase">
									Tiết kiệm 50%
								</span>
								<h3 className="font-bold text-sm sm:text-base mt-1 text-white">
									Tuần Lễ Sách Hay Tuyển Chọn
								</h3>
								<Link
									to={SEARCH_PATH}
									className="text-xs font-semibold text-orange-300 hover:underline flex items-center gap-1 mt-0.5"
								>
									Xem ngay &rarr;
								</Link>
							</div>
						</div>

						<div className="flex-1 relative rounded-xl overflow-hidden group border border-gray-200 min-h-[160px] bg-gray-50">
							<img
								className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
								src="https://cdn1.fahasa.com/media/wysiwyg/Thang-06-2025/ThanhToanKhongTienMat_Resize_392x156.png"
								alt="Hot Promotion 2"
							/>
							<div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-4 text-white">
								<span className="text-[10px] font-bold bg-blue-600 px-2 py-0.5 rounded w-fit uppercase">
									Thanh Toán Tiện Lợi
								</span>
								<h3 className="font-bold text-sm sm:text-base mt-1 text-white">
									Nhận Voucher 30K Khi Thanh Toán Online
								</h3>
								<Link
									to={SEARCH_PATH}
									className="text-xs font-semibold text-blue-200 hover:underline flex items-center gap-1 mt-0.5"
								>
									Khám phá &rarr;
								</Link>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* SERVICE HIGHLIGHTS BAR - CLEAN SOLID */}
			<section className="px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
					{FEATURES.map((item, idx) => (
						<div key={idx} className="flex items-center gap-3 p-1.5">
							<div className="p-2 bg-white rounded-lg border border-gray-200 shadow-sm shrink-0">
								{item.icon}
							</div>
							<div>
								<h4 className="font-bold text-xs sm:text-sm text-gray-900">
									{item.title}
								</h4>
								<p className="text-[11px] text-gray-500 line-clamp-1">
									{item.desc}
								</p>
							</div>
						</div>
					))}
				</div>
			</section>

			{/* FLASH SALE WITH NATURAL, CLEAN E-COMMERCE STYLING */}
			<section className="px-4 sm:px-6 lg:px-8">
				<div className="rounded-xl p-4 sm:p-5 bg-white border-2 border-red-500 shadow-sm">
					{/* Header */}
					<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-3 border-b border-red-100">
						<div className="flex items-center gap-2.5">
							<span className="bg-red-600 text-white font-extrabold text-xs uppercase px-2.5 py-1 rounded flex items-center gap-1.5 shadow-sm">
								<svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
									<path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
								</svg>
								<span>FLASH SALE</span>
							</span>
							<h2 className="text-base sm:text-lg font-bold text-gray-900">
								GIỜ VÀNG GIÁ SỐC
							</h2>
						</div>

						{/* Clean Countdown Box */}
						<div className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-lg border border-gray-200 w-fit">
							<span className="text-xs font-medium text-gray-600 uppercase">
								Kết thúc sau:
							</span>
							<div className="flex items-center gap-1 font-mono font-bold text-xs sm:text-sm">
								<span className="bg-gray-900 text-white px-2 py-0.5 rounded">
									{String(timeLeft.hours).padStart(2, '0')}
								</span>
								<span className="text-gray-900">:</span>
								<span className="bg-gray-900 text-white px-2 py-0.5 rounded">
									{String(timeLeft.minutes).padStart(2, '0')}
								</span>
								<span className="text-gray-900">:</span>
								<span className="bg-gray-900 text-white px-2 py-0.5 rounded">
									{String(timeLeft.seconds).padStart(2, '0')}
								</span>
							</div>
						</div>
					</div>

					{/* Flash Sale Grid */}
					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
						{loading ? (
							Array.from({ length: 5 }).map((_, i) => <BookCardSkeleton key={i} />)
						) : (
							bestSellerBooks.slice(0, 5).map((book) => (
								<BookCard key={book._id || uuidv4()} {...book} thumbnailUrl={book.imageUrl} />
							))
						)}
					</div>
				</div>
			</section>

			{/* FEATURED CATEGORIES - CLEAN TILES WITH PROFESSIONAL ICONS */}
			<section className="px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between mb-4">
					<div>
						<h2 className="text-lg sm:text-xl font-bold text-gray-900">
							Danh Mục Nổi Bật
						</h2>
						<p className="text-xs text-gray-500">
							Tìm kiếm sách theo thể loại yêu thích
						</p>
					</div>
					<Link
						to={SEARCH_PATH}
						className="text-xs sm:text-sm font-semibold text-orange-600 hover:underline flex items-center gap-1"
					>
						<span>Tất cả thể loại</span>
						<span>&rarr;</span>
					</Link>
				</div>

				<div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
					{CATEGORIES.map((cat, idx) => (
						<Link
							key={idx}
							to={`${SEARCH_PATH}?category=${encodeURIComponent(cat.name)}`}
							className="group p-3 rounded-lg border border-gray-200 bg-white hover:border-orange-500 hover:bg-orange-50/20 transition-all duration-150 text-center flex flex-col items-center justify-center space-y-1.5"
						>
							<div className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center group-hover:scale-105 transition-transform shadow-2xs">
								{cat.icon}
							</div>
							<span className="text-xs font-semibold text-gray-800 group-hover:text-orange-600 transition-colors">
								{cat.name}
							</span>
							<span className="text-[10px] text-gray-400">
								{cat.count}
							</span>
						</Link>
					))}
				</div>
			</section>

			{/* MAIN BOOKS EXPLORATION WITH NATURAL TABS */}
			<section className="px-4 sm:px-6 lg:px-8 space-y-5">
				<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-200 pb-3">
					<div>
						<h2 className="text-lg sm:text-xl font-bold text-gray-900">
							Tủ Sách Dành Cho Bạn
						</h2>
						<p className="text-xs text-gray-500">
							Cập nhật sách mới và sách bán chạy từ nhà xuất bản
						</p>
					</div>

					{/* Filter Tabs */}
					<div className="flex items-center gap-1 p-1 bg-gray-100 rounded-lg w-fit border border-gray-200">
						<button
							onClick={() => setActiveTab('all')}
							className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
								activeTab === 'all'
									? 'bg-gray-900 text-white shadow-sm'
									: 'text-gray-600 hover:text-gray-900'
							}`}
						>
							Tất cả
						</button>
						<button
							onClick={() => setActiveTab('new')}
							className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
								activeTab === 'new'
									? 'bg-gray-900 text-white shadow-sm'
									: 'text-gray-600 hover:text-gray-900'
							}`}
						>
							Mới phát hành
						</button>
						<button
							onClick={() => setActiveTab('bestseller')}
							className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
								activeTab === 'bestseller'
									? 'bg-gray-900 text-white shadow-sm'
									: 'text-gray-600 hover:text-gray-900'
							}`}
						>
							Bán chạy nhất
						</button>
					</div>
				</div>

				{/* Books Grid */}
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
					{loading ? (
						Array.from({ length: 10 }).map((_, i) => <BookCardSkeleton key={i} />)
					) : displayedBooks.length > 0 ? (
						displayedBooks.map((book) => (
							<BookCard key={book._id || uuidv4()} {...book} thumbnailUrl={book.imageUrl} />
						))
					) : (
						<div className="col-span-full py-12 text-center text-gray-500 text-sm">
							Không có sản phẩm nào.
						</div>
					)}
				</div>

				{/* View More Link */}
				<div className="text-center pt-2">
					<Link
						to={SEARCH_PATH}
						className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-medium text-xs sm:text-sm shadow-sm transition-colors active:scale-98"
					>
						<span>Khám phá thêm hàng ngàn tựa sách</span>
						<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
						</svg>
					</Link>
				</div>
			</section>

			{/* PROMOTION BANNER STRIP - SOLID DEEP SLATE */}
			<section className="px-4 sm:px-6 lg:px-8">
				<div className="rounded-xl bg-slate-900 text-white p-6 sm:p-8 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
					<div className="space-y-2 max-w-xl text-center md:text-left">
						<span className="bg-yellow-400 text-gray-900 font-bold text-[11px] px-2.5 py-0.5 rounded uppercase tracking-wider">
							Ưu Đãi Độc Quyền
						</span>
						<h3 className="text-xl sm:text-2xl font-bold">
							Hội Sách Mùa Hè 2026 - Giảm Thêm 15%
						</h3>
						<p className="text-slate-300 text-xs sm:text-sm">
							Áp dụng cho đơn hàng từ 300.000đ khi nhập mã <span className="font-mono text-yellow-300 font-bold">SUMMER2026</span> tại giỏ hàng.
						</p>
					</div>
					<div>
						<Link
							to={SEARCH_PATH}
							className="inline-block bg-white hover:bg-gray-100 text-gray-900 font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-lg transition shadow-sm active:scale-95 whitespace-nowrap"
						>
							Mua ngay hôm nay
						</Link>
					</div>
				</div>
			</section>

			{/* NEWSLETTER SIGN-UP - CLEAN CARD */}
			<section className="px-4 sm:px-6 lg:px-8">
				<div className="bg-gray-50 rounded-xl p-5 sm:p-7 border border-gray-200 flex flex-col md:flex-row items-center justify-between gap-5">
					<div className="space-y-1 text-center md:text-left">
						<h3 className="text-base sm:text-lg font-bold text-gray-900">
							Đăng ký nhận thông tin khuyến mãi
						</h3>
						<p className="text-xs text-gray-600">
							Nhận ngay voucher <span className="text-red-600 font-bold">giảm giá 20%</span> cho đơn hàng đầu tiên.
						</p>
					</div>

					<form onSubmit={handleNewsletterSubmit} className="flex w-full md:w-auto gap-2">
						<input
							type="email"
							value={newsletterEmail}
							onChange={(e) => setNewsletterEmail(e.target.value)}
							placeholder="Nhập email của bạn..."
							className="px-3.5 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500 text-xs sm:text-sm w-full md:w-64 bg-white"
							required
						/>
						<button
							type="submit"
							className="px-4 py-2 bg-orange-600 hover:bg-orange-700 active:scale-98 text-white font-medium text-xs sm:text-sm rounded-lg transition shadow-sm whitespace-nowrap"
						>
							Đăng ký
						</button>
					</form>
				</div>
			</section>
		</main>
	)
}
