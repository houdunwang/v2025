import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { createFileRoute } from '@tanstack/react-router'
import { Avatar } from './-components/info/Avatar'
import { Base } from './-components/info/Base'
import { Password } from './-components/info/Password'

export const Route = createFileRoute('/member/info')({
	component: RouteComponent,
})

function RouteComponent() {
	return <Tabs defaultValue="avatar" className="">
		<TabsList>
			<TabsTrigger value="base">基础资料</TabsTrigger>
			<TabsTrigger value="password">修改密码</TabsTrigger>
			<TabsTrigger value="avatar">用户头像</TabsTrigger>
		</TabsList>
		<Card className='mt-3 pt-3'>
			<CardContent>
				<TabsContent value="base">
					<Base />
				</TabsContent>
				<TabsContent value="password">
					<Password />
				</TabsContent>
				<TabsContent value="avatar">
					<Avatar />
				</TabsContent>
			</CardContent>
		</Card>
	</Tabs>
}
