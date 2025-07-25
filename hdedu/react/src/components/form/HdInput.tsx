import { DeepKeys } from '@tanstack/react-form'
import { ReactFormExtendedApi } from 'node_modules/@tanstack/react-form/dist/esm/useForm'
import { PropsWithChildren } from 'react'
import { FieldValidate } from '../common/FieldValidate'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import classNames from 'classnames'
interface Props<T> extends React.InputHTMLAttributes<HTMLInputElement> {
	formObject: ReactFormExtendedApi<T, undefined>;
	fieldName: DeepKeys<T>;
	label?: string;
	[key: string]: any
}

export const HdInput = <T extends object>({ formObject, fieldName, label, children, ...props }: PropsWithChildren<Props<T>>) => {
	return (
		<formObject.Field name={fieldName} children={field => (
			<div className=''>
				{label && <Label htmlFor={field.name}>{label}</Label>}
				<div className={classNames('grid-cols-[1fr_auto] gap-2', {
					'grid': !!children
				})}>
					<Input value={field.state.value as string || ''} {...props}
						onChange={(e) => field.handleChange(e.target.value as any)} id={field.name} />
					{children}
				</div>
				<FieldValidate name={field.name} errors={field.state.meta.errors} />
			</div>
		)} />
	)
}
