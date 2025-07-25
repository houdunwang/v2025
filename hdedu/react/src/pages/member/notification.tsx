import { Loading } from '@/components/common/Loading'
import { Page } from '@/components/common/Page'
import { Error } from '@/components/error/Error'
import { NotificationItem } from '@/components/notification/NotificationItem'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useDeleteAllReadNotificationMutation, useNotificationListQuery, useNotificationMutation } from '@/services/notification'
import { INotification } from '@/type/notification'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/member/notification')({
	component: RouteComponent,
})

function RouteComponent() {
	const { isPending, isError, error, data: notifications } = useNotificationListQuery({ page: 1 })

	if (isPending) return <Loading />
	if (isError) return <Error error={error} />
	return <Card>
		<CardHeader>
			<CardTitle className='flex justify-between items-end'>
				站内通知
				{notifications.data.length > 0 && <DeleeteAllNotification />}
			</CardTitle>
		</CardHeader>
		<CardContent>
			{notifications.data.map(notification => (
				<div key={notification.id} className='py-3 border-b'>
					<NotificationItem notification={notification}>
						<DelNotification notification={notification} />
					</NotificationItem>
				</div>
			))}
		</CardContent>
		<CardFooter>
			<Page meta={notifications.meta} />
		</CardFooter>
	</Card>
}

function DelNotification({ notification }: { notification: INotification }) {
	const delMutation = useNotificationMutation()
	return <AlertDialog>
		<AlertDialogTrigger asChild>
			<Button variant="outline" size={'sm'} >删除</Button>
		</AlertDialogTrigger>
		<AlertDialogContent>
			<AlertDialogHeader>
				<AlertDialogTitle>温馨提示?</AlertDialogTitle>
				<AlertDialogDescription>
					删除通知吗
				</AlertDialogDescription>
			</AlertDialogHeader>
			<AlertDialogFooter>
				<AlertDialogCancel>取消</AlertDialogCancel>
				<AlertDialogAction onClick={() => delMutation.mutate(notification.id)}> 删除</AlertDialogAction>
			</AlertDialogFooter>
		</AlertDialogContent>
	</AlertDialog>
}
function DeleeteAllNotification() {
	const deleteALlReadMutation = useDeleteAllReadNotificationMutation()
	return <AlertDialog>
		<AlertDialogTrigger asChild>
			<Button variant="outline" >
				删除所有已读通知
			</Button>
		</AlertDialogTrigger>
		<AlertDialogContent>
			<AlertDialogHeader>
				<AlertDialogTitle>温馨提示</AlertDialogTitle>
				<AlertDialogDescription> 确定删除所有通知吗？</AlertDialogDescription>
			</AlertDialogHeader>
			<AlertDialogFooter>
				<AlertDialogCancel>取消</AlertDialogCancel>
				<AlertDialogAction onClick={() => {
					deleteALlReadMutation.mutate();
				}}>删除</AlertDialogAction>
			</AlertDialogFooter>
		</AlertDialogContent>
	</AlertDialog >
	return
}
