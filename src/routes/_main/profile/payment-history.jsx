import { createFileRoute } from '@tanstack/react-router'
import PaymentHistory from '../../../pages/profile/payment-history'
import { ordersQuery } from '../../../lib/queries'

export const Route = createFileRoute('/_main/profile/payment-history')({
	loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(ordersQuery()).catch(() => null),
	head: () => ({ meta: [{ title: 'Đơn hàng của tôi - BookShop' }] }),
	component: PaymentHistory,
})
