import { useReadNotificationMutation } from '@/services/notification'
import { INotification } from '@/type/notification'
import { useQueryClient } from '@tanstack/react-query'
import classNames from 'classnames'
import dayjs from 'dayjs'
import { FC, PropsWithChildren } from 'react'
import { Badge } from '../ui/badge'
interface Props {
	notification: INotification;
	className?: string
}
export const NotificationItem: FC<PropsWithChildren<Props>> = ({ notification, className, children }) => {
	const readNotificationMutation = useReadNotificationMutation()
	const queryClient = useQueryClient();
	const readNotification = () => {
		readNotificationMutation.mutate(notification.id, {
			onSuccess: () => {
				window.open(notifcationLink(notification), '_blank')
				queryClient.invalidateQueries({ key: 'useNotificationListQuery', exact: false })
			}
		})
	}
	return (
		<main className='flex justify-between items-center'>
			<div className={
				classNames('cursor-pointer hover:text-primary', className)
			} onClick={readNotification}>
				<div className="truncate flex items-center gap-1">
					<Badge variant={notification.read_at ? 'outline' : 'default'}>
						{notification.read_at ? '已读' : '未读'}
					</Badge>
					<div className='pl-1'>
						<div className='truncate'>{notification.data.content}</div>
						<div className="text-xs text-muted-foreground">
							{dayjs(notification.created_at).fromNow()}
						</div>
					</div>
				</div>
			</div>
			{children}
		</main>
	)
}

function notifcationLink(notification: INotification) {
	switch (notification.data.model.toLowerCase()) {
		case 'topic':
			return `/topic/${notification.data.model_id}`
		case 'lesson':
			return `/lesson/${notification.data.model_id}`
	}
}
