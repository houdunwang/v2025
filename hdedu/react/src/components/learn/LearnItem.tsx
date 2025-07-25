import { ILearn } from '@/type/learn'
import { Link } from '@tanstack/react-router'
import dayjs from 'dayjs'
import { FC } from 'react'
import { UserIcon } from '../user/UserIcon'

export const LearnItem: FC<{ learn: ILearn }> = ({ learn }) => {
	return <div className='border-b py-2 gap-2 grid grid-cols-[auto_1fr]'>
		<UserIcon user={learn.user} />
		<div className='truncate'>
			<div className='truncate'>
				<Link to={'/video/$id'} params={{ id: learn.video_id }} className=''>
					{learn.video.title}
				</Link>
			</div>
			<div className='flex items-center gap-2 text-xs text-muted-foreground'>
				<div>
					<Link to="/space/$id" params={{ id: learn.user.id }}>
						{learn.user.nickname}
					</Link>
				</div>
				<span>{dayjs(learn.created_at).fromNow()}</span>
			</div>
		</div>
	</div>
}
