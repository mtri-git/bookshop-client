import { queryOptions } from '@tanstack/react-query'
import { apiFetch } from './api'
import { getMe, getOrders } from '../server/account.functions'

const FIVE_MINUTES = 5 * 60 * 1000

export const newBooksQuery = () =>
	queryOptions({
		queryKey: ['books', 'new'],
		queryFn: () => apiFetch('/book/new').then((res) => res.book || []),
		staleTime: FIVE_MINUTES,
	})

export const bestSellersQuery = () =>
	queryOptions({
		queryKey: ['books', 'best-seller'],
		queryFn: () => apiFetch('/book/best-seller').then((res) => res.book || []),
		staleTime: FIVE_MINUTES,
	})

export const bookQuery = (id) =>
	queryOptions({
		queryKey: ['book', id],
		queryFn: () => apiFetch(`/book/${encodeURIComponent(id)}`).then((res) => res.book),
		staleTime: FIVE_MINUTES,
	})

// search: validated search params of the /search route
export const searchBooksQuery = (search) =>
	queryOptions({
		queryKey: ['books', 'search', search],
		queryFn: () => {
			const params = new URLSearchParams({ sort: 'best-seller' })
			for (const [key, value] of Object.entries(search)) {
				if (value !== undefined && value !== '') params.set(key, String(value))
			}
			return apiFetch(`/book/search?${params}`).then((res) => ({
				books: res.book || [],
				paginate: res.paginate || { offset: 1, pageSize: 15, totalPage: 1, total: 0 },
			}))
		},
		staleTime: 60 * 1000,
	})

export const meQuery = () =>
	queryOptions({
		queryKey: ['me'],
		queryFn: () => getMe(),
		staleTime: FIVE_MINUTES,
	})

export const ordersQuery = () =>
	queryOptions({
		queryKey: ['orders'],
		queryFn: () => getOrders(),
		staleTime: 30 * 1000,
	})
