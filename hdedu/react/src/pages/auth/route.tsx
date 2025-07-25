import { useValidateStroe } from '@/store/useValidateStore';
import { createFileRoute, Outlet, useLocation } from '@tanstack/react-router'
import { useEffect } from 'react';

export const Route = createFileRoute('/auth')({
	component: RouteComponent,
})

function RouteComponent() {
	const match = useLocation()
	const resetError = useValidateStroe(s => s.resetErrors)
	useEffect(() => {
		resetError()
	}, [match.pathname])
	return <Outlet />
}
