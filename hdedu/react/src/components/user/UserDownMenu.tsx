import { useAuth } from '@/hooks/useAuth'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import { Link } from '@tanstack/react-router'
import dayjs from 'dayjs'
import { useLogoutMutation } from '@/services/auth'
import { NotificationIcon } from '../notification/NotificationIcon'
export const UserDownMenu = () => {
	const auth = useAuth()
	const logoutMutation = useLogoutMutation()
	if (!auth.isAuthenticated()) return <LoginComponent />
	return <main className='flex items-center gap-3'>
		<NotificationIcon />
		<DropdownMenu>
			<DropdownMenuTrigger className='flex gap-2'>
				<img src={auth.user('avatar')} className='size-8 object-cover rounded-lg' />
				<div className='flex flex-col items-start text-xs font-light text-muted-foreground'>
					{auth.user('nickname')}
					<span className=''>注册于{dayjs(auth.user('created_at')).fromNow()}</span>
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel className='flex justify-between items-center'>{auth.user('name')}
					<span>
						uid: {auth.user('id')}
					</span>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<Link to='/member/info' target="_blank">
						会员中心
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<Link to={'/space/$id'} params={{ id: auth.user('id') }} target="_blank">
						个人空间
					</Link>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				{auth.isAdministrator() &&
					<DropdownMenuItem>
						<Link to={'/admin/config'} target="_blank">
							后台管理
						</Link>
					</DropdownMenuItem>
				}
				<DropdownMenuItem onClick={() => {
					logoutMutation.mutate()
				}}>
					退出登录
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	</main>
}

function LoginComponent() {
	return <div className='flex gap-2'>
		<Link to='/auth/login'>
			<Button variant="default" size={'sm'}>登录</Button>
		</Link>
		<Link to='/'>
			<Button variant="outline" size={'sm'}>注册</Button>
		</Link>
	</div >
}
