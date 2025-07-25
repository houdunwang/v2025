import { Loading } from '@/components/common/Loading'
import { Page } from '@/components/common/Page'
import { DynamicItem } from '@/components/dynamic/DynamicItem'
import { Error } from '@/components/error/Error'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useGetDynamicListQuery } from '@/services/dynamic'
import { useSearch } from '@tanstack/react-router'

export const DynamicList = () => {
	const { page } = useSearch({ strict: false }) as { page?: number }
	const { isPending, isError, error, data: dynamics } = useGetDynamicListQuery({ page })
	if (isPending) return <Loading />
	if (isError) return <Error error={error} />
	return (
		<Card>
			<CardHeader>
				<CardTitle>网站动态</CardTitle>
			</CardHeader>
			<CardContent>
				{dynamics.data.map(dynamic => (
					<DynamicItem key={dynamic.id} dynamic={dynamic} />
				))}
			</CardContent>
			<CardFooter>
				<Page meta={dynamics.meta} />
			</CardFooter>
		</Card>
	)
}
