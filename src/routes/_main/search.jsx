import { createFileRoute } from '@tanstack/react-router'
import Search, { CATEGORY_VALUES, PRICE_VALUES, SORT_VALUES } from '../../pages/book/search'
import { searchBooksQuery } from '../../lib/queries'

const text = (value, max = 100) => (typeof value === 'string' && value.trim() ? value.trim().slice(0, max) : undefined)

export const Route = createFileRoute('/_main/search')({
	// Unknown or malformed params are dropped instead of reaching the API
	validateSearch: (search) => {
		const offset = Number(search.offset)
		return {
			title: text(search.title),
			author: text(search.author),
			sort: SORT_VALUES.includes(search.sort) ? search.sort : undefined,
			price: PRICE_VALUES.includes(search.price) ? search.price : undefined,
			category: CATEGORY_VALUES.includes(search.category) ? search.category : undefined,
			offset: Number.isInteger(offset) && offset > 1 ? offset : undefined,
		}
	},
	loaderDeps: ({ search }) => search,
	loader: async ({ deps, context: { queryClient } }) => {
		await queryClient.ensureQueryData(searchBooksQuery(deps)).catch(() => null)
		return { title: deps.title, category: deps.category }
	},
	head: ({ loaderData }) => {
		const title = loaderData?.title
			? `Tìm kiếm "${loaderData.title}" - BookShop`
			: loaderData?.category
				? `Sách ${loaderData.category} - BookShop`
				: 'Kho Sách - BookShop'
		return { meta: [{ title }, { property: 'og:title', content: title }] }
	},
	component: Search,
})
