import { HdImageUpload } from '@/components/form/HdImageUpload'
import { HdInput } from '@/components/form/HdInput'
import { HdTextarea } from '@/components/form/HdTextarea'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useAddChapterMutation, useUpdateChapterMutation } from '@/services/chapter'
import { IChapter } from '@/type/chapter'
import { ILesson } from '@/type/lesson'
import { useForm } from '@tanstack/react-form'
import { useQueryClient } from '@tanstack/react-query'
import React, { FC, PropsWithChildren } from 'react'
import { toast } from 'sonner'
interface Props {
	chapter?: IChapter;
	lesson: ILesson
}
export const Form: FC<PropsWithChildren<Props>> = ({ chapter, lesson }) => {
	const [open, setOpen] = React.useState(false)
	return <Dialog open={open} onOpenChange={setOpen}>
		<DialogTrigger asChild>
			<Button variant="outline" size={'sm'}>
				{chapter ? `编辑` : '创建章节'}
			</Button>
		</DialogTrigger>
		<DialogContent>
			<DialogHeader>
				<DialogTitle>
					{chapter ? `编辑${chapter.title}` : '创建章节'}
				</DialogTitle>
				<DialogDescription>
					<FormComponent chapter={chapter} lesson={lesson} setOpen={setOpen} />
				</DialogDescription>
			</DialogHeader>
		</DialogContent>
	</Dialog>
}

const defaultValues = {
	title: '',
	preview: '',
	description: ""
}
function FormComponent({ chapter, lesson, setOpen }: { chapter?: IChapter, lesson: ILesson, setOpen: (open: boolean) => void }) {
	const addMutation = useAddChapterMutation()
	const updateMutation = useUpdateChapterMutation()
	const queryClient = useQueryClient()
	const form = useForm({
		defaultValues: { ...chapter ?? defaultValues, lesson_id: lesson.id },
		onSubmit: async ({ value }) => {
			const action = chapter ? updateMutation : addMutation
			action.mutate(value, {
				onSuccess: () => {
					queryClient.invalidateQueries({ queryKey: ['lessonData'], exact: false })
					toast('保存成功')
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
			<HdInput formObject={form} fieldName={'title'} label={'章节标题'} />
			<HdTextarea formObject={form} fieldName={'description'} label={'章节描述'} />
			<HdImageUpload formObject={form} fieldName={'preview'} label={'封面图片'} />
			<Button variant="default">保存提交</Button>
		</main>
	</form>
}