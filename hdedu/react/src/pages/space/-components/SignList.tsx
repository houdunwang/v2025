import { Loading } from '@/components/common/Loading'
import { Page } from '@/components/common/Page'
import { Error } from '@/components/error/Error'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useGetUserSignListQuery } from '@/services/sign'
import { IUser } from '@/type/user'
import dayjs from 'dayjs'
import { FC } from 'react'

export const SignList: FC<{ user: IUser }> = ({ user }) => {
	const { isPending, isError, error, data: signs } = useGetUserSignListQuery(user.id)
	if (isPending) return <Loading />
	if (isError) return <Error error={error} />
	return (
		<Card className='2xl:w-7xl mx-auto mt-3'>
			<CardHeader>
				<CardTitle>签到列表</CardTitle>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead > 签到心情</TableHead>
							<TableHead className='w-[200px]'>签到时间</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{signs.data.map(sign => (
							<TableRow>
								<TableCell>{sign.content}</TableCell>
								<TableCell>{dayjs(sign.created_at).format('YYYY-MM-DDTHH:mm')}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
			<CardFooter>
				<Page meta={signs.meta} />
			</CardFooter>
		</Card>
	)
}
