import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const WechatSign = () => {
	return (
		<Card className='mt-3'>
			<CardHeader>
				<CardTitle>WX快签</CardTitle>
			</CardHeader>
			<CardContent>
				使用手机 Wx 发表以 签到开始的内容，完成快速签到
			</CardContent>
		</Card>
	)
}
