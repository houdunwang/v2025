import { IDynamic } from '@/type/dynamic'
import { Link } from '@tanstack/react-router'
import dayjs from 'dayjs'
import { FC } from 'react'
import { Badge } from '../ui/badge'
import { UserIcon } from '../user/UserIcon'
interface Props {
	dynamic: IDynamic
}
export const DynamicItem: FC<Props> = ({ dynamic }) => {
	return <div key={dynamic.id} className='border-b py-2 flex items-center gap-2'>
		<UserIcon user={dynamic.user} />
		<div>
			<DynamicTitle dynamic={dynamic} />
			<div className='flex items-center gap-2 text-xs text-muted-foreground'>
				<div>
					<DynamicTag dynamic={dynamic} />
					<Link to="/space/$id" params={{ id: dynamic.user.id }}>
						{dynamic.user.nickname}
					</Link>
				</div>
				<span>发表于 {dayjs(dynamic.created_at).fromNow()}</span>
			</div>
		</div>
	</div>
}

function DynamicTitle({ dynamic }: { dynamic: IDynamic }) {
	const properties = dynamic.properties
	let to = ''
	switch (dynamic.dynamicable_type) {
		case 'App\\Models\\Comment': {
			to = `/${properties.model.toLowerCase()}/${properties.model_id}?commentId=${dynamic.dynamicable_id}`
			break;
		}
		default:
			to = `/${properties.model.toLowerCase()}/${properties.model_id}`
	}
	return <Link to={to}>
		{dynamic.title}
	</Link>
}

function DynamicTag({ dynamic }: { dynamic: IDynamic }) {
	switch (dynamic.dynamicable_type) {
		case 'App\\Models\\Comment':
			return <Badge variant="default" className='scale-75 origin-left'>评论</Badge>
		case 'App\\Models\\Topic':
			return <Badge variant="default" className='bg-[#1abc9c] hover:bg-[#16a085] scale-75 origin-left'>话题</Badge>
	}
}
