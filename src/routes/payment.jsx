import { createFileRoute, redirect } from '@tanstack/react-router'
import Payment from '../pages/payment'
import { loadUser } from '../lib/session'

export const Route = createFileRoute('/payment')({
	ssr: false,
	beforeLoad: async ({ context }) => {
		if (!(await loadUser(context.queryClient))) throw redirect({ to: '/login', search: { redirect: '/payment' } })
	},
	head: () => ({ meta: [{ title: 'Thanh toán - BookShop' }, { name: 'robots', content: 'noindex' }] }),
	component: Payment,
})
