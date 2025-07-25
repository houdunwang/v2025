import { HdInput } from '@/components/form/HdInput'
import { HdRadioGroup } from '@/components/form/HdRadioGroup'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'
import { useUpdateUserMutation } from '@/services/user'
import { IUser } from '@/type/user'
import { useForm } from '@tanstack/react-form'

export const Base = () => {
	const { getAllFields } = useAuth()
	const updateUserMutation = useUpdateUserMutation()
	const form = useForm({
		defaultValues: getAllFields(),
		onSubmit: ({ value }) => {
			updateUserMutation.mutate(value)
		}
	})
	return (
		<form onSubmit={e => {
			e.preventDefault()
			e.stopPropagation()
			form.handleSubmit()
		}}>
			<HdInput<IUser> fieldName='nickname' formObject={form} label="网站昵称" />
			<HdRadioGroup<IUser> fieldName='sex' formObject={form} label="性别" options={[
				{ label: '男', value: '1', id: 'boy' },
				{ label: '女', value: '2', id: 'girl' }
			]} />
			<HdInput<IUser> formObject={form} fieldName='home' label="个人站点" />
			<HdInput<IUser> fieldName='weibo' formObject={form} label="微博" />
			<HdInput<IUser> fieldName='qq' formObject={form} label="QQ号" />
			<HdInput<IUser> fieldName='github' formObject={form} label="Github" />
			<Button variant="outline">保存提交</Button>
		</form>
	)
}
