import { useNotificationListQuery } from '@/services/notification'
import { MessageUnread } from '@icon-park/react'
import { Loading } from '../common/Loading'
import { Error } from '../error/Error'

import { useAuth } from '@/hooks/useAuth'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { NotificationItem } from './NotificationItem'

export const NotificationIcon = () => {
	const auth = useAuth()
	return auth.isAuthenticated() ? <List /> : null
}

function List() {
	const { isPending, isError, error, data: notifications } = useNotificationListQuery({ page: 1 })
	if (isPending) return <Loading />
	if (isError) return <Error error={error} />
	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<MessageUnread theme="outline" size="27" fill="#333" />
			</DropdownMenuTrigger>
			<DropdownMenuContent className='bg-white py-3 px-5 border rounded-lg space-y-2'>
				{notifications.data.map(notification => (
					<DropdownMenuItem key={notification.id} asChild>
						<NotificationItem notification={notification} />
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
