import { useLearnListQuery } from '@/services/learn'
import { Loading } from '../common/Loading'
import { Error } from '../error/Error'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { LearnItem } from './LearnItem'

export const LearnList = () => {
	const { isPending, isError, error, data: learns } = useLearnListQuery({ page: 1 })
	if (isPending) return <Loading />
	if (isError) return <Error error={error} />
	return (
		<Card>
			<CardHeader>
				<CardTitle>学习动态</CardTitle>
			</CardHeader>
			<CardContent>
				{learns.data.map(learn => (
					<LearnItem learn={learn} key={learn.id} />
				))}
			</CardContent>
		</Card>
	)
}
