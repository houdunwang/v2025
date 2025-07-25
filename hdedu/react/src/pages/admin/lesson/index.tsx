import { Loading } from '@/components/common/Loading'
import { Page } from '@/components/common/Page'
import { Error } from '@/components/error/Error'
import { LessonItem } from '@/components/lessson/LessonItem'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useDeleteLessonMutation, useGetLessonList } from '@/services/lesson'
import { ILesson } from '@/type/lesson'
import { useQueryClient } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'
import { toast } from 'sonner'
import { Form } from './-components/Form'

export const Route = createFileRoute('/admin/lesson/')({
	component: RouteComponent,
	validateSearch: (search: Record<string, unknown>): { page?: number } => {
		return {
			page: Number(search.page) || 1
		}
	}
})

function RouteComponent() {
	const { page } = Route.useSearch()
	const { isPending, isError, error, data } = useGetLessonList({ page, row: 10 })
	if (isPending) return <Loading />
	if (isError) return <Error error={error} />
	return <Card>
		<CardHeader>
			<CardTitle className='flex items-center justify-between'>
				课程管理
				<Form />
			</CardTitle>
			{/* <CardDescription>Card Description</CardDescription> */}
		</CardHeader>
		<CardContent className='grid grid-cols-5 gap-3'>
			{data.data.map(lesson => (
				<LessonItem lesson={lesson} key={lesson.id} >
					<div className='flex gap-1'>
						<Form lesson={lesson} />
						<DelLesson lesson={lesson} />
						<Link to={'/admin/chapter/index/$lessonId'} params={{ lessonId: lesson.id }} target='_blank'>
							<Button variant="outline" size="sm">章节</Button>
						</Link>
					</div>
				</LessonItem>
			))}
		</CardContent>
		<CardFooter>
			<Page meta={data.meta} />
		</CardFooter>
	</Card >
}

function DelLesson({ lesson }: { lesson: ILesson }) {
	const delMutation = useDeleteLessonMutation()
	const queryClient = useQueryClient()
	return <AlertDialog>
		<AlertDialogTrigger asChild>
			<Button variant="outline" size="sm">删除</Button>
		</AlertDialogTrigger>
		<AlertDialogContent>
			<AlertDialogHeader>
				<AlertDialogTitle>确定删除课程吗?</AlertDialogTitle>
				<AlertDialogDescription>
					{lesson.title}
				</AlertDialogDescription>
			</AlertDialogHeader>
			<AlertDialogFooter>
				<AlertDialogCancel>取消</AlertDialogCancel>
				<AlertDialogAction onClick={() => {
					delMutation.mutate(lesson.id, {
						onSuccess: () => {
							queryClient.invalidateQueries({ queryKey: ['lessonList'], exact: false })
							toast('删除成功')
						}
					})
				}}>删除</AlertDialogAction>
			</AlertDialogFooter>
		</AlertDialogContent>
	</AlertDialog>
}