import { Loading } from '@/components/common/Loading'
import { Page } from '@/components/common/Page'
import { Error } from '@/components/error/Error'
import { TopicItem } from '@/components/topic/TopicItem'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useGetTopicListQuery } from '@/services/topic'
import { IUser } from '@/type/user'
import { FC } from 'react'

export const TopicList: FC<{ user: IUser }> = ({ user }) => {
	const { isPending, isError, error, data: topics } = useGetTopicListQuery({ page: 1, uid: user.id })
	if (isPending) return <Loading />
	if (isError) return <Error error={error} />
	return (
		<Card className='xl:w-7xl mx-auto mt-3' >
			<CardHeader>
				<CardTitle>TA 的贴子</CardTitle>
			</CardHeader>
			<CardContent>
				{topics.data.map(topic => (
					<TopicItem topic={topic} />
				))}
			</CardContent>
			<CardFooter>
				<Page meta={topics.meta} singleShow={false} />
			</CardFooter>
		</Card>
	)
}
