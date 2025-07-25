import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/hooks/useAuth';
import { createFileRoute, Link } from '@tanstack/react-router'
import dayjs from 'dayjs';

export const Route = createFileRoute('/member/subscribe')({
	component: RouteComponent,
})

function RouteComponent() {
	const { user } = useAuth();

	return <Card>
		<CardHeader>
			<CardTitle>你的订阅状态</CardTitle>
			{/* <CardDescription>Card Description</CardDescription> */}
		</CardHeader>
		<CardContent>
			{!user('subscribe') || dayjs(user('subscribe')?.end_time!) <= dayjs() ?
				<div className='flex items-center gap-3'>
					你没有订阅或订阅已经到期
					<Link to="/subscribe" target='_blank'>
						<Button variant="default" size={'sm'}>订阅学习高质量教程</Button>
					</Link>
				</div> : <SubscribeMessage />}
		</CardContent>
	</Card>
}

function SubscribeMessage() {
	const { user } = useAuth();

	return <div>
		你的订阅到期时间为：{dayjs(user('subscribe')?.end_time!).format('YYYY-MM-DD')}
	</div>
}
