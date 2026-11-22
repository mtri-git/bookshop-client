import React from 'react'
import { Link } from './Link'
import { HOME_PATH, SEARCH_PATH } from '../constants/path'
import Icon from './Icon'

export default function Footer() {
	return (
		<footer className="bg-gray-900 text-gray-400 mt-12 border-t border-gray-800">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
					{/* Brand & Intro */}
					<div className="space-y-3">
						<Link to={HOME_PATH} className="flex items-center gap-2">
							<div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center text-white">
								<Icon name='book' className="w-5 h-5" />
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
								<Icon name='facebook' className="w-4 h-4" />
							</span>
							<span className="p-2 bg-gray-800 rounded-lg hover:text-white cursor-pointer transition">
								<Icon name='instagram' className="w-4 h-4" />
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
