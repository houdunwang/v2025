import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { DeepKeys } from '@tanstack/react-form'
import { ReactFormExtendedApi } from 'node_modules/@tanstack/react-form/dist/esm/useForm'
import { PropsWithChildren } from 'react'
import { FieldValidate } from '../common/FieldValidate'
import { Label } from '../ui/label'

interface Props<T> {
	formObject: ReactFormExtendedApi<T, undefined>;
	fieldName: DeepKeys<T>;
	label: string;
	options: { label: string; value: string | number | boolean, id: string }[]
}

export const HdRadioGroup = <T extends object>({ formObject, fieldName, label, options }: PropsWithChildren<Props<T>>) => {
	return (
		<formObject.Field name={fieldName} children={field => (
			<div className='items-center gap-3'>
				<Label htmlFor="email">{label}</Label>
				<div>
					<RadioGroup defaultValue={String(field.state.value)} className='flex' onValueChange={v => field.handleChange(v as any)}>
						{options.map(option => (
							<div className="flex items-center space-x-2">
								<RadioGroupItem value={String(option.value)} id={option.id} />
								<Label htmlFor={option.id}>{option.label}</Label>
							</div>
						))}
					</RadioGroup>
					<FieldValidate name="sex" errors={field.state.meta.errors} />
				</div>
			</div>
		)} />
	)
}
