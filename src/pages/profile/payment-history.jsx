import React from 'react'
import PaymentList from '../../components/Payment/PaymentList'
import { useOrder } from '../../hooks/useOrder'
import {v4 as uuidv4} from 'uuid'

export default function PaymentHistory() {
	const {data, isLoading, error} = useOrder()
	const orders = data?.data
	// console.log(isLoading);

	return (
		<div className='bg-white rounded p-5'>
			<div className='p-5 text-xl'>Lịch sử đơn hàng</div>
			{
				isLoading ? 
				"Loading" : 
				orders.map(order => <PaymentList key={uuidv4()} data={order}/>)
			}
			
		</div>
	)
}
