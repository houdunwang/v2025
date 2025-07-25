import { SendCode } from '@/components/code/SendCode';
import { HdCaptcha, ICaptcheRef } from '@/components/form/HdCaptcha';
import { HdInput } from '@/components/form/HdInput';
import { Button } from '@/components/ui/button';
import { useFindPasswordMutation } from '@/services/auth';
import { useForm } from '@tanstack/react-form';
import { createFileRoute } from '@tanstack/react-router';
import { useRef } from 'react';
import { AuthLayout } from './-components/AuthLayout';
export const Route = createFileRoute('/auth/forget')({
	component: RouteComponent,
})
interface IFormData {
	account: string
	password: string
	password_confirmation: string
	captcha: string;
	code: string;
	field: 'email' | 'mobile'
}
function RouteComponent() {
	const findPasswordMutation = useFindPasswordMutation<IFormData>()
	const captchaRef = useRef<ICaptcheRef | null>(null)
	const form = useForm<IFormData>({
		defaultValues: {
			account: 'admin',
			password: 'admin888',
			password_confirmation: 'admin888',
			captcha: '',
			code: '',
			field: 'email'
		},
		onSubmit: async ({ value }) => {
			findPasswordMutation.mutate(value, {
				onError: () => captchaRef.current?.refresh()
			})
		}
	})
	return <form onSubmit={e => {
		e.preventDefault()
		e.stopPropagation()
		form.handleSubmit()
	}}>

		<AuthLayout title='找回密码' bgImage='/assets/images/auth/forget-password.jpg'>
			<div className='flex gap-3 justify-center mb-3'>
				<form.Field name="field" children={field => (
					<Button variant={field.state.value === 'email' ? 'default' : 'outline'} type="button" size={'sm'}
						onClick={_ => field.handleChange('email')}>
						邮箱找回
					</Button>
				)} />
				<form.Field name="field" children={field => (
					<Button variant={field.state.value === 'mobile' ? 'default' : 'outline'} type='button' size={'sm'}
						onClick={_ => field.handleChange('mobile')}>
						手机找回
					</Button>
				)} />
			</div>
			<form.Field name="field" children={field =>
				<SendCode formObject={form} action={`/auth/send-code/${field.state.value}`} field={field.state.value} />
			} />
			<HdInput<IFormData> formObject={form} fieldName="code" placeholder='请输入收到的验证码' />
			<HdInput<IFormData> formObject={form} fieldName='password' type="password" placeholder='请输入登录密码' />
			<HdInput<IFormData> formObject={form} fieldName='password_confirmation' type="password" placeholder='请再次输入密码' />
			<HdCaptcha<IFormData> formObject={form} fieldName='captcha' ref={captchaRef} />
			<Button variant="default" className='w-full'> 登录</Button>
		</AuthLayout>
	</form>
}
