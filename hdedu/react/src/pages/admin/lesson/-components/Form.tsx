import { HdImageUpload } from '@/components/form/HdImageUpload'
import { HdInput } from '@/components/form/HdInput'
import { HdTextarea } from '@/components/form/HdTextarea'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useAddLessonMutation, useUpdateLessonMutation } from '@/services/lesson'
import { IChapter } from '@/type/chapter'
import { ILesson } from '@/type/lesson'
import { useForm } from '@tanstack/react-form'
import { useQueryClient } from '@tanstack/react-query'
import { FC, useState } from 'react'
import { toast } from 'sonner'
interface Props {
	lesson?: ILesson
}
export const Form: FC<Props> = ({ lesson }) => {
	const [open, setOpen] = useState(false)
	return <Dialog open={open} onOpenChange={open => {
		setOpen(open)
	}}>
		<DialogTrigger asChild>
			<Button variant="outline" size={'sm'}>
				{lesson ? '编辑' : '添加'}课程
			</Button>
		</DialogTrigger>
		<DialogContent>
			<DialogHeader>
				<DialogTitle>
					{lesson ? `编辑课程` : '添加课程'}
				</DialogTitle>
				<DialogDescription>
					{lesson && lesson.title}
				</DialogDescription>
			</DialogHeader>
			<FormComponent lesson={lesson} setOpen={setOpen} />
		</DialogContent>
	</Dialog >
}
const defaultValues = {
	title: '',
	preview: '',
	description: '',
	price: '',
	download_address: ''
}

function FormComponent({ lesson, setOpen }: { lesson?: Exclude<ILesson, IChapter>, setOpen: (open: boolean) => void }) {
	const addMutation = useAddLessonMutation()
	const updateMutation = useUpdateLessonMutation()
	const queryClient = useQueryClient()
	const form = useForm({
		defaultValues: lesson ?? defaultValues,
		onSubmit: ({ value }) => {
			const action = lesson ? updateMutation : addMutation
			action.mutate(value, {
				onSuccess: () => {
					toast('保存成功')
					queryClient.invalidateQueries({ queryKey: ['lessonList'], exact: false })
					setOpen(false)
				}
			})
		}
	})
	return <form onSubmit={e => {
		e.preventDefault()
		e.stopPropagation()
		form.handleSubmit()
	}}>
		<main className="">
			<HdInput formObject={form} fieldName={'title'} label='课程名称' />
			<HdTextarea formObject={form} fieldName={'description'} label='课程名称' />
			<HdImageUpload formObject={form} fieldName={'preview'} label='课程名称' />
			<HdInput formObject={form} fieldName={'price'} label='售价' />
			<HdInput formObject={form} fieldName={'download_address'} label='下载地址' />
			<Button variant="default">保存提交</Button>
		</main>
	</form>
}
