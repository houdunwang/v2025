import { FrontNavbar } from '@/components/navbar/FrontNavbar'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/space')({
	component: RouteComponent,
})

function RouteComponent() {
	return <main>
		<FrontNavbar />
		<div className='mt-6'>
			<Outlet />
		</div>
	</main>
}
