import React, { useState } from 'react'
import ProfileInput from '../../components/ProfileInput'
import Button from '../../components/Button'
import { useSelectUser } from '../../redux/selectors/useSelectUser'
import userService from '../../services/userService'
import uploadImageService from '../../services/uploadImageService'
import { sleep } from '../../utils/sleep'

export default function Profile() {
	const [isEditable, setIsEditable] = useState(false)
	const [value, setValue] = useState({})
	const [file, setFile] = useState()

	const onChange = (event, type) => {
		value[type] = event.target.value
		setValue(value)
		console.log(value)
	}

	const onUpdateInfo = async () => {
		try {
			if (file) {
				const bodyFormData = new FormData()
				bodyFormData.append('file', file)
				bodyFormData.append('upload_preset', 'wb0t30bu')
				const avatar = await uploadImageService.uploadImage(
					bodyFormData
				)

				const data = await userService.changeInfo({
					...value,
					avatarUrl: avatar.url,
				})
				// console.log(data)
			}
			else{
				const data = await userService.changeInfo(value)
				// console.log(data)
			}
			setIsEditable(false)
			sleep(500)
		} catch (error) {
			console.log(error)
		}
	}

	const user = useSelectUser()
	return (
		<div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 py-8 px-2 flex justify-center items-start w-full overflow-x-hidden">
			<div className="w-full sm:max-w-lg bg-white rounded-2xl shadow-xl p-2 sm:p-6 md:p-10 border border-orange-100 mx-auto">
				<div className="flex flex-col items-center mb-6">
					<h2 className="text-2xl font-bold text-gray-800 mb-2 break-words">Hồ Sơ của tôi</h2>
					{isEditable ? (
						<button
							className="text-sm text-orange-500 hover:underline font-semibold"
							onClick={() => setIsEditable(false)}>
							Hủy
						</button>
					) : (
						<button
							className="text-sm text-orange-500 hover:underline font-semibold"
							onClick={() => setIsEditable(true)}>
							Sửa
						</button>
					)}
				</div>
				<div className="space-y-4">
					<ProfileInput
						onChange={(ev) => setFile(ev.target.files[0])}
						isEditable={isEditable}
						type='file'>
						Avatar
					</ProfileInput>
					<ProfileInput
						onChange={(ev) => onChange(ev, 'fullname')}
						isEditable={isEditable}
						defaultValue={user.user.data.fullname}>
						Họ và tên
					</ProfileInput>
					<ProfileInput
						onChange={(ev) => onChange(ev, 'email')}
						isEditable={isEditable}
						type='email'
						defaultValue={user.user.data.email}>
						Địa chỉ email
					</ProfileInput>
					<ProfileInput
						onChange={(ev) => onChange(ev, 'address')}
						isEditable={isEditable}
						defaultValue={user.user.data.address}>
						Địa chỉ
					</ProfileInput>
					<ProfileInput
						onChange={(ev) => onChange(ev, 'postalCode')}
						isEditable={isEditable}
						defaultValue={user.user.data.postalCode}>
						Mã bưu điện
					</ProfileInput>
					<ProfileInput
						onChange={(ev) => onChange(ev, 'phone')}
						isEditable={isEditable}
						defaultValue={user.user.data.phone || ''}>
						SĐT
					</ProfileInput>
				</div>
				{isEditable && (
					<div className="mt-8 flex justify-center">
						<Button onClick={onUpdateInfo} className="w-32 text-base font-semibold py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white shadow-md transition-all">
							Lưu
						</Button>
					</div>
				)}
			</div>
		</div>
	)
}
