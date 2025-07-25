import { AdminNavbar } from '@/components/navbar/AdminNavbar'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { toast } from 'sonner'

export const Route = createFileRoute('/admin')({
	component: RouteComponent,
	beforeLoad: ({ context }) => {
		if (!context.auth.isAdministrator()) {
			toast('你没有访问权限')
			throw redirect({ to: '/' })
		}
	}
})

function RouteComponent() {
	return <main>
		<AdminNavbar />
		<div className='p-6'>
			<Outlet />
		</div>
	</main>
}
