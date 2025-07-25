import { IUserAuth } from '@/hooks/useAuth';
import { IConfigAuth } from '@/hooks/useConfig';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
interface RouterContext {
	auth: IUserAuth;
	config: IConfigAuth
}

export const Route = createRootRouteWithContext<RouterContext>()({
	component: () => (
		<Outlet />
	),
})