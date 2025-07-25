import { CommentList } from '@/components/comment/CommentList'
import { Loading } from '@/components/common/Loading'
import { Error } from '@/components/error/Error'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { UserIcon } from '@/components/user/UserIcon'
import { useAuth } from '@/hooks/useAuth'
import { useDeleteTopicMutation, useGetTopicQuery } from '@/services/topic'
import { createFileRoute, Link } from '@tanstack/react-router'
import dayjs from 'dayjs'
export const Route = createFileRoute('/_front/topic/$id')({
	component: RouteComponent,
	params: {
		parse: ({ id }) => {
			return { id: Number(id) }
		}
	}
})

function RouteComponent() {
	const { id } = Route.useParams()
	const auth = useAuth()
	const { isPending, isError, error, data: topic } = useGetTopicQuery(id)
	const deleteMutation = useDeleteTopicMutation()
	if (isPending) return <Loading />
	if (isError) return <Error error={error} />

	return <main className='xl:w-7xl mx-auto'>
		<Card >
			<CardHeader>
				<CardTitle>{topic.title}</CardTitle>
				<CardDescription className='flex justify-between'>
					<div className="flex items-center gap-2 mt-3">
						<UserIcon user={topic.user} />
						<div>
							{topic.user.name}
							<div>
								发表于 {dayjs(topic.created_at).fromNow()}
							</div>
						</div>
					</div>
					{auth.isAuthenticated() && auth.user('id') === topic.user.id &&
						<div className='flex gap-2'>
							<Button variant="outline" size={'sm'} onClick={() => {
								deleteMutation.mutate(id)
							}}>删除</Button>
							<Link to='/topic/edit/$id' params={{ id: topic.id }}>
								<Button variant="outline" size={'sm'}>编辑</Button>
							</Link>
						</div>
					}
				</CardDescription>
			</CardHeader>
			<CardContent>
				{/* <Markdown>{topic.content}</Markdown> */}
				<article className="prose prose-h1:text-2xl max-w-full lg:prose-xl" dangerouslySetInnerHTML={{ __html: topic.html }}></article>
			</CardContent>
			<CardFooter> </CardFooter>
		</Card>

		<CommentList modelName='Topic' modelId={topic.id} />
	</main>
}
