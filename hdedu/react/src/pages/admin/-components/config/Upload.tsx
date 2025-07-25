import { HdInput } from '@/components/form/HdInput'
import { HdRadioGroup } from '@/components/form/HdRadioGroup'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ReactFormExtendedApi } from '@tanstack/react-form'
import { FC } from 'react'

export const Upload: FC<{ form: ReactFormExtendedApi<Record<string, any>, undefined> }> = ({ form }) => {
	return <main className='grid grid-cols-3 gap-3 items-start'>
		<Card>
			<CardHeader>
				<CardTitle>上传驱动</CardTitle>
			</CardHeader>
			<CardContent>
				<HdRadioGroup label='上传驱动' fieldName={'system.upload_driver_local'} formObject={form} options={[
					{ label: '本地', value: 'local', id: 'local' },
					{ label: '阿里云', value: 'oss', id: 'oss' },
				]} />
			</CardContent>
		</Card>
		<Card>
			<CardHeader>
				<CardTitle>图片选项</CardTitle>
			</CardHeader>
			<CardContent>
				<HdInput label='允许上传的图片大小，单位是 MB' fieldName='system.upload_image_size' formObject={form} />
				<HdInput label='允许上传图片的类型' fieldName='system.upload_image_type' formObject={form} />
				<HdInput label='超过这个宽度将被缩小' fieldName='system.upload_image_max_width' formObject={form} />
				<HdInput label='超过这个高度将被缩小' fieldName='system.upload_image_max_height' formObject={form} />
			</CardContent>
		</Card>

		<Card>
			<CardHeader>
				<CardTitle>视频选项</CardTitle>
			</CardHeader>
			<CardContent>
				<HdInput label='允许上传的文件大小，单位是 MB' fieldName='system.upload_video_size' formObject={form} />
				<HdInput label='允许上传的文件类型' fieldName='system.upload_video_type' formObject={form} />
			</CardContent>
		</Card>
	</main>
}
