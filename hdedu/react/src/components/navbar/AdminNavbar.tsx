import { adminMenus } from '@/config/menu'
import { Layers } from '@icon-park/react'
import { Link } from '@tanstack/react-router'
import { UserDownMenu } from '../user/UserDownMenu'

export const AdminNavbar = () => {
	return (
		<main>
			<section className='bg-white border-t-2 border-t-primary border-b'>
				<div className='h-16 flex items-center justify-between px-6'>
					<div className='flex items-center gap-6'>
						<Link to='/' className='flex items-center gap-2 '>
							<Layers theme="outline" size="27" />
						</Link>
						{adminMenus.map((menu, index) => (
							<Link key={index} to={menu.to}>{menu.title}</Link>
						))}
					</div>
					<UserDownMenu />
				</div>
			</section>
		</main>
	)
}

