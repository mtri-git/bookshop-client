import { useForm } from 'react-hook-form'
import React, { useState } from 'react'
import Button from '../components/Button'
import Header from '../components/Header/Header'
import { useSelectUser } from '../redux/selectors/useSelectUser'
import { useCart } from '../redux/selectors/useCart'
import CheckoutList from '../components/checkoutList'
import { formatPrice } from '../utils/format'
import { Link, useNavigate } from 'react-router-dom'
import { CART_PATH, PAYMENT_HISTORY_PATH } from '../constants/path'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { newOrder } from '../redux/actions/orderAction'
import { DialogProvider, useDialog } from '../hooks/useDialog'
import { useMemo } from 'react'
import {v4 as uuidv4} from 'uuid'

export default function Payment() {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const {setIsOpenDialog, setDialogData} = useDialog()
	const [payment, setPayment] = useState('Cash')
	const [orderData, setOrderData] = useState({})

	const user = useSelectUser()
	const cart = useCart()
	const checkoutItems = cart.cart.filter(cartItem => cartItem.checked)
	const totalWithSale =  useMemo( () => checkoutItems.reduce(
		(acc, cartItem) =>
			acc + (1 - cartItem.sale) * cartItem.price * cartItem.count,
		0
	), [checkoutItems])

	useEffect(()=>{
		const items = checkoutItems.map(item => ( {id: item._id, quantity: item.count}))
		orderData.order_items = items
		orderData.address = user?.user.data.address
		orderData.payment_type = payment
		setOrderData(orderData)
		console.log(orderData);
	}, [payment])
	
	useEffect(()=>{
		if(checkoutItems.length <= 0)
			navigate(CART_PATH)
	}, [])

	const onPay = async() => {
		const res = await dispatch(newOrder(orderData))
		if(res === 'SUCCESS')
		{
			setDialogData({title: "Đặt hàng thành công", content: "Bạn đã đặt hàng thành công"})
			setIsOpenDialog(true)
			navigate(PAYMENT_HISTORY_PATH)

		}
		else
		{
			setDialogData({title: "Đặt hàng thất bại", content: "Đặt hàng thất bại"})
			setIsOpenDialog(true)
		}

	}

	const onPaymentChange = (event) => {
		setPayment(event.target.value)
	}


	return (
		<DialogProvider>
			<div>
				<Header />
				<div className="payment-form pb-20 max-w-2xl w-full mx-auto mt-6 px-2 sm:px-0">
					<div className="rounded-lg bg-white shadow-md">
						<form>
							{user?.isLoggedIn ? (
								<div className="p-4 sm:p-5 border-dashed border-b-2">
									<div className="font-bold text-base sm:text-lg">Địa chỉ giao hàng: </div>
									<div className="text-sm sm:text-md break-words">{` ${user?.user.data.fullname} | ${user?.user.data.phone} | ${user?.user.data.address}`}</div>
									<div className="text-sm sm:text-md">Postal Code: {user?.user.data.postalCode}</div>
								</div>
							) : (
								<>Nothing</>
							)}
							<div className="p-2 sm:pl-5">
								<h1 className="font-bold text-base sm:text-lg">Phương thức thanh toán</h1>
								<div className="pt-4 space-y-3" onChange={onPaymentChange}>
									<div className="flex items-center gap-2">
										<input type="radio" value="Cash" name="pay" checked={payment === 'Cash'} key={uuidv4()} />
										<img className="w-8 sm:w-10" src="/icons/cash-icon.svg" />
										<label className="text-sm sm:text-base">Thanh toán khi nhận hàng</label>
									</div>
									<div className="flex items-center gap-2">
										<input type="radio" value="Momo" name="pay" checked={payment === 'Momo'} key={uuidv4()} />
										<img className="w-8 sm:w-10" src="/icons/cash-icon.svg" />
										<label className="text-sm sm:text-base">Momo</label>
									</div>
									<div className="flex items-center gap-2">
										<input type="radio" value="Bank" name="pay" key={uuidv4()} checked={payment === 'Bank'} />
										<img className="w-8 sm:w-10" src="/icons/credit-card.svg" />
										<label className="text-sm sm:text-base">Ngân hàng</label>
									</div>
								</div>
							</div>
						</form>
						<div className="p-4 sm:p-5">
							<div className="font-semibold mb-2">Kiểm kê lại đơn hàng</div>
							<CheckoutList data={checkoutItems}/>
						</div>
					</div>
				</div>

				<div className="p-4 sm:p-5 bg-white fixed sm:static bottom-0 left-0 w-full sm:w-auto shadow-xl text-end z-20 border-t sm:border-0">
					<div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center sm:justify-between gap-2 border-b-2 pb-2">
						<div className="flex flex-col sm:flex-row gap-2 sm:gap-6 w-full sm:w-auto justify-between">
							<div>
								<label>Thành tiền: </label>
								<span>{formatPrice( totalWithSale)}đ</span>
							</div>
							<div>
								<label>Phí giao hàng: </label>
								<span>12.000đ</span>
							</div>
							<div>
								<label className="font-bold">Tổng tiền: </label>
								<span className="font-bold text-orange-600 text-lg">{formatPrice( totalWithSale)}đ</span>
							</div>
						</div>
					</div>
					<div className="max-w-2xl mx-auto pt-2 flex flex-col sm:flex-row items-center gap-2">
						<Link to={CART_PATH} className="text-sm sm:text-base text-blue-600 hover:underline">🠔 Quay về giỏ hàng</Link>
						<Button
							className="ml-0 sm:ml-auto w-full sm:w-auto"
							onClick={onPay}
						>
							Thanh toán
						</Button>
					</div>
				</div>
			</div>
		</DialogProvider>
	)
}
