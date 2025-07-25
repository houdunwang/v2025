import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from '../routeTree.gen'
import { useAuth } from './useAuth'
import { useConfig } from './useConfig'
const router = createRouter({
	routeTree,
	context: {
		auth: undefined!,
		config: undefined!
	},
})

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router
	}
}

export const useAppRouter = () => {
	const auth = useAuth()
	const config = useConfig()
	const AppRouterProvider = () =>
		<RouterProvider router={router} context={{ auth, config }} />
	return {
		AppRouterProvider
	}
}