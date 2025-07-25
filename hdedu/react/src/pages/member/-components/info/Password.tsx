import { HdInput } from '@/components/form/HdInput';
import { Button } from '@/components/ui/button';
import { useUpdatePasswordMutation } from '@/services/user';
import { useForm } from '@tanstack/react-form';

interface IFormData {
	oldPassword: string;
	password: string;
	password_confirmation: string;
}
export const Password = () => {
	const updatePasswordMutation = useUpdatePasswordMutation<IFormData>()
	const form = useForm({
		defaultValues: {
			oldPassword: '',
			password: '',
			password_confirmation: ''
		},
		onSubmit: ({ value }) => {
			updatePasswordMutation.mutate(value)
		}
	})
	return (
		<form onSubmit={e => {
			e.preventDefault()
			e.stopPropagation()
			form.handleSubmit()
		}}>
			<HdInput<IFormData> fieldName="oldPassword" label="旧密码" formObject={form} type="password" />
			<HdInput<IFormData> fieldName="password" label="新密码" formObject={form} type="password" />
			<HdInput<IFormData> fieldName="password_confirmation" label="确认密码" formObject={form} type="password" />
			<Button variant="outline">保存提交</Button>
		</form>
	)
}
