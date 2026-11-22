import { createFileRoute, redirect } from '@tanstack/react-router'
import Payment from '../pages/payment'

export const Route = createFileRoute('/payment')({
	beforeLoad: ({ context }) => {
		if (!context.user) throw redirect({ to: '/login', search: { redirect: '/payment' } })
	},
	head: () => ({ meta: [{ title: 'Thanh toán - BookShop' }, { name: 'robots', content: 'noindex' }] }),
	component: Payment,
})
