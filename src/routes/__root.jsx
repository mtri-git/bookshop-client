import { useEffect } from 'react'
import { HeadContent, Outlet, Scripts, createRootRouteWithContext } from '@tanstack/react-router'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { ToastContainer } from 'react-toastify'
import appCss from '../index.css?url'
import { DialogProvider } from '../hooks/useDialog'
import CustomDialog from '../components/CustomDialog'
import Header from '../components/Header/Header'
import Footer from '../components/Footer'
import NotFound from '../pages/404'
import ErrorPage from '../pages/error'
import { useCart } from '../stores/cart'
import { useWishlist } from '../stores/wishlist'

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || ''
const SITE_NAME = 'BookShop'
const DEFAULT_DESCRIPTION =
	'BookShop - nhà sách trực tuyến: sách văn học, kinh tế, kỹ năng, thiếu nhi chính hãng, giao nhanh toàn quốc.'

export const Route = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ name: 'theme-color', content: '#ea580c' },
			{ title: `${SITE_NAME} - Nhà Sách Trực Tuyến` },
			{ name: 'description', content: DEFAULT_DESCRIPTION },
			{ property: 'og:site_name', content: SITE_NAME },
			{ property: 'og:type', content: 'website' },
		],
		links: [
			{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
			{ rel: 'preconnect', href: 'https://fonts.googleapis.com' },
			{ rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
			{
				rel: 'stylesheet',
				href: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap',
			},
			{ rel: 'stylesheet', href: appCss },
		],
	}),
	shellComponent: RootDocument,
	component: RootComponent,
	notFoundComponent: () => (
		<WithChrome>
			<NotFound />
		</WithChrome>
	),
	errorComponent: (props) => (
		<WithChrome>
			<ErrorPage {...props} />
		</WithChrome>
	),
})

function RootDocument({ children }) {
	return (
		<html lang="vi">
			<head>
				<HeadContent />
			</head>
			<body className="bg-gray-100 text-gray-800 antialiased">
				{children}
				<Scripts />
			</body>
		</html>
	)
}

// Browser-only stores are loaded after hydration so SSR and first render match
function StoreHydrator() {
	useEffect(() => {
		useCart.persist.rehydrate()
		useWishlist.persist.rehydrate()
	}, [])
	return null
}

function RootComponent() {
	return (
		<GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
			<DialogProvider>
				<StoreHydrator />
				<CustomDialog />
				<Outlet />
				<ToastContainer position="top-center" autoClose={2500} hideProgressBar theme="light" />
			</DialogProvider>
		</GoogleOAuthProvider>
	)
}

// Header + footer for pages rendered outside the _main layout (404, errors)
export function WithChrome({ children }) {
	return (
		<>
			<Header />
			<div className="w-full max-w-screen-2xl mx-auto bg-gray-100/70 rounded-lg pb-5">{children}</div>
			<Footer />
		</>
	)
}
