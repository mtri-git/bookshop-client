import React, { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { Link, NavLink } from '../Link'
import { CART_PATH, HOME_PATH, LOGIN_PATH, SEARCH_PATH } from '../../constants/path'
import { useUser } from '../../hooks/useUser'
import { useCartCount } from '../../stores/cart'
import DropDownMenu from '../DropDownMenu/DropDownMenu'
import Icon from '../Icon'

const mobileLinkBase =
	'block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ease-in-out'
const mobileLink = ({ isActive }) =>
	`${mobileLinkBase} ${isActive ? 'text-orange-600 bg-orange-50' : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50'}`
const desktopLink = ({ isActive }) =>
	`px-4 py-2 rounded-lg text-base font-medium transition-all duration-200 ${
		isActive ? 'text-white bg-orange-700/60 shadow-sm' : 'text-orange-100 hover:text-white hover:bg-orange-700/40'
	}`

function SearchBox({ variant, onSearched }) {
	const [value, setValue] = useState('')
	const navigate = useNavigate()

	const onSubmit = (e) => {
		e.preventDefault()
		const title = value.trim()
		if (!title) return
		navigate({ to: SEARCH_PATH, search: { title } })
		setValue('')
		onSearched?.()
	}

	const inputClass =
		variant === 'desktop'
			? 'block w-full py-3 pl-12 pr-14 text-gray-900 bg-white rounded-xl border-0 shadow-sm focus:ring-2 focus:ring-orange-300 placeholder-gray-500 transition-all duration-200'
			: 'block w-full py-3 pl-12 pr-14 text-gray-900 bg-gray-50 rounded-xl border-0 focus:ring-2 focus:ring-orange-300 focus:bg-white placeholder-gray-500 transition-all duration-200'

	return (
		<form role="search" onSubmit={onSubmit} className="relative w-full">
			<div className="flex absolute inset-y-0 left-0 items-center pl-4 pointer-events-none">
				<Icon name="search" className="w-5 h-5 text-gray-400" />
			</div>
			<input
				type="search"
				value={value}
				onChange={(e) => setValue(e.target.value)}
				className={inputClass}
				placeholder="Tìm kiếm sách..."
				aria-label="Tìm kiếm sách"
				maxLength={100}
			/>
			{value.trim() && (
				<button
					type="submit"
					className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600 hover:text-orange-500 focus:outline-none transition-colors duration-200"
					aria-label="Tìm kiếm">
					<Icon name="arrow-right" className="w-5 h-5" />
				</button>
			)}
		</form>
	)
}

function CartBadge({ count, className }) {
	if (count <= 0) return null
	return <span className={className}>{count > 99 ? '99+' : count}</span>
}

export default function Header() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
	const cartCount = useCartCount()
	const user = useUser()
	const closeMenu = () => setMobileMenuOpen(false)

	return (
		<header className="header bg-orange-600 sticky z-50 top-0 w-full shadow-sm">
			<nav className="px-4 sm:px-6 py-3 relative">
				<div className="container flex flex-wrap justify-between items-center mx-auto max-w-7xl">
					<Link to={HOME_PATH} className="flex items-center group gap-2.5" onClick={closeMenu}>
						<div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center text-orange-600 shadow-sm">
							<Icon name="book" className="w-5 h-5" />
						</div>
						<span className="self-center text-xl sm:text-2xl font-extrabold text-white tracking-tight">BookShop</span>
					</Link>

					<div className="hidden md:flex items-center flex-1 max-w-md mx-8">
						<SearchBox variant="desktop" />
					</div>

					{/* Mobile: cart icon in the top bar */}
					<NavLink
						to={CART_PATH}
						className="md:hidden relative p-2 ml-auto text-white hover:bg-orange-700 rounded-lg transition-colors duration-200"
						aria-label="Giỏ hàng">
						<Icon name="cart" className="w-6 h-6" />
						<CartBadge
							count={cartCount}
							className="absolute top-0.5 right-0.5 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border border-orange-600"
						/>
					</NavLink>

					<button
						type="button"
						className="md:hidden inline-flex items-center p-2 text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-300 rounded-lg transition-colors duration-200"
						aria-controls="navbar-menu"
						aria-expanded={mobileMenuOpen}
						onClick={() => setMobileMenuOpen((open) => !open)}>
						<span className="sr-only">Mở menu</span>
						<Icon name={mobileMenuOpen ? 'x' : 'menu'} className="w-6 h-6" />
					</button>

					{/* Desktop navigation */}
					<div className="hidden md:flex items-center space-x-1">
						<NavLink to={HOME_PATH} end className={desktopLink}>
							Trang chủ
						</NavLink>
						<NavLink to={SEARCH_PATH} className={desktopLink}>
							Sách
						</NavLink>

						{user ? (
							<div className="ml-2">
								<DropDownMenu {...user} />
							</div>
						) : (
							<NavLink to={LOGIN_PATH} className={desktopLink}>
								Đăng nhập
							</NavLink>
						)}

						<NavLink
							to={CART_PATH}
							aria-label="Giỏ hàng"
							className={({ isActive }) =>
								`relative p-2 ml-2 rounded-lg text-white transition-all duration-200 ${
									isActive ? 'bg-orange-700/60 shadow-sm' : 'hover:bg-orange-700/40'
								}`
							}>
							<div className="relative w-6 h-6">
								<Icon name="cart" className="w-6 h-6" />
								<CartBadge
									count={cartCount}
									className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full border-2 border-white shadow-sm min-w-[20px] text-center"
								/>
							</div>
						</NavLink>
					</div>
				</div>

				{/* Mobile menu */}
				<div
					id="navbar-menu"
					className={`${mobileMenuOpen ? 'flex' : 'hidden'} md:hidden flex-col w-full bg-white rounded-lg shadow-lg mt-2 border border-gray-100`}>
					<div className="p-4 border-b border-gray-100">
						<SearchBox variant="mobile" onSearched={closeMenu} />
					</div>

					<div className="p-2">
						<NavLink to={HOME_PATH} end className={mobileLink} onClick={closeMenu}>
							Trang chủ
						</NavLink>
						<NavLink to={SEARCH_PATH} className={mobileLink} onClick={closeMenu}>
							Sách
						</NavLink>
						{user ? (
							<div className="px-4 py-3">
								<DropDownMenu {...user} onNavigate={closeMenu} />
							</div>
						) : (
							<NavLink to={LOGIN_PATH} className={mobileLink} onClick={closeMenu}>
								Đăng nhập
							</NavLink>
						)}
						<NavLink
							to={CART_PATH}
							className={(state) => `flex items-center ${mobileLink(state)}`}
							onClick={closeMenu}>
							<div className="relative w-6 h-6 mr-3">
								<Icon name="cart" className="w-6 h-6" />
								<CartBadge
									count={cartCount}
									className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full border-2 border-white shadow-sm min-w-[20px] text-center"
								/>
							</div>
							Giỏ hàng
						</NavLink>
					</div>
				</div>
			</nav>
		</header>
	)
}
