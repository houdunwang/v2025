import { Loading } from '@/components/common/Loading'
import { Page } from '@/components/common/Page'
import { Error } from '@/components/error/Error'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { VideoItem } from '@/components/video/VideoItem'
import { useGetVideoListQuery } from '@/services/video'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_front/video/')({
	component: RouteComponent,
	validateSearch: (search: Record<string, unknown>) => {
		return { page: Number(search.page) }
	}
})

function RouteComponent() {
	const { page } = Route.useSearch()
	const { isPending, isError, error, data } = useGetVideoListQuery(page)
	if (isPending) return <Loading />
	if (isError) return <Error error={error} />
	return <Card className='xl:w-7xl mx-auto'>
		<CardHeader>
			<CardTitle>最新视频</CardTitle>
			<CardDescription>最近更新的视频列表</CardDescription>
		</CardHeader>
		<CardContent>
			{data.data.map(video => (
				<VideoItem key={video.id} video={video} />
			))}
		</CardContent>
		<CardFooter>
			<Page meta={data.meta} />
		</CardFooter>
	</Card>
}
