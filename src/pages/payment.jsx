import { useForm } from 'react-hook-form'
import React, { useState } from 'react'
import Button from '../components/Button'
import Header from '../components/Header/Header'
import provinces from '../utils/address/province'
import { v4 as uuidv4 } from 'uuid'

export default function Payment() {
	const [payment, setPayment] = useState('Cash')
	const [province, setProvince] = useState('')
	const [ward, setWard] = useState('')

	const onPaymentChange = (event) => {
		setPayment(event.target.value)
		console.log(payment)
	}
	const { register, handleSubmit } = useForm()

	const onChangeProvince = (event) => {
		console.log(province)
		setProvince(event.target.options[event.target.selectedIndex])
	}

	return (
		<>
			<Header />
			<div className='payment-form pb-20 m-auto w-9/12 mt-10'>
				<div className='rounded-lg bg-white'>
					<form>
						<div className='p-5 flex w-5/12'>
							<label className='flex-1'>Họ và tên</label>
							<input
								className='flex-2 rounded-lg border-2 border-orange-500'
								type='text'
								placeholder='Nhập họ và tên'
								{...register('name')}
							/>
						</div>
						<div className='p-5 flex w-5/12'>
							<label className='flex-1'>Số điện thoại</label>
							<input
								className='flex-2 rounded-lg border-2 border-orange-500'
								type='text'
								placeholder='Nhập họ và tên'
								{...register('phone')}
							/>
						</div>
						<div className='p-5 flex w-5/12'>
							<label className="flex-1">Tỉnh/Thành phố</label>
							<select
								className='border-2 flex-2 rounded-lg border-orange-500'
								onChange={(ev)=> onChangeProvince(ev)}
								{...register('province')}>
								<option
									key={uuidv4()}
									value=''
									disabled
									selected>
									Chọn tỉnh
								</option>
								{Object.keys(provinces).map((key) => (
									<option
										key={uuidv4()}
										value={provinces[key].name}>
										{provinces[key].name}
									</option>
								))}
							</select>
						</div>
						<div className='p-5 flex w-5/12'>
							<label className='flex-1'>Quận/Huyện</label>
							<select
								className='border-2 flex-2 rounded-lg border-orange-500'
								{...register('district')}>
								<option
									className='flex-2 rounded-lg'
									key={uuidv4()}
									value=''
									disabled
									selected>
									Chọn Huyện
								</option>
								<option key={uuidv4()} value='1'>
									Test
								</option>
								<option key={uuidv4()} value='2'>
									Test 2
								</option>
							</select>
						</div>
						<div className='p-5 flex w-5/12'>
							<label className='flex-1'>Phường/Xã</label>
							<select
								className='flex-2 rounded-lg border-2 border-orange-500'
								{...register('commune')}>
								<option
									className='flex-2 rounded-lg'
									key={uuidv4()}
									value=''
									disabled
									selected>
									Chọn Phường/Xã
								</option>
								<option key={uuidv4()} value='1'>
									Test
								</option>
								<option key={uuidv4()} value='2'>
									Test 2
								</option>
							</select>
						</div>
						<div className='p-5 flex w-5/12'>
							<label className='flex-1'>Địa chỉ nhận hàng</label>
							<input
								className='flex-2 rounded-lg border-2 border-orange-500'
								placeholder='Nhập địa chỉ nhận hàng'
								{...register('address')}
							/>
						</div>
						<div className='p-2 pl-5'>
							<h1>Phương thức thanh toán</h1>
							<div onChange={(event) => onPaymentChange(event)}>
								<div className='flex gap-2'>
									<input
										type='radio'
										value='Cash'
										name='pay'
									/>
									<img
										className='w-10'
										src='/icons/cash-icon.svg'
									/>
									<span> Thanh toán khi nhận hàng</span>
								</div>
								<br />
								<div className='flex gap-2'>
									<input
										type='radio'
										value='Momo'
										name='pay'
									/>
									<img
										className='w-10'
										src='/icons/cash-icon.svg'
									/>
									<span>Momo</span>
								</div>
								<br />
								<div className='flex gap-2'>
									<input
										type='radio'
										value='Bank'
										name='pay'
									/>{' '}
									<img
										className='w-10'
										src='/icons/credit-card.svg'
									/>
									<span>Ngân hàng</span>
								</div>
								<br />
							</div>
						</div>
					</form>
					<div className='border p-5'>
						<div>
							<div>
								<label>Thành tiền: </label>
								<span>120.000đ</span>
							</div>
							<div>
								<label>Phí giao hàng: </label>
								<span>120.000đ</span>
							</div>
							<div>
								<label>Tổng tiền: </label>
								<span>120.000đ</span>
							</div>
						</div>
						<Button
							onClick={handleSubmit((data) => {
								data.payment = payment
								console.log(data)
							})}>
							Thanh toán
						</Button>
					</div>
				</div>
			</div>
		</>
	)
}
