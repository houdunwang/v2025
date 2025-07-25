import { Loading } from '@/components/common/Loading'
import { Error } from '@/components/error/Error'
import { Button } from '@/components/ui/button'
import { useGettUserQuery } from '@/services/user'
import { createFileRoute, Link } from '@tanstack/react-router'
import dayjs from 'dayjs'
import { SignList } from './-components/SignList'
import { TopicList } from './-components/TopicList'

export const Route = createFileRoute('/space/$id')({
	component: RouteComponent,
	params: {
		parse: (params: Record<string, unknown>) => {
			return { id: Number(params.id) }
		}
	},
	validateSearch: (search: Record<string, unknown>) => {
		return { type: search.type || 'sign' } as { type?: 'sign' | 'topic' }
	}
})

function RouteComponent() {
	const { id } = Route.useParams()
	const { type } = Route.useSearch()
	const { isPending, isError, error, data: user } = useGettUserQuery(id)
	if (isPending) return <Loading />
	if (isError) return <Error error={error} />
	return <main className="">
		<section className='py-12 bg-amber-600 -mt-6 bg-[url("/assets/space-background.jpg")] flex flex-col items-center justify-center'>
			<img src={user.avatar} alt="" className='rounded-full w-40 h-40 object-cover' />
			<div className='flex justify-center flex-col items-center text-muted mt-6'>
				{user.name}
				<div className='text-xs text-muted-foreground'>
					注册于 {dayjs(user.created_at).fromNow()}
				</div>
			</div>
			<div className='flex gap-3 mt-6'>
				<Link to="/space/$id" params={{ id: user.id }}>
					<Button variant={type === 'sign' ? 'default' : 'outline'} size={'sm'}>TA 的签到</Button>
				</Link>
				<Link to="/space/$id" params={{ id: user.id }} search={{ type: 'topic' }}>
					<Button variant={type === 'topic' ? 'default' : 'outline'} size={'sm'}>TA 的贴子</Button>
				</Link>
			</div>
		</section>
		{type == 'sign' ? <SignList user={user} /> : <TopicList user={user} />}
	</main>
}
