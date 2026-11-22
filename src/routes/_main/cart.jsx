import { createFileRoute } from '@tanstack/react-router'
import Cart from '../../pages/cart'

export const Route = createFileRoute('/_main/cart')({
	head: () => ({ meta: [{ title: 'Giỏ hàng - BookShop' }, { name: 'robots', content: 'noindex' }] }),
	component: Cart,
})
