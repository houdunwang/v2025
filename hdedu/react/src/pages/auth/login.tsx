import { HdCaptcha, ICaptcheRef } from '@/components/form/HdCaptcha';
import { HdInput } from '@/components/form/HdInput';
import { Button } from '@/components/ui/button';
import { WechatUserInfoQr } from '@/components/wechat/WechatUserInfoQr';
import { useLoginMutation } from '@/services/auth';
import { useForm } from '@tanstack/react-form';
import { createFileRoute } from '@tanstack/react-router';
import { useRef, useState } from 'react';
import { AuthLayout } from './-components/AuthLayout';
export const Route = createFileRoute('/auth/login')({
	component: RouteComponent,
})
interface IFormData {
	account: string
	password: string
	captcha: string
}

function RouteComponent() {
	const loginMutation = useLoginMutation()
	const [loginType, setLoginType] = useState<'account' | 'wechat'>('account')
	const captchaRef = useRef<ICaptcheRef | null>(null)
	const form = useForm({
		defaultValues: {
			account: 'admin',
			password: 'admin888',
			captcha: '',
		},
		onSubmit: async ({ value }) => {
			loginMutation.mutate(value, {
				onError: () => {
					captchaRef.current?.refresh()
				}
			})
		}
	})
	return <form onSubmit={e => {
		e.preventDefault()
		e.stopPropagation()
		form.handleSubmit()
	}}>
		<AuthLayout title='用户登录' bgImage='/assets/images/auth/login.jpg'>
			<div className='flex items-center justify-center gap-3 mb-3'>
				<Button variant={loginType == 'wechat' ? 'default' : 'outline'} onClick={() => setLoginType('wechat')} size={'sm'} >WX登录</Button>
				<Button variant={loginType == 'account' ? 'default' : 'outline'} onClick={() => setLoginType('account')} size={'sm'}>帐号登录</Button>

			</div>
			{loginType == 'account' ?
				<div>
					<HdInput<IFormData> formObject={form} fieldName='account' placeholder='请输入注册帐号，以英文开始的6-20位字符' />
					<HdInput<IFormData> formObject={form} fieldName='password' type="password" placeholder='请输入登录密码' />
					<HdCaptcha<IFormData> formObject={form} fieldName='captcha' ref={captchaRef} />
					<Button variant="default" className='w-full'> 登录</Button>
				</div>
				: <WechatLogin />}
		</AuthLayout>
	</form>
}

function WechatLogin() {
	return <div>
		<WechatUserInfoQr action='wechat/qr/login' onSuccess={() => location.href = '/'} />
	</div>
}
