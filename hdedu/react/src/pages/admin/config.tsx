import { Loading } from '@/components/common/Loading'
import { Error } from '@/components/error/Error'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useGetConfigQuery, useSaveConfigMutation } from '@/services/config'
import { useForm } from '@tanstack/react-form'
import { createFileRoute } from '@tanstack/react-router'
import { Aliyun } from './-components/config/Aliyun'
import { Base } from './-components/config/Base'
import { Email } from './-components/config/Email'
import { Pay } from './-components/config/Pay'
import { Sms } from './-components/config/Sms'
import { Upload } from './-components/config/Upload'
import { Wechat } from './-components/config/Wechat'

export const Route = createFileRoute('/admin/config')({
	component: RouteComponent,
})

function RouteComponent() {
	const { isPending, isError, error, data: config } = useGetConfigQuery('all');
	if (isPending) return <Loading />
	if (isError) return <Error error={error} />
	return <Config config={config} />
}

function Config({ config }: { config: Record<string, any> }) {
	const saveConfigMutation = useSaveConfigMutation()
	const form = useForm({
		defaultValues: config,
		onSubmit: ({ value }) => {
			saveConfigMutation.mutate(value);
		}
	})
	return <form onSubmit={e => {
		e.preventDefault()
		e.stopPropagation()
		form.handleSubmit()
	}}>
		<Tabs defaultValue="pay" className="mb-3">
			<div className='bg-white p-3 rounded-lg'>
				<TabsList>
					<TabsTrigger value="base">基本配置</TabsTrigger>
					<TabsTrigger value="aliyun">阿里云</TabsTrigger>
					<TabsTrigger value="sms">短信设置</TabsTrigger>
					<TabsTrigger value="email">邮件配置</TabsTrigger>
					<TabsTrigger value="wechat">公众号</TabsTrigger>
					<TabsTrigger value="upload">上传处理</TabsTrigger>
					<TabsTrigger value="pay">在线支付</TabsTrigger>
				</TabsList>
			</div>
			<TabsContent value="base"> <Base form={form} /> </TabsContent>
			<TabsContent value="aliyun"> <Aliyun form={form} /> </TabsContent>
			<TabsContent value="sms"> <Sms form={form} /> </TabsContent>
			<TabsContent value="email"> <Email form={form} /> </TabsContent>
			<TabsContent value="wechat"> <Wechat form={form} /> </TabsContent>
			<TabsContent value="upload"> <Upload form={form} /> </TabsContent>
			<TabsContent value="pay"> <Pay form={form} /> </TabsContent>
		</Tabs>
		<Button variant="default">保存提交</Button>
	</form>
}
