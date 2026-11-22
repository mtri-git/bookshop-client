import { createFileRoute, redirect } from '@tanstack/react-router'
import ProfileLayout from '../../layouts/ProfileLayout'
import { loadUser } from '../../lib/session'

export const Route = createFileRoute('/_main/profile')({
	// Session lives in localStorage: client-only page; the API still checks every call
	ssr: false,
	beforeLoad: async ({ context, location }) => {
		if (!(await loadUser(context.queryClient))) throw redirect({ to: '/login', search: { redirect: location.href } })
	},
	head: () => ({ meta: [{ name: 'robots', content: 'noindex' }] }),
	component: ProfileLayout,
})
