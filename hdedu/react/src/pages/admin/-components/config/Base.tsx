import { HdImageUpload } from '@/components/form/HdImageUpload'
import { HdInput } from '@/components/form/HdInput'
import { HdRadioGroup } from '@/components/form/HdRadioGroup'
import { HdTextarea } from '@/components/form/HdTextarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ReactFormExtendedApi } from '@tanstack/react-form'
import { FC } from 'react'

export const Base: FC<{ form: ReactFormExtendedApi<Record<string, any>, undefined> }> = ({ form }) => {
	return <main className='grid grid-cols-3 gap-3'>
		<Card>
			<CardHeader>
				<CardTitle>基本配置</CardTitle>
			</CardHeader>
			<CardContent>
				<HdInput fieldName={'common.app_name'} formObject={form} label={'网站名称'} />
				<HdInput fieldName={'common.app_icp'} formObject={form} label={'ICP备案号'} />
				<HdInput fieldName={'common.copyright'} formObject={form} label='版权信息备' />
				<HdInput fieldName={'common.wechat'} formObject={form} label='官方WX' />
				<HdInput fieldName={'common.email'} formObject={form} label='网站邮箱' />
				<HdImageUpload formObject={form} fieldName={'common.app_logo'} label="网站 LOGO" />
			</CardContent>
		</Card>
		<Card>
			<CardHeader>
				<CardTitle>维护模式</CardTitle>
			</CardHeader>
			<CardContent>
				<HdRadioGroup label='开启网站' fieldName={'common.site_open'}
					formObject={form}
					options={[
						{ label: '开启', value: 1, id: 'open' },
						{ label: '关闭', value: 0, id: 'close' },
					]} />
				<HdTextarea fieldName={'common.site_close_message'} formObject={form} label={'关闭时的维护信息'} />
			</CardContent>
		</Card>
	</main>
}
