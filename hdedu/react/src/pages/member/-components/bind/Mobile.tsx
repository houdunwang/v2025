import { SendCode } from '@/components/code/SendCode'
import { HdInput } from '@/components/form/HdInput'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'
import { useUpdateMobileMutation } from '@/services/user'
import { useForm } from '@tanstack/react-form'
import { MemberLayout } from '../MemberLayout'
interface IFormData {
	mobile: string
	code: string
}
export const Mobile = () => {
	const { user } = useAuth()
	const bindEmailMutation = useUpdateMobileMutation<IFormData>()
	const form = useForm({
		defaultValues: {
			mobile: '',
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
			<MemberLayout description={user('mobile') ? '已经绑定邮箱' + user('mobile') : '你还没有绑定手机'}>
				<SendCode formObject={form} action='/user/send-code/mobile' field="mobile" />
				<HdInput<IFormData> formObject={form} fieldName="code" label="验证码" placeholder='请输入收到的验证码' />
				<Button variant="outline">绑定邮箱</Button>
			</MemberLayout>
		</form>
	)
}
