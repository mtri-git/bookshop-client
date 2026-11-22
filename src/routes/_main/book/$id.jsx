import { createFileRoute, notFound } from '@tanstack/react-router'
import BookDetail from '../../../pages/book/[id]'
import { BookQuantityProvider } from '../../../hooks/useBookQuantityDetail'
import { bestSellersQuery, bookQuery } from '../../../lib/queries'

const plainText = (html = '', max = 160) =>
	html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, max)

export const Route = createFileRoute('/_main/book/$id')({
	loader: async ({ params, context: { queryClient } }) => {
		let book
		try {
			book = await queryClient.ensureQueryData(bookQuery(params.id))
		} catch (error) {
			if (error?.status === 404) throw notFound()
			throw error
		}
		if (!book) throw notFound()
		// Related books are not needed for the first paint
		queryClient.prefetchQuery(bestSellersQuery())
		return {
			title: book.title,
			description: plainText(book.description),
			image: book.imageUrl,
			price: Math.round(book.price * (1 - (book.sale || 0))),
			author: book.author,
		}
	},
	head: ({ loaderData, params }) => {
		if (!loaderData) return {}
		const title = `${loaderData.title} - BookShop`
		return {
			meta: [
				{ title },
				{ name: 'description', content: loaderData.description },
				{ property: 'og:type', content: 'product' },
				{ property: 'og:title', content: title },
				{ property: 'og:description', content: loaderData.description },
				...(loaderData.image ? [{ property: 'og:image', content: loaderData.image }] : []),
			],
			scripts: [
				{
					type: 'application/ld+json',
					children: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'Book',
						name: loaderData.title,
						image: loaderData.image,
						description: loaderData.description,
						...(loaderData.author ? { author: { '@type': 'Person', name: loaderData.author } } : {}),
						offers: { '@type': 'Offer', priceCurrency: 'VND', price: loaderData.price, url: `/book/${params.id}` },
					}).replace(/</g, '\\u003c'),
				},
			],
		}
	},
	component: BookPage,
})

function BookPage() {
	const { id } = Route.useParams()
	// key: reset the quantity picker when moving to another book
	return (
		<BookQuantityProvider key={id}>
			<BookDetail />
		</BookQuantityProvider>
	)
}
