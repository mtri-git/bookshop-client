import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { SEARCH_PATH } from '../constants/path'
import Icon from './Icon'

const slides = [
	{
		src: '/images/slider-1.jpg',
		fallback: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=1200',
		title: 'Lễ Hội Sách 2026',
		subtitle: 'Ưu đãi cực khủng - Giảm giá đến 50%',
		badge: 'HOT DEAL',
		tagColor: 'bg-red-600',
	},
	{
		src: '/images/slider-2.jpg',
		fallback: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=1200',
		title: 'Tủ Sách Phát Triển Bản Thân',
		subtitle: 'Thay đổi tư duy - Kiến tạo thành công vượt bậc',
		badge: 'BÁN CHẠY',
		tagColor: 'bg-orange-600',
	},
	{
		src: '/images/slider-3.jpg',
		fallback: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&q=80&w=1200',
		title: 'Văn Học Kinh Điển Thế Giới',
		subtitle: 'Những tác phẩm tuyển chọn vượt thời gian',
		badge: 'TUYỂN CHỌN',
		tagColor: 'bg-gray-800',
	},
]

export default function Slider() {
	const [currentSlide, setCurrentSlide] = useState(0)
	const [isAutoPlay, setIsAutoPlay] = useState(true)
	const autoPlayRef = useRef(null)

	const nextSlide = () => {
		setCurrentSlide((prev) => (prev + 1) % slides.length)
	}

	const prevSlide = () => {
		setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
	}

	const goToSlide = (index) => {
		setCurrentSlide(index)
	}

	useEffect(() => {
		if (isAutoPlay) {
			autoPlayRef.current = setInterval(() => {
				nextSlide()
			}, 4000)
		} else {
			clearInterval(autoPlayRef.current)
		}
		return () => clearInterval(autoPlayRef.current)
	}, [isAutoPlay, currentSlide])

	return (
		<div
			className="relative w-full h-[240px] sm:h-[300px] md:h-full min-h-[260px] md:min-h-[350px] group rounded-xl overflow-hidden border border-gray-200 bg-gray-900 shadow-sm"
			onMouseEnter={() => setIsAutoPlay(false)}
			onMouseLeave={() => setIsAutoPlay(true)}
		>
			{/* Slides */}
			<div
				className="flex transition-transform duration-500 ease-out h-full"
				style={{ transform: `translateX(-${currentSlide * 100}%)` }}
			>
				{slides.map((slide, idx) => (
					<div key={idx} className="min-w-full h-full relative overflow-hidden">
						<img
							src={slide.src}
							alt={slide.title}
							className="w-full h-full object-cover select-none"
							onError={(e) => {
								if (slide.fallback && e.target.src !== slide.fallback) {
									e.target.src = slide.fallback
								}
							}}
						/>
						<div className="absolute inset-0 bg-black/45 flex flex-col justify-end p-5 md:p-7">
							<div className="space-y-1.5 max-w-lg text-white">
								<span className={`${slide.tagColor} text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider inline-block`}>
									{slide.badge}
								</span>
								<h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white drop-shadow-sm">
									{slide.title}
								</h2>
								<p className="text-gray-200 text-xs sm:text-sm drop-shadow line-clamp-1">
									{slide.subtitle}
								</p>
								<div className="pt-1.5">
									<Link
										to={SEARCH_PATH}
										className="inline-flex items-center gap-1.5 bg-orange-600 hover:bg-orange-700 active:scale-95 text-white text-xs sm:text-sm font-medium px-3.5 py-1.5 rounded-lg transition shadow-sm"
									>
										<span>Khám phá ngay</span>
										<Icon name='arrow-right' className="w-3.5 h-3.5" />
									</Link>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Navigation Buttons */}
			<button
				onClick={prevSlide}
				className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-gray-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-150 shadow border border-gray-200 z-10"
				aria-label="Previous slide"
			>
				<Icon name='chevron-left' className="w-4 h-4" />
			</button>

			<button
				onClick={nextSlide}
				className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-gray-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-150 shadow border border-gray-200 z-10"
				aria-label="Next slide"
			>
				<Icon name='chevron-right' className="w-4 h-4" />
			</button>

			{/* Indicator Dots */}
			<div className="absolute bottom-2.5 right-3.5 flex items-center space-x-1.5 z-10">
				{slides.map((_, idx) => (
					<button
						key={idx}
						onClick={() => goToSlide(idx)}
						className={`transition-all duration-200 rounded-full h-1.5 ${
							idx === currentSlide ? 'w-5 bg-orange-500' : 'w-1.5 bg-white/60 hover:bg-white'
						}`}
						aria-label={`Go to slide ${idx + 1}`}
					/>
				))}
			</div>
		</div>
	)
}
