import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from '@tanstack/react-router'
import { meQuery } from '../lib/queries'
import { logout as clearSession } from '../lib/auth'

// The current user (null when signed out). Resolved in the browser only, so it is
// null during SSR and fills in after hydration.
export function useUser() {
	const { data } = useQuery({ ...meQuery(), enabled: typeof window !== 'undefined' })
	return data ?? null
}

// After any call that changes the session: store the new user and re-run route
// guards so protected pages react immediately.
export function useSetSessionUser() {
	const queryClient = useQueryClient()
	const router = useRouter()
	return async (user) => {
		queryClient.setQueryData(meQuery().queryKey, user)
		if (!user) queryClient.removeQueries({ queryKey: ['orders'] })
		await router.invalidate()
	}
}

export function useLogout() {
	const setSessionUser = useSetSessionUser()
	return async () => {
		clearSession()
		await setSessionUser(null)
	}
}
