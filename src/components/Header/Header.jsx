import React, { useRef, useState, useEffect } from 'react'
import {
	createSearchParams,
	Link,
	NavLink,
	useNavigate,
} from 'react-router-dom'
import {
	BOOK_PATH,
	CART_PATH,
	CATEGORY_PATH,
	HOME_PATH,
	LOGIN_PATH,
	SEARCH_PATH,
} from '../../constants/path'
import { useSelectUser } from '../../redux/selectors/useSelectUser'
import { useTotalCartItem } from '../../redux/selectors/useTotalCartItem'
import DropDownMenu from '../DropDownMenu/DropDownMenu'
import './Header.css'

export default function Header() {
	const [cartCount, setCartCount] = useState(0)
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
	const count = useTotalCartItem()
	
	// Enhanced className for NavLink with better styling
	const unActiveClassNameTW =
		'block px-4 py-3 md:px-3 md:py-2 rounded-lg text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50 md:hover:bg-transparent md:hover:text-orange-600 md:p-0 transition-all duration-200 ease-in-out'
	const activeClassNameTW =
		'block px-4 py-3 md:px-3 md:py-2 rounded-lg text-base font-medium text-orange-600 bg-orange-50 md:bg-transparent md:text-orange-600 md:border-b-2 md:border-orange-600 transition-all duration-200 ease-in-out'
	
	const navigate = useNavigate()
	const searchRef = useRef()
	const user = useSelectUser()

	const onSearch = (event) => {
		if (event.key === 'Enter') {
			navigate({
				pathname: SEARCH_PATH,
				search: `?${createSearchParams({
					title: searchRef.current.value.trim(),
				})}`,
			})
		}
	}

	useEffect(() => {
		setCartCount(count)
	}, [count])

	const handleMenuToggle = () => setMobileMenuOpen((prev) => !prev)
	const closeMenu = () => setMobileMenuOpen(false)

	return (
		<header className='header bg-gradient-to-r from-orange-500 to-orange-600 sticky z-50 top-0 w-full shadow-lg backdrop-blur-sm'>
			<nav className='px-4 sm:px-6 py-3 relative'>
				<div className='container flex flex-wrap justify-between items-center mx-auto max-w-7xl'>
					{/* Logo */}
					<Link
						to={HOME_PATH}
						className='flex items-center group'
						onClick={closeMenu}>
						<div className='bg-white p-2 rounded-lg shadow-sm mr-3 group-hover:shadow-md transition-shadow duration-200'>
							<img
								src='/vite.svg'
								className='h-6 sm:h-8 w-auto'
								alt='Vite Logo'
							/>
						</div>
						<span className='self-center text-xl sm:text-2xl font-bold text-white group-hover:text-orange-100 transition-colors duration-200'>
							BookShop
						</span>
					</Link>

					{/* Desktop search */}
					<div className='hidden md:flex items-center flex-1 max-w-md mx-8'>
						<div className='relative w-full'>
							<div className='flex absolute inset-y-0 left-0 items-center pl-4 pointer-events-none'>
								<svg
									className='w-5 h-5 text-gray-400'
									fill='currentColor'
									viewBox='0 0 20 20'
									xmlns='http://www.w3.org/2000/svg'>
									<path
										fillRule='evenodd'
										d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
										clipRule='evenodd'
									/>
								</svg>
							</div>
							<input
								type='text'
								id='search-navbar'
								ref={searchRef}
								onKeyUp={onSearch}
								className='block w-full py-3 pl-12 pr-4 text-gray-900 bg-white rounded-xl border-0 shadow-sm focus:ring-2 focus:ring-orange-300 focus:bg-white placeholder-gray-500 transition-all duration-200'
								placeholder='Tìm kiếm sách...'
							/>
						</div>
					</div>

					{/* Mobile menu button */}
					<button
						type='button'
						className='md:hidden inline-flex items-center p-2 text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-300 rounded-lg transition-colors duration-200'
						aria-controls='navbar-menu'
						aria-expanded={mobileMenuOpen}
						onClick={handleMenuToggle}>
						<span className='sr-only'>Open main menu</span>
						<svg
							className='w-6 h-6'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'
							xmlns='http://www.w3.org/2000/svg'>
							{mobileMenuOpen ? (
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M6 18L18 6M6 6l12 12'
								/>
							) : (
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M4 6h16M4 12h16M4 18h16'
								/>
							)}
						</svg>
					</button>

					{/* Desktop Navigation */}
					<div className='hidden md:flex items-center space-x-1'>
						<NavLink
							to={HOME_PATH}
							end
							className={({ isActive }) =>
								`px-4 py-2 rounded-lg text-base font-medium transition-all duration-200 ${
									isActive
										? 'text-white bg-orange-600 shadow-sm'
										: 'text-orange-100 hover:text-white hover:bg-orange-600'
								}`
							}>
							Trang chủ
						</NavLink>
						<NavLink
							to={BOOK_PATH}
							className={({ isActive }) =>
								`px-4 py-2 rounded-lg text-base font-medium transition-all duration-200 ${
									isActive
										? 'text-white bg-orange-600 shadow-sm'
										: 'text-orange-100 hover:text-white hover:bg-orange-600'
								}`
							}>
							Sách
						</NavLink>
						
						{user.isLoggedIn ? (
							<div className='ml-2'>
								<DropDownMenu title='Tài khoản' {...user.user.data} />
							</div>
						) : (
							<NavLink
								to={LOGIN_PATH}
								className='px-4 py-2 rounded-lg text-base font-medium text-orange-100 hover:text-white hover:bg-orange-600 transition-all duration-200'>
								Đăng nhập
							</NavLink>
						)}
						
						<NavLink
							to={CART_PATH}
							className={({ isActive }) =>
								`relative p-2 ml-2 rounded-lg transition-all duration-200 ${
									isActive
										? 'bg-orange-600 shadow-sm'
										: 'hover:bg-orange-600'
								}`
							}>
							<div className='relative w-6 h-6'>
								<img
									src='/icons/cart-icon.svg'
									alt='Cart'
									className='w-full h-full object-contain'
								/>
								{cartCount > 0 && (
									<span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full border-2 border-white shadow-sm min-w-[20px] text-center'>
										{cartCount > 99 ? '99+' : cartCount}
									</span>
								)}
							</div>
						</NavLink>
					</div>
				</div>

				{/* Mobile menu */}
				<div
					id='navbar-menu'
					className={`${
						mobileMenuOpen ? 'flex' : 'hidden'
					} md:hidden flex-col w-full bg-white rounded-lg shadow-lg mt-2 border border-gray-100 transition-all duration-200 ease-in-out`}>
					
					{/* Mobile search */}
					<div className='p-4 border-b border-gray-100'>
						<div className='relative'>
							<div className='flex absolute inset-y-0 left-0 items-center pl-4 pointer-events-none'>
								<svg
									className='w-5 h-5 text-gray-400'
									fill='currentColor'
									viewBox='0 0 20 20'
									xmlns='http://www.w3.org/2000/svg'>
									<path
										fillRule='evenodd'
										d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
										clipRule='evenodd'
									/>
								</svg>
							</div>
							<input
								type='text'
								ref={searchRef}
								onKeyUp={onSearch}
								className='block w-full py-3 pl-12 pr-4 text-gray-900 bg-gray-50 rounded-xl border-0 focus:ring-2 focus:ring-orange-300 focus:bg-white placeholder-gray-500 transition-all duration-200'
								placeholder='Tìm kiếm sách...'
							/>
						</div>
					</div>

					{/* Mobile navigation */}
					<div className='p-2'>
						<NavLink
							to={HOME_PATH}
							end
							className={({ isActive }) =>
								isActive ? activeClassNameTW : unActiveClassNameTW
							}
							onClick={closeMenu}>
							Trang chủ
						</NavLink>
						<NavLink
							to={BOOK_PATH}
							className={({ isActive }) =>
								isActive ? activeClassNameTW : unActiveClassNameTW
							}
							onClick={closeMenu}>
							Sách
						</NavLink>

						{user.isLoggedIn ? (
							<div className='px-4 py-3'>
								<DropDownMenu title='Tài khoản' {...user.user.data} />
							</div>
						) : (
							<NavLink
								to={LOGIN_PATH}
								className={unActiveClassNameTW}
								onClick={closeMenu}>
								Đăng nhập
							</NavLink>
						)}
						
						<NavLink
							to={CART_PATH}
							className={({ isActive }) =>
								`flex items-center ${isActive ? activeClassNameTW : unActiveClassNameTW}`
							}
							onClick={closeMenu}>
							<div className='relative w-6 h-6 mr-3'>
								<img
									src='/icons/cart-icon.svg'
									alt='Cart'
									className='w-full h-full object-contain'
								/>
								{cartCount > 0 && (
									<span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full border-2 border-white shadow-sm min-w-[20px] text-center'>
										{cartCount > 99 ? '99+' : cartCount}
									</span>
								)}
							</div>
							Giỏ hàng
						</NavLink>
					</div>
				</div>
			</nav>
		</header>
	)
}