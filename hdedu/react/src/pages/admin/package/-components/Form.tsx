import { HdImageUpload } from '@/components/form/HdImageUpload'
import { HdInput } from '@/components/form/HdInput'
import { HdRadioGroup } from '@/components/form/HdRadioGroup'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useAddPackageMutation, useUpdatePackageMutation } from '@/services/package'
import { IPackage } from '@/type/package'
import { useForm } from '@tanstack/react-form'
import { useQueryClient } from '@tanstack/react-query'
import { FC, useState } from 'react'
import { toast } from 'sonner'
interface Props {
	pack?: IPackage
}

const defaultValues = { title: '', ad: '', months: 3, price: 0, state: 1, icon: '', recommend: 0 }

export const Form: FC<Props> = ({ pack }) => {
	const [dialogOpen, setDialogOpen] = useState(false)
	return (
		<Dialog open={dialogOpen} onOpenChange={open => {
			setDialogOpen(open)
		}}>
			<DialogTrigger asChild>
				<Button variant="outline">
					{pack ? '修改' : '添加'}套餐
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Are you sure absolutely sure?</DialogTitle>
				</DialogHeader>
				<FormComponent pack={pack} setDialogOpen={setDialogOpen} />
			</DialogContent>
		</Dialog>
	)
}

function FormComponent({ pack, setDialogOpen }: { pack?: IPackage, setDialogOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
	const addMutation = useAddPackageMutation()
	const updateMutation = useUpdatePackageMutation()
	const queryClient = useQueryClient()
	const form = useForm({
		defaultValues: pack ? pack : defaultValues,
		onSubmit: ({ value }) => {
			const action = pack ? updateMutation : addMutation
			action.mutate(value, {
				onSuccess: () => {
					setDialogOpen(false)
					queryClient.invalidateQueries({ queryKey: ['useGetPackageListQuery'], exact: false })
					toast('保存成功')
				}
			})
		}
	})
	return <form onSubmit={e => {
		e.preventDefault()
		e.stopPropagation()
		form.handleSubmit();
	}}>
		<HdInput formObject={form} fieldName='title' label="套餐名称" />
		<HdInput formObject={form} fieldName='ad' label="广告语" />
		<HdInput formObject={form} type="number" fieldName='price' label="价格" />
		<HdInput formObject={form} fieldName='months' label="会员月数" />
		<HdImageUpload formObject={form} fieldName='icon' label="套餐图标" />
		<HdRadioGroup formObject={form} fieldName='state' label="套餐状态" options={[
			{ label: '开启', value: 1, id: 'state-open' },
			{ label: '关闭', value: 0, id: 'state-close' },
		]} />
		<HdRadioGroup formObject={form} fieldName='recommend' label="推荐套餐" options={[
			{ label: '推荐', value: 1, id: 'open' },
			{ label: '普通套餐', value: 0, id: 'close' },
		]} />
		<Button type="submit">提交</Button>
	</form>
}

