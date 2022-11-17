import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header/Header'
import Footer from '../components/Footer'

export default function MainLayout() {
	return (
		<>
			<Header />
			<div className='w-11/12 m-auto bg-white rounded-lg top-68'>
				<Outlet />
			</div>
			<Footer />
		</>
	)
}
