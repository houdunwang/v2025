import { HdInput } from '@/components/form/HdInput'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ReactFormExtendedApi } from '@tanstack/react-form'
import { FC } from 'react'

export const Sms: FC<{ form: ReactFormExtendedApi<Record<string, any>, undefined> }> = ({ form }) => {
	return <main className='grid grid-cols-2 gap-3'>
		<Card>
			<CardHeader>
				<CardTitle>阿里云短信配置</CardTitle>
			</CardHeader>
			<CardContent>
				<HdInput label='阿里云短信签名' fieldName={'system.aliyun_sms_sign'} formObject={form} />
				<HdInput label='阿里云短信验证码模板' fieldName={'system.aliyun_sms_template'} formObject={form} />
			</CardContent>
		</Card>

	</main>
}
