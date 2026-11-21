import React from 'react'
import { Link } from 'react-router-dom'
import { HOME_PATH, SEARCH_PATH } from '../constants/path'

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
                <svg className="w-10 h-10 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
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
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>Về trang chủ</span>
          </Link>
          <Link
            to={SEARCH_PATH}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-xl transition-colors border border-gray-200 shadow-sm text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span>Khám phá sách</span>
          </Link>
        </div>
      </div>
    </main>
  )
}
