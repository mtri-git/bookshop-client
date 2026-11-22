import { createFileRoute } from '@tanstack/react-router'
import Home from '../../pages/index'
import { bestSellersQuery, newBooksQuery } from '../../lib/queries'

export const Route = createFileRoute('/_main/')({
	// Prefetch on the server so the first paint already has books (no spinners, crawlable)
	loader: async ({ context: { queryClient } }) => {
		await Promise.allSettled([
			queryClient.ensureQueryData(newBooksQuery()),
			queryClient.ensureQueryData(bestSellersQuery()),
		])
	},
	head: () => ({
		meta: [
			{ title: 'BookShop - Nhà Sách Trực Tuyến' },
			{ property: 'og:title', content: 'BookShop - Nhà Sách Trực Tuyến' },
		],
	}),
	component: Home,
})
