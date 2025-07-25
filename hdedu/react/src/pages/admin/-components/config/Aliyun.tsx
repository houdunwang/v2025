import { HdInput } from '@/components/form/HdInput'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ReactFormExtendedApi } from '@tanstack/react-form'
import { FC } from 'react'

export const Aliyun: FC<{ form: ReactFormExtendedApi<Record<string, any>, undefined> }> = ({ form }) => {
	return <main className='grid grid-cols-3 gap-3'>
		<Card>
			<CardHeader>
				<CardTitle>阿里云基本配置</CardTitle>
			</CardHeader>
			<CardContent>
				<HdInput label='AccessKey ID' type="password" fieldName={'system.aliyun_accesskey_id'} formObject={form} />
				<HdInput label='AccessKey Secret' type="password" fieldName={'system.aliyun_accesskey_secret'} formObject={form} />
				<HdInput label='OSS Endpoint' fieldName={'system.aliyun_oss_endpoint'} formObject={form} />
			</CardContent>
		</Card>
		<Card>
			<CardHeader>
				<CardTitle>阿里云视频</CardTitle>
			</CardHeader>
			<CardContent>
				<HdInput label='OSS Bucket' fieldName={'system.aliyun_video_oss_bucket'} formObject={form} />
				<HdInput label='CDN 域名' fieldName={'system.aliyun_video_cdn_domain'} formObject={form} />
				<HdInput label='CDN 鉴权主KEY' type="password" fieldName={'system.aliyun_video_cdn_auth_key'} formObject={form} />
			</CardContent>
		</Card>

		<Card>
			<CardHeader>
				<CardTitle>阿里云图片</CardTitle>
			</CardHeader>
			<CardContent>
				<HdInput label='OSS Bucket' fieldName={'system.aliyun_image_oss_bucket'} formObject={form} />
				<HdInput label='CDN 域名' fieldName={'system.aliyun_image_cdn_domain'} formObject={form} />
			</CardContent>
		</Card>
	</main>
}
