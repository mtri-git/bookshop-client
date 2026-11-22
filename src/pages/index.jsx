import React, { useEffect, useState, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from '../components/Link'
import Slider from '../components/Slider'
import BookCard from '../components/BookCard'
import { bestSellersQuery, newBooksQuery } from '../lib/queries'
import { SEARCH_PATH } from '../constants/path'
import { toast_success } from '../utils/toastNotify'
import Icon from '../components/Icon'

// Service highlights list with clean solid icons
const FEATURES = [
	{
		icon: (
			<Icon name='archive' className="w-5 h-5 text-orange-600" />
		),
		title: 'Freeship từ 150K',
		desc: 'Giao hàng tận nơi toàn quốc',
	},
	{
		icon: (
			<Icon name='shield-check' className="w-5 h-5 text-emerald-600" />
		),
		title: '100% Sách thật',
		desc: 'Cam kết nguồn gốc xuất bản',
	},
	{
		icon: (
			<Icon name='clock' className="w-5 h-5 text-blue-600" />
		),
		title: 'Giao nhanh 2h',
		desc: 'Nội thành Hà Nội & TP.HCM',
	},
	{
		icon: (
			<Icon name='refresh' className="w-5 h-5 text-purple-600" />
		),
		title: 'Đổi trả 30 ngày',
		desc: 'Thủ tục hoàn tiền dễ dàng',
	},
	{
		icon: (
			<Icon name='currency' className="w-5 h-5 text-rose-600" />
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
			<Icon name='book' className="w-5 h-5 text-blue-600" />
		),
	},
	{
		name: 'Kinh tế',
		count: '850+ cuốn',
		icon: (
			<Icon name='trending-up' className="w-5 h-5 text-amber-600" />
		),
	},
	{
		name: 'Kỹ năng',
		count: '920+ cuốn',
		icon: (
			<Icon name='light-bulb' className="w-5 h-5 text-emerald-600" />
		),
	},
	{
		name: 'Thiếu nhi',
		count: '640+ cuốn',
		icon: (
			<Icon name='face-smile' className="w-5 h-5 text-pink-600" />
		),
	},
	{
		name: 'Manga - Comic',
		count: '1,500+ cuốn',
		icon: (
			<Icon name='bolt' className="w-5 h-5 text-purple-600" />
		),
	},
	{
		name: 'Ngoại văn',
		count: '430+ cuốn',
		icon: (
			<Icon name='globe' className="w-5 h-5 text-cyan-600" />
		),
	},
	{
		name: 'Khoa học',
		count: '310+ cuốn',
		icon: (
			<Icon name='beaker' className="w-5 h-5 text-indigo-600" />
		),
	},
	{
		name: 'Tâm lý',
		count: '520+ cuốn',
		icon: (
			<Icon name='heart' className="w-5 h-5 text-rose-600" />
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

// Time left until midnight (Vietnam time): the daily flash sale window
function secondsUntilMidnightVN() {
	const now = new Date()
	const vn = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' }))
	const midnight = new Date(vn)
	midnight.setHours(24, 0, 0, 0)
	return Math.max(0, Math.floor((midnight - vn) / 1000))
}

// Client-only countdown: rendered as "--" during SSR to avoid hydration mismatch
function useDailyCountdown() {
	const [seconds, setSeconds] = useState(null)
	useEffect(() => {
		setSeconds(secondsUntilMidnightVN())
		const timer = setInterval(() => setSeconds(secondsUntilMidnightVN()), 1000)
		return () => clearInterval(timer)
	}, [])
	if (seconds === null) return null
	return {
		hours: Math.floor(seconds / 3600),
		minutes: Math.floor((seconds % 3600) / 60),
		seconds: seconds % 60,
	}
}

const pad = (n) => (n === undefined ? '--' : String(n).padStart(2, '0'))

export default function Home() {
	const newBooksResult = useQuery(newBooksQuery())
	const bestSellersResult = useQuery(bestSellersQuery())
	const newBooks = newBooksResult.data || []
	const bestSellerBooks = bestSellersResult.data || []
	const loading = newBooksResult.isPending || bestSellersResult.isPending
	const loadFailed = newBooksResult.isError && bestSellersResult.isError
	const [activeTab, setActiveTab] = useState('all') // 'all', 'new', 'bestseller'
	const timeLeft = useDailyCountdown() || {}

	const displayedBooks = useMemo(() => {
		if (activeTab === 'new') return newBooks
		if (activeTab === 'bestseller') return bestSellerBooks
		const seen = new Set()
		return [...bestSellerBooks, ...newBooks].filter((book) => !seen.has(book._id) && seen.add(book._id))
	}, [activeTab, newBooks, bestSellerBooks])


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
						<div key={idx} className="flex items-center gap-3 p-1.5 min-w-0">
							<div className="p-2 bg-white rounded-lg border border-gray-200 shadow-sm shrink-0">
								{item.icon}
							</div>
							<div className="min-w-0">
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
								<Icon name='bolt-solid' className="w-3.5 h-3.5" />
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
									{pad(timeLeft.hours)}
								</span>
								<span className="text-gray-900">:</span>
								<span className="bg-gray-900 text-white px-2 py-0.5 rounded">
									{pad(timeLeft.minutes)}
								</span>
								<span className="text-gray-900">:</span>
								<span className="bg-gray-900 text-white px-2 py-0.5 rounded">
									{pad(timeLeft.seconds)}
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
								<BookCard key={book._id} {...book} />
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
							<BookCard key={book._id} {...book} />
						))
					) : (
						<div className="col-span-full py-12 text-center text-gray-500 text-sm">
							{loadFailed ? 'Không tải được danh sách sách, vui lòng thử lại sau.' : 'Không có sản phẩm nào.'}
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
						<Icon name='arrow-right' className="w-4 h-4" />
					</Link>
				</div>
			</section>

			{/* PROMOTION BANNER STRIP - SOLID DEEP SLATE */}
			<section className="px-4 sm:px-6 lg:px-8">
				<div className="rounded-xl bg-gray-900 text-white p-6 sm:p-8 border border-gray-800 flex flex-col md:flex-row items-center justify-between gap-6">
					<div className="space-y-2 max-w-xl text-center md:text-left">
						<span className="bg-yellow-400 text-gray-900 font-bold text-[11px] px-2.5 py-0.5 rounded uppercase tracking-wider">
							Ưu Đãi Độc Quyền
						</span>
						<h3 className="text-xl sm:text-2xl font-bold">
							Hội Sách Mùa Hè 2026 - Giảm Thêm 15%
						</h3>
						<p className="text-gray-300 text-xs sm:text-sm">
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

			{/* VOUCHERS - codes that the checkout actually accepts */}
			<section className="px-4 sm:px-6 lg:px-8">
				<div className="bg-gray-50 rounded-xl p-5 sm:p-7 border border-gray-200 flex flex-col md:flex-row items-center justify-between gap-5">
					<div className="space-y-1 text-center md:text-left">
						<h3 className="text-base sm:text-lg font-bold text-gray-900">Mã giảm giá dành cho bạn</h3>
						<p className="text-xs text-gray-600">Nhập mã ở bước giỏ hàng. Miễn phí vận chuyển cho đơn từ 150.000 đ.</p>
					</div>
					<div className="flex flex-wrap justify-center gap-2">
						{[
							{ code: 'BOOK10K', desc: 'Giảm 10.000 đ' },
							{ code: 'FREESHIP', desc: 'Miễn phí ship' },
						].map((v) => (
							<button
								key={v.code}
								type="button"
								onClick={() => {
									navigator.clipboard?.writeText(v.code)
									toast_success(`Đã sao chép mã ${v.code}`)
								}}
								className="px-4 py-2 rounded-lg border border-dashed border-orange-400 bg-white text-left hover:bg-orange-50 transition"
								title="Bấm để sao chép mã">
								<div className="text-sm font-bold text-orange-600 tracking-wide">{v.code}</div>
								<div className="text-[11px] text-gray-500">{v.desc}</div>
							</button>
						))}
					</div>
				</div>
			</section>
		</main>
	)
}
