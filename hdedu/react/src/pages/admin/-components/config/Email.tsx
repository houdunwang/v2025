import { HdInput } from '@/components/form/HdInput'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ReactFormExtendedApi } from '@tanstack/react-form'
import { FC } from 'react'

export const Email: FC<{ form: ReactFormExtendedApi<Record<string, any>, undefined> }> = ({ form }) => {
	return <main className='grid grid-cols-2 gap-3'>
		<Card>
			<CardHeader>
				<CardTitle>阿里云邮箱</CardTitle>
			</CardHeader>
			<CardContent>
				<HdInput label='阿里云邮箱帐号' fieldName={'system.aliyun_email_account'} formObject={form} />
				<HdInput label='密码' type="password" fieldName={'system.aliyun_email_password'} formObject={form} />
				<HdInput label='邮件主机' fieldName={'system.aliyun_email_host'} formObject={form} />
				<HdInput label='主机端口' fieldName={'system.aliyun_email_port'} formObject={form} />
			</CardContent>
		</Card>

	</main>
}
