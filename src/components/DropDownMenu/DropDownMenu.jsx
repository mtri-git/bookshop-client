import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { LOGOUT } from '../../constants/authConstants'
import { HOME_PATH, PAYMENT_HISTORY_PATH, PAYMENT_PATH, PROFILE_PATH } from '../../constants/path'
import { logoutAction } from '../../redux/actions/authAction'
import DropDownMenuItem from './DropDownMenuItem'

export default function DropDownMenu({ title, avatarUrl, fullname }) {
	const ref = useRef()
	const dispatch = useDispatch()

	const onClick = () => {
		if (ref.current.style.display === 'none')
			ref.current.style.display = 'block'
		else ref.current.style.display = 'none'
	}


	const onLogout = () => {
		dispatch(logoutAction())
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
		<div className="relative inline-block text-left select-none">
			<button
				onClick={onClick}
				type="button"
				className="flex items-center gap-2 py-2 px-4 text-base font-semibold text-gray-700 bg-white rounded-xl shadow hover:shadow-lg border border-gray-200 hover:bg-orange-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
			>
				<div className="w-8 h-8 rounded-full border border-orange-500 overflow-hidden bg-gray-100">
					<img className="w-full h-full object-cover" src={avatarUrl} alt={fullname} />
				</div>
				<span className="hidden sm:inline-block">{fullname || title}</span>
				<svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
			</button>
			<div
				onClick={e => e.stopPropagation()}
				ref={ref}
				id="dropdown-menu"
				style={{zIndex: 100, display: "none"}}
				className="absolute right-0 mt-2 w-48 origin-top-right bg-white rounded-xl shadow-2xl ring-1 ring-black/5 focus:outline-none animate-fade-in flex flex-col py-2 border border-orange-100"
			>
				<div className="flex flex-col items-center border-b border-orange-200 pb-3 mb-2">
					<div className="w-12 h-12 rounded-full border-2 border-orange-500 overflow-hidden mb-1">
						<img className="w-full h-full object-cover" src={avatarUrl} alt={fullname} />
					</div>
					<span className="font-semibold text-gray-800 text-base">{fullname}</span>
				</div>
				<DropDownMenuItem link={PROFILE_PATH}>
					Thông tin
				</DropDownMenuItem>
				<DropDownMenuItem link={PAYMENT_HISTORY_PATH}>
					Đơn hàng
				</DropDownMenuItem>
				<DropDownMenuItem link={HOME_PATH} onClickIn={onLogout}>
					<span className="text-red-500 font-semibold">Đăng xuất</span>
				</DropDownMenuItem>
			</div>
		</div>
	)
}
