import React from 'react'
import { formatPrice } from '../../utils/format'
import PaymentItem from './PaymentItem'
import {v4 as uuidv4} from 'uuid'

export default function PaymentList({ data }) {
	return (
		<div className="bg-white rounded-xl shadow border border-orange-100 p-2 sm:p-4 my-6 w-full max-w-2xl mx-auto overflow-x-auto">
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2 w-full">
				<div className="text-orange-500 font-semibold text-base break-words max-w-full">Đơn hàng: #{data._id}</div>
				<div className="flex flex-col sm:items-end text-xs sm:text-sm text-gray-600 w-full sm:w-auto">
					<div className="break-words">
						<span className="font-medium">Tình trạng: </span>
						<span className={data.status === 'Đã giao' ? 'text-green-600 font-semibold' : 'text-yellow-600 font-semibold'}>{data.status}</span>
					</div>
					<div className="break-words">
						<span className="font-medium">Thanh toán: </span>
						<span className={data.is_paid ? 'text-green-600 font-semibold' : 'text-red-500 font-semibold'}>{data.is_paid ? 'Đã thanh toán' : 'Chưa thanh toán'}</span>
					</div>
				</div>
			</div>
			<div className="divide-y divide-gray-100 w-full">
				{data?.order_items?.map((item) => (
					<PaymentItem key={uuidv4()} {...item} {...item.info} _id={item.info._id}/>
				))}
			</div>
			<div className="flex flex-col sm:flex-row sm:justify-end gap-2 mt-4 w-full">
				<div className="bg-orange-50 rounded-lg px-3 py-2 flex flex-col sm:items-end w-full sm:w-auto">
					<div className="text-xs sm:text-sm text-gray-500 mb-1">
						<span>Khuyến mãi: </span>
						<span className="text-green-600 font-semibold">-10.000đ</span>
					</div>
					<div className="text-sm sm:text-base font-semibold break-words">
						<label>Thành tiền: </label>
						<span className="text-orange-500 font-bold text-base sm:text-lg">
							{formatPrice(data.order_total_value)}đ
						</span>
						{data.total && (
							<span className="line-through text-gray-400 ml-2 text-base font-normal">
								{formatPrice(data.total)}đ
							</span>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
