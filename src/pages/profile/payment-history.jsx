import React from 'react'
import PaymentList from '../../components/Payment/PaymentList'
import { useOrder } from '../../hooks/useOrder'
import {v4 as uuidv4} from 'uuid'
import { Link } from 'react-router-dom'
import { HOME_PATH } from '../../constants/path'

export default function PaymentHistory() {
	const {data, isLoading, error} = useOrder()
	const orders = data?.data

	if(!orders)
		return (
			<div className="min-h-[60vh] flex flex-col justify-center items-center bg-gradient-to-br from-orange-50 to-red-50 py-8 px-2">
				<div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full flex flex-col items-center">
					<div className="text-2xl font-bold text-gray-800 mb-4">Chưa có đơn hàng</div>
					<img className="p-2 max-w-[160px] mx-auto" src="/icons/ico_emptycart.svg" />
					<Link to={HOME_PATH} className="mt-6 w-full">
						<div className="p-3 border-2 border-orange-600 rounded-lg text-orange-700 font-semibold text-center hover:bg-orange-500 hover:text-white active:bg-orange-600 transition-all">
							Đặt hàng ngay
						</div>
					</Link>
				</div>
			</div>
		)

	return (
		<div className="min-h-[60vh] flex flex-col items-center bg-gradient-to-br from-orange-50 to-red-50 py-8 px-2">
			<div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full">
				<div className="text-2xl font-bold text-center text-gray-800 mb-6">Lịch sử đơn hàng</div>
				{isLoading ? (
					<div className="text-center text-gray-500 py-8">Loading...</div>
				) : (
					orders.map(order => <PaymentList key={uuidv4()} data={order}/>)
				)}
			</div>
		</div>
	)
}
