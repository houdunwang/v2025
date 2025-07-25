import { ITopic } from '@/type/topic'
import { Link } from '@tanstack/react-router'
import dayjs from 'dayjs'
import { FC } from 'react'
import { UserIcon } from '../user/UserIcon'

export const TopicItem: FC<{ topic: ITopic }> = ({ topic }) => {
	return (
		<div className='flex gap-1 border-b py-2'>
			<UserIcon user={topic.user} />
			<div>
				<Link to="/topic/$id" params={{ id: topic.id }}>
					{topic.title}
				</Link>
				<div className='text-muted-foreground text-xs'>
					{topic.user.name}
					{dayjs(topic.created_at).fromNow()}
				</div>
			</div>
		</div>
	)
}
