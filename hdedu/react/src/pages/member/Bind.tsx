import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { createFileRoute } from '@tanstack/react-router'
import { Email } from './-components/bind/Email'
import { Mobile } from './-components/bind/Mobile'
import { Wechat } from './-components/bind/Wechat'

export const Route = createFileRoute('/member/Bind')({
	component: RouteComponent,
})

function RouteComponent() {
	return <Tabs defaultValue="wechat" className="">
		<TabsList>
			<TabsTrigger value="email">邮箱绑定</TabsTrigger>
			<TabsTrigger value="mobile">手机号绑定</TabsTrigger>
			<TabsTrigger value="wechat">WX绑定</TabsTrigger>
		</TabsList>
		<TabsContent value="email">
			<Email />
		</TabsContent>
		<TabsContent value="mobile">
			<Mobile />
		</TabsContent>
		<TabsContent value="wechat">
			<Wechat />
		</TabsContent>
	</Tabs>
}
