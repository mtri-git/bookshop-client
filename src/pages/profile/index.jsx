import React from 'react'
import ProfileInput from '../../components/ProfileInput'
import Button from '../../components/Button'
import { useSelectUser } from '../../redux/selectors/useSelectUser'

export default function Profile() {
	const user = useSelectUser()
	return (
		<div className='container pb-10 bg-white'>
			<h1 className='text-center text-xl p-5'>Hồ Sơ của tôi</h1>
			<div>
				<ProfileInput defaultValue={user.user.data.fullname}>Họ và tên</ProfileInput>
				<ProfileInput type='email' defaultValue={user.user.data.email}>Địa chỉ email</ProfileInput>
				<ProfileInput defaultValue={user.user.data.address}>Địa chỉ</ProfileInput>
				<ProfileInput defaultValue={user.user.data.postalCode}>Mã bưu điện</ProfileInput>
				<ProfileInput defaultValue={user.user.data.phone || ""}>SĐT</ProfileInput>
			</div>
			<div className='mt-5 w-1/6 m-auto text-center'>
				<Button className='w-full'>Lưu</Button>
			</div>
		</div>
	)
}
