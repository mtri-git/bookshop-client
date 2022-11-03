import React from 'react'
import ProfileInput from '../../components/ProfileInput'
import Button from '../../components/Button'

export default function Profile() {
	return (
		<div className='container pb-10'>
			<h1 className='text-center text-xl p-5'>Hồ Sơ của tôi</h1>
			<div>
				<ProfileInput />
				<ProfileInput />
				<ProfileInput />
				<ProfileInput />
				<ProfileInput />
			</div>
			<div className='mt-5 w-1/6 m-auto text-center'>
				<Button className='w-full'>Lưu</Button>
			</div>
		</div>
	)
}
