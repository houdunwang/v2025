import { IUser } from '@/type/user'
import { Link } from '@tanstack/react-router'
import { FC } from 'react'
interface Props {
	user: IUser
}
export const UserIcon: FC<Props> = ({ user }) => {
	return (
		<Link to='/space/$id' params={{ id: user.id }} className='w-10 h-10 rounded-sm overflow-hidden'>
			<img src={user.avatar} className='w-10 h-10 object-cover hover:scale-150 duration-500' />
		</Link>
	)
}
