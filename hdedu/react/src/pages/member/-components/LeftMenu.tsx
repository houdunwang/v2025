import { MemberMenus } from '@/config/menu'
import { useAuth } from '@/hooks/useAuth'
import { Link } from '@tanstack/react-router'
import dayjs from 'dayjs'

export const LeftMenu = () => {
	const { user } = useAuth()
	return (
		<main>
			<div className='bg-white rounded-lg overflow-hidden'>
				<img src={user('avatar')} />
				<div className='px-2 py-3 flex flex-col items-center '>
					<div>{user('nickname')}</div>
					<div className='text-muted-foreground text-xs'>
						{dayjs(user('created_at')).fromNow()}
					</div>
					<div className='text-muted-foreground text-xs'>UID: {user('id')}</div>
				</div>
			</div>
			<div className='flex flex-col bg-white mt-3'>
				{MemberMenus.map((menu, index) => (
					<Link to={menu.to} key={index}
						activeProps={{ className: 'bg-primary text-white  hover:text-white!' }}
						className='py-3 px-2 border-b text-sm'>
						{menu.title}
					</Link>
				))}
			</div>
		</main >
	)
}
