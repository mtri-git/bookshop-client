import { createFileRoute } from '@tanstack/react-router'
import Profile from '../../../pages/profile/index'

export const Route = createFileRoute('/_main/profile/')({
	head: () => ({ meta: [{ title: 'Tài khoản - BookShop' }] }),
	component: Profile,
})
