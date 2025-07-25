import { ChapterDownList } from '@/components/chapter/ChapterDownList';
import { Loading } from '@/components/common/Loading';
import { Page } from '@/components/common/Page';
import { Error } from '@/components/error/Error';
import { LessonItem } from '@/components/lessson/LessonItem';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetLessonSubscribeQuery } from '@/services/lessonSubscribe';
import { createFileRoute } from '@tanstack/react-router';
export const Route = createFileRoute('/member/lesson')({
	component: RouteComponent,
})

function RouteComponent() {
	const { isPending, isError, error, data } = useGetLessonSubscribeQuery()
	if (isPending) return <Loading />
	if (isError) return <Error error={error} />
	return <Card>
		<CardHeader>
			<CardTitle>你购买的课程</CardTitle>
		</CardHeader>
		<CardContent className='grid grid-cols-3 gap-3'>
			{data.data?.map(lesson => (
				<LessonItem lesson={lesson} key={lesson.id} >
					<ChapterDownList chapters={lesson.chapters} />
				</LessonItem>
			))}
		</CardContent>
		<CardFooter>
			<Page meta={data.meta} />
		</CardFooter>
	</Card>
}
