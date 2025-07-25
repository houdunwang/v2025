import { useCommentContext } from '@/context/CommentContext'
import { IComment } from '@/type/comment'
import { Next, Time } from '@icon-park/react'
import { Link } from '@tanstack/react-router'
import dayjs from 'dayjs'
import { FC } from 'react'
import { UserIcon } from '../user/UserIcon'
import { DeleteComment } from './DeleteComment'
interface Props {
	comment: IComment
}
export const CommentAvatar: FC<Props> = ({ comment }) => {
	const { setReplyId, replyId } = useCommentContext()
	return (
		<main className='flex items-center justify-between pr-3  border-b '>

			<div className='flex gap-2 p-3'>
				<UserIcon user={comment.user} />
				<div className='flex flex-col '>
					{comment.user.name}
					<div className='flex text-muted-foreground text-xs gap-2'>
						<div className='flex items-center'>
							{comment.reply_user &&
								<Link to='/'>
									@{comment.reply_user.name}
								</Link>
							}
						</div>
						<div className="flex items-center">
							<Time theme="outline" size="12" /> {dayjs(comment.created_at).fromNow()}
						</div>
						<span className='flex items-center hover:text-primary cursor-pointer' onClick={() => {
							setReplyId(comment.id == replyId ? 0 : comment.id)
						}}>
							<Next theme="outline" size="12" />回复
						</span>
					</div>
				</div>
			</div>
			<DeleteComment comment={comment} />
		</main>
	)
}


