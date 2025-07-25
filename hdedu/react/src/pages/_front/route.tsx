import { Footer } from '@/components/common/Footer'
import { FrontNavbar } from '@/components/navbar/FrontNavbar'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_front')({
	component: RouteComponent,
})

function RouteComponent() {
	return <main>
		<FrontNavbar />
		<div className='mt-6'>
			<Outlet />
		</div>
		<Footer />
	</main>
}
