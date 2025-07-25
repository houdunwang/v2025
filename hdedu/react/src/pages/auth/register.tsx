import { HdCaptcha, ICaptcheRef } from '@/components/form/HdCaptcha';
import { HdInput } from '@/components/form/HdInput';
import { Button } from '@/components/ui/button';
import { useRegisterMutation } from '@/services/auth';
import { useForm } from '@tanstack/react-form';
import { createFileRoute } from '@tanstack/react-router';
import { useRef } from 'react';
import { AuthLayout } from './-components/AuthLayout';
export const Route = createFileRoute('/auth/register')({
	component: RouteComponent,
})
interface IFormData {
	name: string
	password: string
	password_confirmation: string
	captcha: string;
}
function RouteComponent() {
	const registerMutation = useRegisterMutation<IFormData>()
	const captchaRef = useRef<ICaptcheRef | null>(null)
	const form = useForm({
		defaultValues: {
			name: 'admin',
			password: 'admin888',
			password_confirmation: 'admin888',
			captcha: '',
		},
		onSubmit: async ({ value }) => {
			registerMutation.mutate(value, {
				onError: () => captchaRef.current?.refresh()
			})
		}
	})
	return <form onSubmit={e => {
		e.preventDefault()
		e.stopPropagation()
		form.handleSubmit()
	}}>
		<AuthLayout title='帐号注册' bgImage='/assets/images/auth/register.jpg'>
			<HdInput<IFormData> formObject={form} fieldName='name' placeholder='请输入注册帐号，以英文开始的6-20位字符' />
			<HdInput<IFormData> formObject={form} fieldName='password' type="password" placeholder='请输入登录密码' />
			<HdInput<IFormData> formObject={form} fieldName='password_confirmation' type="password" placeholder='请再次输入密码' />
			<HdCaptcha<IFormData> formObject={form} fieldName='captcha' ref={captchaRef} />
			<Button variant="default" className='w-full'> 登录</Button>
		</AuthLayout>
	</form>
}
