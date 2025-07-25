import { Loading } from '@/components/common/Loading'
import { Error } from '@/components/error/Error'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useGetLessonData } from '@/services/lesson'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { ChapterList } from './-components/ChapterList'
import { Form } from './-components/Form'

export const Route = createFileRoute('/admin/chapter/index/$lessonId')({
	params: {
		parse: (params: Record<string, unknown>): { lessonId: number } => {
			return {
				lessonId: Number(params.lessonId)
			}
		}
	},
	component: RouteComponent,
})

function RouteComponent() {
	const { lessonId } = Route.useParams()
	const { isPending, isError, error, data: lesson } = useGetLessonData(lessonId)
	const [currentChapterId, setCurrentChapterId] = useState(0)
	if (isPending) return <Loading />
	if (isError) return <Error error={error} />
	return <Card>
		<CardHeader>
			<CardTitle className='flex items-center justify-between'>章节管理 / {lesson.title}
				{/* <Button variant="outline">添加章节</Button> */}
				<Form lesson={lesson} />
			</CardTitle>
		</CardHeader>
		<CardContent>
			<ChapterList lesson={lesson} currentChapterId={currentChapterId} setCurrentChapterId={setCurrentChapterId} />
		</CardContent>
	</Card>
}
