import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { HOME_PATH, PAYMENT_HISTORY_PATH, PROFILE_PATH, WISHLIST_PATH } from '../../constants/path'
import { useLogout } from '../../hooks/useUser'
import { toast_success } from '../../utils/toastNotify'
import DropDownMenuItem from './DropDownMenuItem'
import Icon from '../Icon'

const FALLBACK_AVATAR = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80'

export default function DropDownMenu({ avatarUrl, fullname, email, onNavigate }) {
	const [open, setOpen] = useState(false)
	const ref = useRef(null)
	const logout = useLogout()
	const navigate = useNavigate()
	const displayName = fullname || email || 'Tài khoản'

	useEffect(() => {
		if (!open) return
		const onPointerDown = (event) => {
			if (ref.current && !ref.current.contains(event.target)) setOpen(false)
		}
		const onKeyDown = (event) => event.key === 'Escape' && setOpen(false)
		document.addEventListener('mousedown', onPointerDown)
		document.addEventListener('keydown', onKeyDown)
		return () => {
			document.removeEventListener('mousedown', onPointerDown)
			document.removeEventListener('keydown', onKeyDown)
		}
	}, [open])

	const close = () => {
		setOpen(false)
		onNavigate?.()
	}

	const onLogout = async () => {
		close()
		await logout()
		toast_success('Đã đăng xuất')
		navigate({ to: HOME_PATH })
	}

	return (
		<div ref={ref} className="relative inline-block text-left select-none">
			<button
				onClick={() => setOpen((value) => !value)}
				type="button"
				aria-haspopup="menu"
				aria-expanded={open}
				className="flex items-center gap-2 py-2 px-4 text-base font-semibold text-gray-700 bg-white rounded-xl shadow hover:shadow-lg border border-gray-200 hover:bg-orange-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400">
				<div className="w-8 h-8 rounded-full border border-orange-500 overflow-hidden bg-gray-100">
					<img className="w-full h-full object-cover" src={avatarUrl || FALLBACK_AVATAR} alt="" />
				</div>
				<span className="hidden sm:inline-block max-w-[10rem] truncate">{displayName}</span>
				<Icon name="chevron-down" className="w-4 h-4 text-orange-500" />
			</button>
			{open && (
				<div
					role="menu"
					className="absolute right-0 mt-2 w-52 origin-top-right bg-white rounded-xl shadow-2xl ring-1 ring-black/5 flex flex-col py-2 border border-orange-100 z-[100]">
					<div className="flex flex-col items-center border-b border-orange-200 pb-3 mb-2 px-3">
						<div className="w-12 h-12 rounded-full border-2 border-orange-500 overflow-hidden mb-1">
							<img className="w-full h-full object-cover" src={avatarUrl || FALLBACK_AVATAR} alt="" />
						</div>
						<span className="font-semibold text-gray-800 text-base text-center truncate max-w-full">{displayName}</span>
					</div>
					<DropDownMenuItem link={PROFILE_PATH} onClick={close}>
						Thông tin
					</DropDownMenuItem>
					<DropDownMenuItem link={WISHLIST_PATH} onClick={close}>
						Yêu thích
					</DropDownMenuItem>
					<DropDownMenuItem link={PAYMENT_HISTORY_PATH} onClick={close}>
						Đơn hàng
					</DropDownMenuItem>
					<button
						type="button"
						role="menuitem"
						onClick={onLogout}
						className="w-full px-4 py-2 text-base text-red-500 font-semibold rounded-lg hover:bg-red-50 transition-colors duration-150 text-center">
						Đăng xuất
					</button>
				</div>
			)}
		</div>
	)
}
