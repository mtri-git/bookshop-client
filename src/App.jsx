import React, { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'

import {
	HOME_PATH,
	LOGIN_PATH,
	CART_PATH,
	PAYMENT_PATH,
	BOOK_PATH,
	BOOK_DETAIL_PATH,
	AUTHOR_PATH,
	AUTHOR_DETAIL_PATH,
	CATEGORY_PATH,
	CATEGORY_DETAIL_PATH,
	REGISTER_PATH,
	PROFILE_PATH,
	PAYMENT_HISTORY_PATH,
	WISHLIST_PATH,
	PUBLISHER_PATH,
	PUBLISHER_DETAIL_PATH,
	SEARCH_PATH,
	FORGET_PASSWORD_PATH,
} from './constants/path'
import { DialogProvider } from './hooks/useDialog'
import { BookQuantityProvider } from './hooks/useBookQuantityDetail'
import ProtectedRoute from './components/ProtectedRoute'
import ProfileLayout from './layouts/ProfileLayout'

// Lazy load pages
const Home = lazy(() => import('./pages'))
const Login = lazy(() => import('./pages/login'))
const Cart = lazy(() => import('./pages/cart'))
const Payment = lazy(() => import('./pages/payment'))
const BookDetail = lazy(() => import('./pages/book/[id]'))
const Author = lazy(() => import('./pages/author'))
const AuthorDetail = lazy(() => import('./pages/author/[id]'))
const Category = lazy(() => import('./pages/category'))
const Register = lazy(() => import('./pages/register'))
const Wishlist = lazy(() => import('./pages/profile/wishlist'))
const CategoryDetail = lazy(() => import('./pages/category/[id]'))
const Page404 = lazy(() => import('./pages/404.jsx'))
const Publisher = lazy(() => import('./pages/publisher'))
const PublisherDetail = lazy(() => import('./pages/publisher/[id]'))
const Search = lazy(() => import('./pages/book/search'))
const Profile = lazy(() => import('./pages/profile/index'))
const PaymentHistory = lazy(() => import('./pages/profile/payment-history'))
const ForgetPassword = lazy(() => import('./pages/forget-password'))

function App() {
	return (
		<DialogProvider>
			<Suspense fallback={<div className="w-full h-screen flex items-center justify-center text-lg">Loading...</div>}>
				<Routes>
					<Route path={LOGIN_PATH} element={<Login />} />
					<Route
						path={PAYMENT_PATH}
						element={
							<ProtectedRoute>
								<Payment />
							</ProtectedRoute>
						}
					/>
					<Route path={REGISTER_PATH} element={<Register />} />
					<Route
						path={FORGET_PASSWORD_PATH}
						element={<ForgetPassword />}
					/>
					<Route element={<MainLayout />}>
						<Route path={HOME_PATH} element={<Home />} />
						<Route path={CART_PATH} element={<Cart />} />
						<Route path={SEARCH_PATH} element={<Search />} />
						<Route path={CART_PATH} element={<Cart />} />
						<Route />

						{/* Book path */}
						<Route path={BOOK_PATH}>
							<Route index element={<Search />} />
							<Route
								path={BOOK_DETAIL_PATH}
								element={
									<BookQuantityProvider>
										<BookDetail />
									</BookQuantityProvider>
								}
							/>
						</Route>
						{/* Profile path */}
						<Route
							element={
								<ProtectedRoute>
									<ProfileLayout />
								</ProtectedRoute>
							}>
							<Route path={PROFILE_PATH} element={<Profile />} />
							<Route path={WISHLIST_PATH} element={<Wishlist />} />
							<Route
								path={PAYMENT_HISTORY_PATH}
								element={<PaymentHistory />}
							/>
						</Route>

						<Route path={PUBLISHER_PATH}>
							<Route index element={<Publisher />} />
							<Route
								path={PUBLISHER_DETAIL_PATH}
								element={<PublisherDetail />}
							/>
						</Route>

						<Route path='*' element={<Page404 />} />
					</Route>
				</Routes>
			</Suspense>
		</DialogProvider>
	)
}

export default App
