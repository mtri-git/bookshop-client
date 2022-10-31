import React, { useRef, useState } from 'react'

export default function DropDownMenu({ title, children }) {
	const ref = useRef()

	const onClick = () => {
		if (ref.current.style.display === 'none')
			ref.current.style.display = 'block'
		else ref.current.style.display = 'none'
	}

	return (
		<div className='block py-2 px-4 text-lg text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-orange-500 md:p-0 active:text-orange-500 '>
			<div onClick={onClick}>{title}</div>
			<div
				ref={ref}
				id='dropdown-menu'
				style={{ display: 'none', zIndex: '100' }}
				className='absolute bg-white w-40 py-4 m-2 shadow-xl shadow-orange-500/50 text-center rounded mix-blend-color-dodge'>
				{children}
			</div>
		</div>
	)
}
