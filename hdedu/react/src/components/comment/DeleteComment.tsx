import { useAuth } from '@/hooks/useAuth'
import { useDeleteCommentMutation } from '@/services/comment'
import { IComment } from '@/type/comment'
import { FC } from 'react'
import { Button } from '../ui/button'
interface Props {
	comment: IComment
}
export const DeleteComment: FC<Props> = ({ comment }) => {
	const deleteMutation = useDeleteCommentMutation()
	const auth = useAuth()
	if ((!auth.isAuthenticated() || auth.user('id') != comment.user_id) && !auth.isAdministrator()) return;
	return (
		<Button variant="outline" size={"sm"} onClick={(() => {
			deleteMutation.mutate(comment.id)
		})}>
			删除
		</Button>
	)
}
