import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'
import { meQuery } from '../lib/queries'
import { logout as logoutFn } from '../server/account.functions'

// The current user (null when signed out). Seeded by the root route on SSR.
export function useUser() {
	const { data } = useQuery(meQuery())
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
	const logout = useServerFn(logoutFn)
	const setSessionUser = useSetSessionUser()
	return async () => {
		await logout()
		await setSessionUser(null)
	}
}
