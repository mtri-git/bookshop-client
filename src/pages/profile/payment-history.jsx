import React from 'react'
import PaymentList from '../../components/Payment/PaymentList'
import { useQuery } from '@tanstack/react-query'
import { ordersQuery } from '../../lib/queries'
import { Link } from '../../components/Link'
import { HOME_PATH, SEARCH_PATH } from '../../constants/path'
import Icon from '../../components/Icon'

export default function PaymentHistory() {
	const { data: orders, isPending: isLoading, isError, error, refetch } = useQuery(ordersQuery())

	if (isError) {
		return (
			<div className="bg-white rounded-xl border border-gray-200/80 shadow-xs p-8 text-center space-y-3">
				<p className="text-sm text-gray-600">{error?.message || 'Không tải được lịch sử đơn hàng'}</p>
				<button type="button" onClick={() => refetch()} className="px-4 py-2 text-xs font-semibold text-orange-600 border border-orange-200 rounded-lg hover:bg-orange-50">
					Thử lại
				</button>
			</div>
		)
	}

	if (isLoading) {
		return (
			<div className="bg-white rounded-xl border border-gray-200/80 shadow-xs p-8 sm:p-12">
				<div className="flex flex-col items-center gap-3 py-8">
					<Icon name='spinner' className="animate-spin w-8 h-8 text-orange-500" />
					<span className="text-sm text-gray-500">Đang tải lịch sử đơn hàng...</span>
				</div>
			</div>
		)
	}

	if (!orders || orders.length === 0) {
		return (
			<div className="bg-white rounded-xl border border-gray-200/80 shadow-xs p-8 sm:p-12 text-center">
				<div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4">
					<Icon name='clipboard' className="w-10 h-10 text-orange-400" strokeWidth={1.5} />
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
					<PaymentList key={order._id} data={order} />
				))}
			</div>
		</div>
	)
}
