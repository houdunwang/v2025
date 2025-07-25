import { HdInput } from '@/components/form/HdInput'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ReactFormExtendedApi } from '@tanstack/react-form'
import { FC } from 'react'
import { md5 } from 'js-md5'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { toast } from 'sonner'

export const Wechat: FC<{ form: ReactFormExtendedApi<Record<string, any>, undefined> }> = ({ form }) => {
	return <main className='grid grid-cols-3 gap-3'>
		<Card>
			<CardHeader>
				<CardTitle>微信公众号</CardTitle>
			</CardHeader>
			<CardContent>
				<HdInput label='appid' fieldName={'system.wechat_official_appid'} formObject={form} />
				<HdInput label='secret' type="password" fieldName={'system.wechat_official_secret'} formObject={form} />
				<form.Field name="system.wechat_official_token" children={field => (
					<div className='flex gap-1'>
						<Input value={field.state.value} type="password" onChange={e => {
							field.handleChange(e.target.value)
						}} />
						<AlertDialog>
							<AlertDialogTrigger asChild>
								<Button variant="outline" type='button'>
									生成
								</Button>
							</AlertDialogTrigger>
							<AlertDialogContent>
								<AlertDialogHeader>
									<AlertDialogTitle>确定要生成公众号 TOKEN吗?</AlertDialogTitle>
									<AlertDialogDescription>
										生成新的 TOKEN 将导致公众号配置失效，请谨慎操作。
									</AlertDialogDescription>
								</AlertDialogHeader>
								<AlertDialogFooter>
									<AlertDialogCancel>放弃</AlertDialogCancel>
									<AlertDialogAction onClick={() => {
										field.handleChange(md5(Math.random().toString()))
									}}>
										生成
									</AlertDialogAction>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>
						<Button variant="outline" type='button' onClick={() => {
							navigator.clipboard.writeText(field.state.value).then(() => {
								toast('复制成功')
							})
						}}>
							复制到剪贴板
						</Button>
					</div>
				)} />
			</CardContent>
		</Card>
	</main>
}
