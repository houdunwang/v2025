import { useCommentContext } from '@/context/CommentContext'
import { IComment } from '@/type/comment'
import { FC } from 'react'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { useAddCommentMutation } from '@/services/comment'
import { useForm } from '@tanstack/react-form'
interface Props {
	comment: IComment
}

export const CommentReply: FC<Props> = ({ comment }) => {
	const { replyId, setReplyId, modelName, modelId } = useCommentContext()
	const addCommentMutation = useAddCommentMutation()
	const form = useForm({
		defaultValues: {
			content: '',
			comment_id: comment.comment_id || comment.id,
			reply_user_id: comment.user_id
		},
		onSubmit: ({ value }) => {
			addCommentMutation.mutate({ ...value, modelName, modelId })
			form.reset()
			setReplyId(0)
		}
	})

	if (replyId !== comment.id) return

	return (
		<form onSubmit={e => {
			e.preventDefault()
			e.stopPropagation()
			form.handleSubmit()
		}}>
			<main className='space-y-2'>
				<form.Field name="content" children={field => (
					<Textarea rows={2} value={field.state.value} onChange={e => field.handleChange(e.target.value)} />
				)} />
				<Button variant="outline" size={'sm'}>发表</Button>
			</main>
		</form>
	)
}
