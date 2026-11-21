import React from 'react'
import { Link } from 'react-router-dom'
import { HOME_PATH, SEARCH_PATH } from '../constants/path'
import Icon from '../components/Icon'

export default function Page404() {
  return (
    <main className="min-h-screen bg-gray-50/60 flex items-center justify-center px-4 py-16">
      <div className="text-center max-w-md mx-auto">
        {/* Big 404 illustration */}
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <span className="text-[120px] sm:text-[160px] font-extrabold text-gray-100 select-none leading-none">
              404
            </span>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center">
                <Icon name='face-sad' className="w-10 h-10 text-orange-500" strokeWidth={1.5} />
              </div>
            </div>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Trang không tồn tại
        </h1>
        <p className="text-sm sm:text-base text-gray-500 mb-8 leading-relaxed">
          Trang bạn đang tìm kiếm đã bị xóa, đổi tên hoặc tạm thời không khả dụng.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to={HOME_PATH}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-xl transition-colors shadow-sm text-sm"
          >
            <Icon name='home' className="w-4 h-4" />
            <span>Về trang chủ</span>
          </Link>
          <Link
            to={SEARCH_PATH}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-xl transition-colors border border-gray-200 shadow-sm text-sm"
          >
            <Icon name='search' className="w-4 h-4" />
            <span>Khám phá sách</span>
          </Link>
        </div>
      </div>
    </main>
  )
}
