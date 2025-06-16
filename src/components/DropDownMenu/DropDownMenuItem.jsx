import React from 'react'
import { NavLink } from 'react-router-dom'

export default function DropDownMenuItem({ children, link, onClickIn = () => {} }) {
	const onClick = () => {
		onClickIn()
		document
			.getElementById('dropdown-menu')
			.setAttribute('style', 'display: none')
	}
	return (
		<NavLink to={link} tabIndex={-1}>
			<div
				onClick={onClick}
				className='w-full px-4 py-2 text-base text-gray-700 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition-colors duration-150 cursor-pointer text-center focus:bg-orange-100 focus:text-orange-700'
				style={{ zIndex: 100 }}>
				{children}
			</div>
		</NavLink>
	)
}
