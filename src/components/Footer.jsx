import React from 'react'
import { Link } from 'react-router-dom'
import { HOME_PATH, SEARCH_PATH } from '../constants/path'

export default function Footer() {
	return (
		<footer className="bg-gray-900 text-gray-400 mt-12 border-t border-gray-800">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
					{/* Brand & Intro */}
					<div className="space-y-3">
						<Link to={HOME_PATH} className="flex items-center gap-2">
							<div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center text-white">
								<svg className="w-5 h-5 fill-none stroke-current" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
								</svg>
							</div>
							<span className="text-xl font-bold text-white tracking-tight">
								BookShop
							</span>
						</Link>
						<p className="text-xs text-gray-400 leading-relaxed">
							Nền tảng mua sách trực tuyến uy tín hàng đầu. Cam kết 100% sách thật, giao hàng nhanh chóng toàn quốc.
						</p>
					</div>

					{/* Categories */}
					<div>
						<h3 className="text-xs font-bold text-gray-200 uppercase tracking-wider mb-3">
							Danh mục nổi bật
						</h3>
						<ul className="space-y-2 text-xs">
							<li>
								<Link to={`${SEARCH_PATH}?category=Văn học`} className="hover:text-white transition">
									Sách Văn học
								</Link>
							</li>
							<li>
								<Link to={`${SEARCH_PATH}?category=Kinh tế`} className="hover:text-white transition">
									Sách Kinh tế & Khởi nghiệp
								</Link>
							</li>
							<li>
								<Link to={`${SEARCH_PATH}?category=Kỹ năng`} className="hover:text-white transition">
									Kỹ năng sống & Phát triển bản thân
								</Link>
							</li>
							<li>
								<Link to={`${SEARCH_PATH}?category=Thiếu nhi`} className="hover:text-white transition">
									Sách Thiếu nhi
								</Link>
							</li>
						</ul>
					</div>

					{/* Customer Service */}
					<div>
						<h3 className="text-xs font-bold text-gray-200 uppercase tracking-wider mb-3">
							Hỗ trợ khách hàng
						</h3>
						<ul className="space-y-2 text-xs">
							<li>
								<span className="text-gray-400">Hotline: 1900 6868 (8:00 - 21:00)</span>
							</li>
							<li>
								<span className="text-gray-400">Email: support@bookshop.vn</span>
							</li>
							<li>
								<span className="text-gray-400">Chính sách bảo mật & Đổi trả</span>
							</li>
							<li>
								<span className="text-gray-400">Phương thức thanh toán an toàn</span>
							</li>
						</ul>
					</div>

					{/* Social / Cert */}
					<div>
						<h3 className="text-xs font-bold text-gray-200 uppercase tracking-wider mb-3">
							Kết nối với chúng tôi
						</h3>
						<p className="text-xs text-gray-400 mb-3">
							Theo dõi BookShop để cập nhật các sự kiện hội sách và mã giảm giá độc quyền.
						</p>
						<div className="flex items-center gap-3 text-gray-400">
							<span className="p-2 bg-gray-800 rounded-lg hover:text-white cursor-pointer transition">
								<svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
									<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
								</svg>
							</span>
							<span className="p-2 bg-gray-800 rounded-lg hover:text-white cursor-pointer transition">
								<svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
									<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
								</svg>
							</span>
						</div>
					</div>
				</div>

				<div className="pt-6 border-t border-gray-800 text-center text-xs text-gray-500">
					&copy; 2026 BookShop. Bản quyền thuộc về BookShop. Mọi quyền được bảo lưu.
				</div>
			</div>
		</footer>
	)
}
