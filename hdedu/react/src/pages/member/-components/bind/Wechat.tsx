import { useAuth } from '@/hooks/useAuth'
import { MemberLayout } from '../MemberLayout'
import { WechatUserInfoQr } from '@/components/wechat/WechatUserInfoQr'

export const Wechat = () => {
	const { user } = useAuth()
	return (

		<MemberLayout description={user('openid') ? '已经绑定微信' : '请绑定微信'}>
			<WechatUserInfoQr action='wechat/qr/bind' onSuccess={() => location.reload()} />
		</MemberLayout>
	)
}
