import { QueryClient } from '@tanstack/react-query'
import { createRouter } from '@tanstack/react-router'
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query'
import { routeTree } from './routeTree.gen'
import LoadingIndicator from './components/LoadingIndicator'

export function getRouter() {
	// A fresh QueryClient per request on the server (no data leaking between users)
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: { staleTime: 60 * 1000, retry: 1, refetchOnWindowFocus: false },
		},
	})

	const router = createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreload: 'intent',
		// Let TanStack Query own data freshness
		defaultPreloadStaleTime: 0,
		defaultPendingMs: 400,
		defaultPendingComponent: () => (
			<div className="py-24 flex justify-center">
				<LoadingIndicator size="large" color="primary" text="Đang tải..." />
			</div>
		),
	})

	setupRouterSsrQueryIntegration({ router, queryClient })
	return router
}
