import { HdInput } from '@/components/form/HdInput'
import { HdRadioGroup } from '@/components/form/HdRadioGroup'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ReactFormExtendedApi } from '@tanstack/react-form'
import { FC } from 'react'

export const Pay: FC<{ form: ReactFormExtendedApi<Record<string, any>, undefined> }> = ({ form }) => {
	return <main className='grid grid-cols-3 gap-3 items-start'>
		<Card>
			<CardHeader>
				<CardTitle>支付宝</CardTitle>
			</CardHeader>
			<CardContent>
				<HdInput label='app_id' type="password" fieldName='pay.alipay.default.app_id' formObject={form} />
				<HdInput label='app_secret_cert' type="password" fieldName='pay.alipay.default.app_secret_cert' formObject={form} />
				<HdRadioGroup label='是否开启' fieldName={'pay.alipay.default.enable'} formObject={form} options={[
					{ label: '开启', value: 1, id: 'alipay_open' },
					{ label: '关闭', value: 0, id: 'alipay_close' },
				]} />
			</CardContent>
		</Card>
		<Card>
			<CardHeader>
				<CardTitle>微信支付</CardTitle>
			</CardHeader>
			<CardContent>
				<HdInput label='mch_id' type="password" fieldName='pay.wechat.default.mch_id' formObject={form} />
				<HdInput label='mch_secret_key' type="password" fieldName='pay.wechat.default.mch_secret_key' formObject={form} />
				<HdInput label='mp_app_id' fieldName='pay.wechat.default.mp_app_id' formObject={form} />
				<HdRadioGroup label='是否开启' fieldName={'pay.wechat.default.enable'} formObject={form} options={[
					{ label: '开启', value: 1, id: 'open' },
					{ label: '关闭', value: 0, id: 'close' },
				]} />
			</CardContent>
		</Card>

	</main>
}
