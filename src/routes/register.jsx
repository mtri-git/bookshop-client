import { createFileRoute, redirect } from '@tanstack/react-router'
import Register from '../pages/register'
import { safeRedirect } from '../pages/login'

export const Route = createFileRoute('/register')({
	validateSearch: (search) => ({
		redirect: typeof search.redirect === 'string' ? search.redirect : undefined,
	}),
	beforeLoad: ({ context, search }) => {
		if (context.user) throw redirect({ href: safeRedirect(search.redirect) })
	},
	head: () => ({ meta: [{ title: 'Đăng ký - BookShop' }, { name: 'robots', content: 'noindex' }] }),
	component: Register,
})
