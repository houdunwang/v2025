import { FieldValidate } from '@/components/common/FieldValidate';
import { MarkdownEditor } from '@/components/editor/MarkdownEditor';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useAddTopicMutation, useUpdateTopicMutation } from '@/services/topic';
import { ITopic } from '@/type/topic';
import { useForm } from '@tanstack/react-form';
import { useNavigate } from '@tanstack/react-router';
import { FC } from 'react';
interface Props {
	defaultValues: Partial<ITopic>
}
export const Form: FC<Props> = ({ defaultValues }) => {
	const addMuatation = useAddTopicMutation()
	const updateMutation = useUpdateTopicMutation()
	const navigate = useNavigate()
	const form = useForm({
		defaultValues,
		onSubmit: async ({ value }) => {
			const action = defaultValues.id ? updateMutation : addMuatation
			action.mutate(value, {
				onSuccess: (data) => {
					navigate({ to: '/topic/$id', params: { id: data.id } })
				}
			})
		}
	})
	return <form onSubmit={e => {
		e.preventDefault()
		e.stopPropagation()
		form.handleSubmit()
	}}>
		<Card className='xl:w-7xl mx-auto'>
			<CardHeader>
				<CardTitle>{defaultValues.id ? '修改' : '发表'}话题</CardTitle>
				<CardDescription>请清晰的描述你的内容或问题</CardDescription>
			</CardHeader>
			<CardContent>
				<form.Field name='title' children={field => (
					<div>
						<Input value={field.state.value} onChange={e => field.handleChange(e.target.value)} placeholder='请输入话题标题' />
						<FieldValidate errors={field.state.meta.errors} name="title" />
					</div>
				)} />
				<form.Field name='content' children={field => (
					<div>
						<MarkdownEditor value={defaultValues.content} className='h-[350px]' onChange={field.handleChange} />
						<FieldValidate errors={field.state.meta.errors} name="content" />
					</div>
				)} />
			</CardContent>
			<CardFooter>
				<Button variant="default">保存提交</Button>
			</CardFooter>
		</Card>
	</form>
}
