import React, { useEffect, useRef } from 'react'
import { HOME_PATH, PAYMENT_PATH, PROFILE_PATH } from '../../constants/path'
import DropDownMenuItem from './DropDownMenuItem'
import useOutsideAlerter from '../../hooks/useOutSideAlert'

export default function DropDownMenu({ title, children }) {
	const ref = useRef()

	const onClick = () => {
		if (ref.current.style.display === 'none')
			ref.current.style.display = 'block'
		else ref.current.style.display = 'none'
	}

	const onDisplayNone = () => {
		ref.current.style.display = 'none'
	}

	// Hook for click out event
	function useOutsideAlerter1(ref) {
		useEffect(() => {
			function handleClickOutside(event) {
				if (ref.current && !ref.current.contains(event.target)) {
					onDisplayNone()
				}
			}
			// Bind the event listener
			document.addEventListener('mousedown', handleClickOutside)
			return () => {
				// Unbind the event listener on clean up
				document.removeEventListener('mousedown', handleClickOutside)
			}
		}, [ref])
	}
	useOutsideAlerter1(ref)
	// useOutsideAlerter(ref, onDisplayNone(ref))

	return (
		<div
			onClick={onClick}
			className='block py-2 px-4 text-lg text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-orange-500 md:p-0 active:text-orange-500 '>
			<div>{title}</div>
			<div
				onClick={onClick}
				ref={ref}
				id='dropdown-menu'
				style={{ display: 'none', zIndex: '100' }}
				className='absolute bg-white w-40 py-4 m-2 shadow-xl shadow-orange-500/50 text-center rounded mix-blend-color-dodge'>
				<div className='border-b pd-2 border-orange-500'>
					<div className='w-8 h-8 m-auto rounded-full border border-orange-600'>
						<img
							className='w-full h-full rounded-full'
							src='https://cdn.myanimelist.net/images/characters/9/409383.jpg'
						/>
					</div>
					<span>Võ Minh Trí</span>
				</div>
				<DropDownMenuItem link={PROFILE_PATH}>
					Thông tin
				</DropDownMenuItem>
				<DropDownMenuItem link={PAYMENT_PATH}>
					Thanh toán
				</DropDownMenuItem>
				<DropDownMenuItem link={HOME_PATH}>Đăng xuất</DropDownMenuItem>
			</div>
		</div>
	)
}
