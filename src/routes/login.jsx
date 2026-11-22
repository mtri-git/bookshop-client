import { createFileRoute, redirect } from '@tanstack/react-router'
import Login, { safeRedirect } from '../pages/login'

export const Route = createFileRoute('/login')({
	validateSearch: (search) => ({
		redirect: typeof search.redirect === 'string' ? search.redirect : undefined,
	}),
	// Already signed in: go where the user was heading
	beforeLoad: ({ context, search }) => {
		if (context.user) throw redirect({ href: safeRedirect(search.redirect) })
	},
	head: () => ({ meta: [{ title: 'Đăng nhập - BookShop' }, { name: 'robots', content: 'noindex' }] }),
	component: Login,
})
