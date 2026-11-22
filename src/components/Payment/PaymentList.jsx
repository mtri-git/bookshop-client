import React from 'react'
import { formatPrice } from '../../utils/format'
import PaymentItem from './PaymentItem'
import Icon from '../Icon'

const STATUS_CONFIG = {
	'Đã giao': { color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200', dot: 'bg-emerald-500' },
	'Đang giao': { color: 'text-blue-700', bg: 'bg-blue-50 border-blue-200', dot: 'bg-blue-500' },
	'Chờ xác nhận': { color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200', dot: 'bg-amber-500' },
	'Đã hủy': { color: 'text-red-700', bg: 'bg-red-50 border-red-200', dot: 'bg-red-500' },
}

export default function PaymentList({ data }) {
	const statusCfg = STATUS_CONFIG[data.status] || STATUS_CONFIG['Chờ xác nhận']

	return (
		<div className="rounded-xl border border-gray-200/80 overflow-hidden">
			{/* Order Header */}
			<div className="px-4 sm:px-5 py-3 bg-gray-50 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
				<div className="flex items-center gap-2 flex-wrap">
					<span className="text-xs font-bold text-gray-700">
						Đơn hàng #{data._id?.slice(-8)?.toUpperCase()}
					</span>
					<span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full border ${statusCfg.bg} ${statusCfg.color}`}>
						<span className={`w-1.5 h-1.5 rounded-full ${statusCfg.dot}`} />
						{data.status || 'Chờ xác nhận'}
					</span>
				</div>

				<div className="flex items-center gap-3 text-[11px] text-gray-600">
					{data.create_at && (
						<span>
							{new Date(data.create_at).toLocaleString('vi-VN', {
								timeZone: 'Asia/Ho_Chi_Minh',
								dateStyle: 'short',
								timeStyle: 'short',
							})}
						</span>
					)}
					<span className={`inline-flex items-center gap-1 font-semibold ${data.is_paid ? 'text-emerald-600' : 'text-amber-600'}`}>
						<Icon name={data.is_paid ? 'check' : 'clock'} className='w-3.5 h-3.5' />
						{data.is_paid ? 'Đã thanh toán' : 'Chưa thanh toán'}
					</span>
				</div>
			</div>

			{/* Items */}
			<div className="divide-y divide-gray-100">
				{data?.order_items?.map((item, idx) => (
					<PaymentItem key={item._id || idx} {...item} {...item.info} _id={item.info?._id} />
				))}
			</div>

			{/* Total */}
			<div className="px-4 sm:px-5 py-3 bg-gray-50/50 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
				<div className="text-[11px] text-gray-500 space-x-3">
					<span>Phí ship: {data.ship_fee ? `${formatPrice(data.ship_fee)} đ` : 'Miễn phí'}</span>
					{data.voucher && <span>Mã: {data.voucher} (-{formatPrice(data.voucher_discount)} đ)</span>}
					{data.address && <span className="hidden sm:inline">Giao tới: {data.address}</span>}
				</div>
				<div className="flex items-center gap-4 text-sm">
					<span className="text-gray-600">Tổng cộng:</span>
					<div className="text-right">
						<span className="text-base font-bold text-orange-600">
							{formatPrice(data.order_total_value)} đ
						</span>
						{data.total > data.order_total_value && (
							<span className="text-xs text-gray-400 line-through ml-2">
								{formatPrice(data.total)} đ
							</span>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
