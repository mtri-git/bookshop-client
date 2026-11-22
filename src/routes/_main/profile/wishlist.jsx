import { createFileRoute } from '@tanstack/react-router'
import Wishlist from '../../../pages/profile/wishlist'

export const Route = createFileRoute('/_main/profile/wishlist')({
	head: () => ({ meta: [{ title: 'Sách yêu thích - BookShop' }] }),
	component: Wishlist,
})
