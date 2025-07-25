import { IComment } from '@/type/comment'
import { FC } from 'react'
import { CommentAvatar } from './CommentAvatar'
import { CommentReply } from './CommentReply'
import classNames from 'classnames'
interface Props {
	comment: IComment
}
export const CommentItem: FC<Props> = ({ comment }) => {
	return (
		<main className={classNames("border mb-3 rounded-sm", {
			'bg-white': !!comment.comment_id,
			'bg-muted': !comment.comment_id
		})}>
			<CommentAvatar comment={comment} />
			<div className='p-3'>
				{comment.content}
				<CommentReply comment={comment} />
			</div>
		</main>
	)
}
