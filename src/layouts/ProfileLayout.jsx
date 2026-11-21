import React, { useEffect } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { PAYMENT_HISTORY_PATH, PROFILE_PATH, WISHLIST_PATH } from '../constants/path'
import { useSelectUser } from '../redux/selectors/useSelectUser'

const FALLBACK_AVATAR = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80'

export default function ProfileLayout() {
	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])

	const user = useSelectUser()
	const userData = user?.user?.data || {}

	const NAV_TABS = [
		{
			to: PROFILE_PATH,
			label: 'Thông tin',
			end: true,
			icon: (
				<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
				</svg>
			),
		},
		{
			to: WISHLIST_PATH,
			label: 'Yêu thích',
			icon: (
				<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
				</svg>
			),
		},
		{
			to: PAYMENT_HISTORY_PATH,
			label: 'Đơn hàng',
			icon: (
				<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
				</svg>
			),
		},
	]

	return (
		<div className="min-h-screen bg-gray-50/60 py-6 px-3 sm:px-6">
			<div className="max-w-5xl mx-auto space-y-5">
				{/* Profile Header Card */}
				<div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden">
					{/* Cover bar */}
					<div className="h-16 sm:h-24 bg-orange-600" />

					<div className="px-5 sm:px-8 pb-5 relative">
						{/* Avatar */}
						<div className="-mt-10 sm:-mt-14 mb-3 relative w-fit">
							<img
								className="w-20 h-20 sm:w-28 sm:h-28 rounded-full border-4 border-white object-cover shadow-sm bg-gray-100"
								src={userData.avatarUrl || FALLBACK_AVATAR}
								alt={userData.fullname}
								onError={(e) => { e.target.src = FALLBACK_AVATAR }}
							/>
							<div className="absolute bottom-1 right-1 w-4 h-4 sm:w-5 sm:h-5 bg-emerald-500 border-2 border-white rounded-full" title="Online" />
						</div>

						<div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
							<div>
								<h1 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight">
									{userData.fullname || 'Người dùng BookShop'}
								</h1>
								<p className="text-xs sm:text-sm text-gray-500 mt-0.5">
									{userData.email || ''}
								</p>
							</div>
							<div className="flex items-center gap-1 text-xs text-gray-500 bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
								<svg className="w-3.5 h-3.5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
								</svg>
								<span className="font-medium text-orange-700">Thành viên BookShop</span>
							</div>
						</div>
					</div>
				</div>

				{/* Navigation Tabs */}
				<div className="bg-white rounded-xl border border-gray-200/80 shadow-xs overflow-hidden">
					<div className="flex border-b border-gray-100 overflow-x-auto">
						{NAV_TABS.map((tab) => (
							<NavLink
								key={tab.to}
								to={tab.to}
								end={tab.end}
								className={({ isActive }) =>
									`flex items-center gap-2 px-5 sm:px-8 py-3.5 text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors border-b-2 ${
										isActive
											? 'text-orange-600 border-orange-500 bg-orange-50/50'
											: 'text-gray-600 border-transparent hover:text-orange-500 hover:border-orange-200'
									}`
								}
							>
								{tab.icon}
								<span>{tab.label}</span>
							</NavLink>
						))}
					</div>
				</div>

				{/* Page Content */}
				<div>
					<Outlet />
				</div>
			</div>
		</div>
	)
}
