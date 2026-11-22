import React from 'react'
import { useRouter } from '@tanstack/react-router'
import { Link } from '../components/Link'
import Icon from '../components/Icon'

export default function ErrorPage({ error, reset }) {
	const router = useRouter()
	const retry = () => {
		reset?.()
		router.invalidate()
	}
	return (
		<main className="min-h-[60vh] flex items-center justify-center px-4 py-16">
			<div className="text-center max-w-md space-y-4">
				<div className="w-16 h-16 mx-auto bg-orange-100 rounded-full flex items-center justify-center">
					<Icon name="face-sad" className="w-8 h-8 text-orange-500" strokeWidth={1.5} />
				</div>
				<h1 className="text-xl font-bold text-gray-900">Đã có lỗi xảy ra</h1>
				<p className="text-sm text-gray-500">{error?.message || 'Vui lòng thử lại sau ít phút.'}</p>
				<div className="flex justify-center gap-3">
					<button type="button" onClick={retry} className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold rounded-xl">
						Thử lại
					</button>
					<Link to="/" className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold rounded-xl">
						Về trang chủ
					</Link>
				</div>
			</div>
		</main>
	)
}
