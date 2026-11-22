import { createFileRoute, redirect } from '@tanstack/react-router'

// Old "/book" links now live at /search
export const Route = createFileRoute('/_main/book/')({
	beforeLoad: () => {
		throw redirect({ to: '/search', statusCode: 301 })
	},
})
