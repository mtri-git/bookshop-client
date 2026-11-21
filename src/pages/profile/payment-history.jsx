import React from 'react'
import PaymentList from '../../components/Payment/PaymentList'
import { useOrder } from '../../hooks/useOrder'
import { v4 as uuidv4 } from 'uuid'
import { Link } from 'react-router-dom'
import { HOME_PATH, SEARCH_PATH } from '../../constants/path'

export default function PaymentHistory() {
	const { data, isLoading, error } = useOrder()
	const orders = data?.data

	if (isLoading) {
		return (
			<div className="bg-white rounded-xl border border-gray-200/80 shadow-xs p-8 sm:p-12">
				<div className="flex flex-col items-center gap-3 py-8">
					<svg className="animate-spin w-8 h-8 text-orange-500" fill="none" viewBox="0 0 24 24">
						<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
						<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
					</svg>
					<span className="text-sm text-gray-500">Đang tải lịch sử đơn hàng...</span>
				</div>
			</div>
		)
	}

	if (!orders || orders.length === 0) {
		return (
			<div className="bg-white rounded-xl border border-gray-200/80 shadow-xs p-8 sm:p-12 text-center">
				<div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4">
					<svg className="w-10 h-10 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
					</svg>
				</div>
				<h3 className="text-base font-bold text-gray-900 mb-1">Chưa có đơn hàng nào</h3>
				<p className="text-xs sm:text-sm text-gray-500 mb-6 leading-relaxed">
					Bạn chưa đặt đơn hàng nào. Hãy khám phá sách và bắt đầu mua sắm ngay!
				</p>
				<div className="flex flex-col sm:flex-row items-center justify-center gap-3">
					<Link
						to={SEARCH_PATH}
						className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-semibold text-sm rounded-xl transition-colors shadow-xs"
					>
						Khám phá sách ngay
					</Link>
					<Link
						to={HOME_PATH}
						className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-sm rounded-xl transition-colors"
					>
						Về trang chủ
					</Link>
				</div>
			</div>
		)
	}

	return (
		<div className="bg-white rounded-xl border border-gray-200/80 shadow-xs overflow-hidden">
			{/* Header */}
			<div className="px-5 sm:px-8 py-4 border-b border-gray-100">
				<div className="flex items-center justify-between">
					<div>
						<h2 className="text-base font-bold text-gray-900">Lịch sử đơn hàng</h2>
						<p className="text-xs text-gray-500 mt-0.5">{orders.length} đơn hàng</p>
					</div>
					<span className="text-xs text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full font-medium">
						{orders.length} đơn
					</span>
				</div>
			</div>

			<div className="p-4 sm:p-6 space-y-4">
				{orders.map((order) => (
					<PaymentList key={uuidv4()} data={order} />
				))}
			</div>
		</div>
	)
}
