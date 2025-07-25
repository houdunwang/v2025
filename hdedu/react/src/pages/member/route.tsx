import { FrontNavbar } from '@/components/navbar/FrontNavbar'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { LeftMenu } from './-components/LeftMenu'
import { toast } from 'sonner'

export const Route = createFileRoute('/member')({
	component: RouteComponent,
	beforeLoad: ({ context }) => {
		if (!context.auth.isAuthenticated()) {
			toast('请登录后操作')
			throw redirect({ to: '/auth/login' })
		}
	}
})

function RouteComponent() {
	return <main>
		<FrontNavbar />
		<section className='xl:w-7xl mx-auto'>
			<div className='grid grid-cols-[250px_1fr] gap-6 mt-6'>
				<LeftMenu />
				<div className="bg-white rounded-lg p-3">
					<Outlet />
				</div>
			</div>
		</section>
	</main>
}
