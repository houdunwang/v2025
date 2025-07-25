import { ChapterItem } from '@/components/chapter/ChapterItem'
import { Loading } from '@/components/common/Loading'
import { Page } from '@/components/common/Page'
import { Error } from '@/components/error/Error'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useGetChapterListQuery } from '@/services/chapter'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_front/chapter/')({
	component: RouteComponent,
	validateSearch: (serach: Record<string, unknown>) => {
		return { page: Number(serach.page) || 1 }
	}
})

function RouteComponent() {
	const { page } = Route.useSearch()
	const { isPending, isError, error, data } = useGetChapterListQuery(page)
	if (isPending) return <Loading />
	if (isError) return <Error error={error} />

	return <Card className='xl:w-7xl m-auto'>
		<CardHeader>
			<CardTitle>碎片课程</CardTitle>
			<CardDescription>最近更新的课程章节列表</CardDescription>
		</CardHeader>
		<CardContent className='grid grid-cols-4 gap-3'>
			{data.data.map(chapter => (
				<ChapterItem key={chapter.id} chapter={chapter} />
			))}
		</CardContent>
		<CardFooter>
			<Page meta={data.meta} />
		</CardFooter>
	</Card>
}
