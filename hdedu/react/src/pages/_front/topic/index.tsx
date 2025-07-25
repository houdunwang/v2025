import { Loading } from '@/components/common/Loading'
import { Page } from '@/components/common/Page'
import { Error } from '@/components/error/Error'
import { TopicItem } from '@/components/topic/TopicItem'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useGetTopicListQuery } from '@/services/topic'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/_front/topic/')({
	component: RouteComponent,
	validateSearch: (search: Record<string, unknown>): { page?: number } => {
		return { page: Number(search.page) || 1 }
	}
})

function RouteComponent() {
	const { page } = Route.useSearch()
	const { isPending, isError, error, data } = useGetTopicListQuery({ page })
	if (isPending) return <Loading />
	if (isError) return <Error error={error} />
	return <Card className='xl:w-7xl mx-auto'>
		<CardHeader>
			<CardTitle>话题讨论</CardTitle>
			<CardDescription className='flex justify-between items-center'>
				友好的发言可以温暖人一天
				<Link to={'/topic/create'}>
					<Button variant="outline" size="sm">发表新话题</Button>
				</Link>
			</CardDescription>
		</CardHeader>
		<CardContent>
			{data.data.map(topic => (
				<TopicItem topic={topic} />
			))}
		</CardContent>
		<CardFooter>
			<Page meta={data.meta} />
		</CardFooter>
	</Card>
}
