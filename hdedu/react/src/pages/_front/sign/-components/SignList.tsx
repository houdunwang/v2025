import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { UserIcon } from '@/components/user/UserIcon'
import { useAuth } from '@/hooks/useAuth'
import { useDeleteSignMutation } from '@/services/sign'
import { ISign } from '@/type/sign'
import dayjs from 'dayjs'
import { FC } from 'react'

export const SignList: FC<{ signs: ISign[] }> = ({ signs }) => {
	const deleteMutation = useDeleteSignMutation()
	const auth = useAuth()
	return (
		<Card className='mt-3'>
			<CardHeader>
				<CardTitle> 今日签到</CardTitle>
				{/* <CardDescription>Card Description</CardDescription> */}
			</CardHeader>
			<CardContent>
				<Table className='bg-white border'>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[100px]">发表者</TableHead>
							<TableHead>总签到</TableHead>
							<TableHead>今年签到</TableHead>
							<TableHead>本月签到</TableHead>
							<TableHead>签到时间</TableHead>
							<TableHead>签到心情</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{signs.map(sign => (
							<TableRow>
								<TableCell className="font-medium">
									<div className='flex items-center'>
										<UserIcon user={sign.user} />
									</div>
								</TableCell>
								<TableCell>
									{sign.sign_count?.total}
								</TableCell>
								<TableCell>
									{sign.sign_count?.year}
								</TableCell>
								<TableCell>
									{sign.sign_count?.month}
								</TableCell>
								<TableCell>
									{dayjs(sign.created_at).format('HH:mm:ss')}
								</TableCell>
								<TableCell className='flex items-center gap-1 justify-between'>
									<img src={`/assets/emoji/${sign.mood}.gif`} className='w-8 h-8' alt="" /> {sign.content}
									{auth.isAdministrator() && auth.user('id') === sign.user_id &&
										<Button variant="outline" size={'sm'} onClick={() => {
											deleteMutation.mutate(sign.id)
										}}>删除</Button>
									}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	)
}
