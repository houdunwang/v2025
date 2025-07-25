import { SendCode } from '@/components/code/SendCode'
import { HdInput } from '@/components/form/HdInput'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'
import { useForm } from '@tanstack/react-form'
import { MemberLayout } from '../MemberLayout'
import { useUpdateEmailMutation } from '@/services/user'
interface IFormData {
	email: string
	code: string
}
export const Email = () => {
	const { user } = useAuth()
	const bindEmailMutation = useUpdateEmailMutation<IFormData>()
	const form = useForm({
		defaultValues: {
			email: '',
			code: ''
		},
		onSubmit: ({ value }) => {
			bindEmailMutation.mutate(value)
		}
	})
	return (
		<form onSubmit={e => {
			e.preventDefault()
			e.stopPropagation()
			form.handleSubmit()
		}}>
			<MemberLayout description={user('email') ? '已经绑定邮箱' + user('email') : '你还没有绑定邮箱'}>
				<SendCode formObject={form} action='/user/send-code/email' field="email" placeholder='请输入邮箱' />
				<HdInput<IFormData> formObject={form} fieldName="code" label="验证码" placeholder='请输入收到的验证码' />
				<Button variant="outline">绑定邮箱</Button>
			</MemberLayout>
		</form>
	)
}
