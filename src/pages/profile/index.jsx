import React, { useState } from 'react'
import ProfileInput from '../../components/ProfileInput'
import Button from '../../components/Button'
import { useSelectUser } from '../../redux/selectors/useSelectUser'
import userService from '../../services/userService'

export default function Profile() {
	const [isEditable, setIsEditable] = useState(false)
	const [value, setValue] = useState({})

	const onChange = (event, type) => {
		value[type] = event.target.value
		setValue(value)
		console.log(value)
	}


	const onUpdateInfo = async() => {
		try {
			const data = await userService.changeInfo(value)
			console.log(data)
			setIsEditable(false)
		} catch (error) {
			console.log(error);
		}

	}

	const user = useSelectUser()
	return (
		<div className='container pb-10 bg-white'>
			<div className='text-center p-2'>
				<span className=' text-xl p-5'>Hồ Sơ của tôi</span>
				{
					isEditable ?
					<span className='cursor-pointer hover:text-orange-500' onClick={() => setIsEditable(false)}>Hủy</span>
					:
					<span className='cursor-pointer hover:text-orange-500' onClick={() => setIsEditable(true)}>Sửa</span>
				}
			</div>
			<div>
				<ProfileInput onChange={(ev) => onChange(ev, "fullname")} isEditable={isEditable} defaultValue={user.user.data.fullname}>Họ và tên</ProfileInput>
				<ProfileInput onChange={(ev) => onChange(ev, "email")} isEditable={isEditable} type='email' defaultValue={user.user.data.email}>Địa chỉ email</ProfileInput>
				<ProfileInput onChange={(ev) => onChange(ev, "address")} isEditable={isEditable} defaultValue={user.user.data.address}>Địa chỉ</ProfileInput>
				<ProfileInput onChange={(ev) => onChange(ev, "postalCode")} isEditable={isEditable} defaultValue={user.user.data.postalCode}>Mã bưu điện</ProfileInput>
				<ProfileInput onChange={(ev) => onChange(ev, "phone")} isEditable={isEditable} defaultValue={user.user.data.phone || ""}>SĐT</ProfileInput>
			</div>
			<div className='mt-5 w-1/6 m-auto text-center'>
				{
					isEditable ?
					<>
						<Button onClick={onUpdateInfo} className='w-1/2'>Lưu</Button>

					</>
					:
					""
				}
			</div>
		</div>
	)
}
