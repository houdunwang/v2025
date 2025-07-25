import { ChapterDownList } from '@/components/chapter/ChapterDownList'
import { Loading } from '@/components/common/Loading'
import { Page } from '@/components/common/Page'
import { Error } from '@/components/error/Error'
import { LessonItem } from '@/components/lessson/LessonItem'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { lessonTitle } from '@/config/app'
import { useAuth } from '@/hooks/useAuth'
import { Form } from '@/pages/admin/lesson/-components/Form'
import { useGetLessonList } from '@/services/lesson'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_front/lesson/')({
	component: RouteComponent,
	// params: {
	// 	parse: ({ type }) => {
	// 		return { type: Object.keys(lessonTitle).includes(type) ? type : 'system' } as IRoutePrams
	// 	}
	// },
	validateSearch: (search: Record<string, string>) => {
		return {
			page: Number(search.page) || 1,
			type: Object.keys(lessonTitle).includes(search.type) ? search.type : 'system'
		} as { page: number, type: keyof typeof lessonTitle }
	}
})

function RouteComponent() {
	const { page, type } = Route.useSearch()
	const { isPending, isError, error, data } = useGetLessonList({ type, page })
	const auth = useAuth()
	if (isPending) return <Loading />
	if (isError) return <Error error={error} />

	return <main className="w-7xl m-auto ">
		<Card>
			<CardHeader>
				<CardTitle className='text-3xl font-normal text-center pt-12'>{lessonTitle[type].title}</CardTitle>
				<CardDescription className='text-center pt-3'> {lessonTitle[type].description}</CardDescription>
			</CardHeader>
			<CardContent className='grid grid-cols-3 gap-3'>
				{data.data.map(lesson => (
					<LessonItem lesson={lesson} key={lesson.id} >
						<div className='flex gap-1'>
							{auth.isAdministrator() && <Form lesson={lesson} />}
							<ChapterDownList chapters={lesson.chapters} />
						</div>
					</LessonItem>
				))}
			</CardContent>
			<CardFooter>
				<Page meta={data.meta} />
			</CardFooter>
		</Card>
	</main>
}

