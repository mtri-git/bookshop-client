import { createFileRoute, redirect } from '@tanstack/react-router'
import Register from '../pages/register'
import { safeRedirect } from '../pages/login'
import { loadUser } from '../lib/session'

export const Route = createFileRoute('/register')({
	validateSearch: (search) => ({
		redirect: typeof search.redirect === 'string' ? search.redirect : undefined,
	}),
	ssr: false,
	beforeLoad: async ({ context, search }) => {
		if (await loadUser(context.queryClient)) throw redirect({ href: safeRedirect(search.redirect) })
	},
	head: () => ({ meta: [{ title: 'Đăng ký - BookShop' }, { name: 'robots', content: 'noindex' }] }),
	component: Register,
})
