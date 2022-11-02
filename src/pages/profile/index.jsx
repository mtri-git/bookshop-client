import React from 'react'
import ProfileInput from '../../components/ProfileInput'

export default function Profile() {
	return (
		<div className='container pb-10'>
			<h1 className='text-center text-xl p-5'>Hồ Sơ của tôi</h1>
			<div className='items-center'>
			<ProfileInput/>
			<ProfileInput/>
			<ProfileInput/>
			<ProfileInput/>
			<ProfileInput/>
			</div>
		</div>
	)
}
