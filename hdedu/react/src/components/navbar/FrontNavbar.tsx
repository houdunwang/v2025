import { frontMenus } from '@/config/menu'
import { RocketOne } from '@icon-park/react'
import { Link } from '@tanstack/react-router'
import { UserDownMenu } from '../user/UserDownMenu'
//nuxt next 
export const FrontNavbar = () => {
	return (
		<main>
			<section className='bg-white border-t-2 border-t-primary border-b'>
				<div className='m-auto h-16 2xl:w-7xl flex items-center justify-between'>
					<div className='flex items-center gap-6'>
						<Link to='/' className='flex items-center gap-2 text-primary'>
							<RocketOne theme="outline" size="27" />
							houdunren.com
						</Link>
						{frontMenus.map((menu, index) => (
							<Link key={index} to={menu.to}>{menu.title}</Link>
						))}
					</div>
					<UserDownMenu />
				</div>
			</section>
		</main>
	)
}

