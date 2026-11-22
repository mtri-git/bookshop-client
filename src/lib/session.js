import { meQuery } from './queries'

// For route guards on client-only (`ssr: false`) routes: the signed-in user or null.
export const loadUser = (queryClient) => queryClient.ensureQueryData(meQuery())
