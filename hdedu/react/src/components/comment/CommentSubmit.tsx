import { useCommentContext } from '@/context/CommentContext';
import { useAuth } from '@/hooks/useAuth';
import { useAddCommentMutation } from '@/services/comment';
import { useForm } from '@tanstack/react-form';
import { Link } from '@tanstack/react-router';
import { FieldValidate } from '../common/FieldValidate';
import { MarkdownEditor, MarkdownEditorRef } from '../editor/MarkdownEditor';
import { Button } from '../ui/button';
import { useRef } from 'react';

export const CommentSubmit = () => {
	const { modelName, modelId } = useCommentContext()
	const addCommentMutation = useAddCommentMutation()
	const editorRef = useRef<MarkdownEditorRef | null>(null)
	const auth = useAuth();
	const form = useForm({
		defaultValues: {
			content: ''
		},
		onSubmit: async ({ value }) => {
			addCommentMutation.mutate({ ...value, modelName, modelId })
			editorRef.current?.clear()
		}
	})

	if (!auth.isAuthenticated()) return <div className='flex justify-center w-full'>
		<Link to={'/auth/login'}>
			<Button variant="default">登录后评论</Button>
		</Link>
	</div>
	return (
		<form className="w-full" onSubmit={e => {
			e.stopPropagation()
			e.preventDefault()
			form.handleSubmit()
		}}>
			<form.Field name="content" children={field => (
				<div>
					<MarkdownEditor ref={editorRef} value={''} onChange={field.handleChange} className='h-[250px]' />
					<FieldValidate name="content" errors={field.state.meta.errors} />
				</div>
			)} />
			<Button variant="default">发表评论</Button>
		</form>
	)
}
