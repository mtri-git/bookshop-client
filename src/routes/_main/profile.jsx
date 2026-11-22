import { createFileRoute, redirect } from '@tanstack/react-router'
import ProfileLayout from '../../layouts/ProfileLayout'

export const Route = createFileRoute('/_main/profile')({
	// UX guard only; every account server function checks the session itself
	beforeLoad: ({ context, location }) => {
		if (!context.user) throw redirect({ to: '/login', search: { redirect: location.href } })
	},
	head: () => ({ meta: [{ name: 'robots', content: 'noindex' }] }),
	component: ProfileLayout,
})
