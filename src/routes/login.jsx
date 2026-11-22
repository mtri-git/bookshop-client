import { createFileRoute, redirect } from '@tanstack/react-router'
import Login, { safeRedirect } from '../pages/login'
import { loadUser } from '../lib/session'

export const Route = createFileRoute('/login')({
	validateSearch: (search) => ({
		redirect: typeof search.redirect === 'string' ? search.redirect : undefined,
	}),
	// Session lives in localStorage, so this page renders in the browser only
	ssr: false,
	// Already signed in: go where the user was heading
	beforeLoad: async ({ context, search }) => {
		if (await loadUser(context.queryClient)) throw redirect({ href: safeRedirect(search.redirect) })
	},
	head: () => ({ meta: [{ title: 'Đăng nhập - BookShop' }, { name: 'robots', content: 'noindex' }] }),
	component: Login,
})
