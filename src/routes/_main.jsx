import { Outlet, createFileRoute } from '@tanstack/react-router'
import { WithChrome } from './__root'

export const Route = createFileRoute('/_main')({
	component: () => (
		<WithChrome>
			<Outlet />
		</WithChrome>
	),
})
