import { Plus } from '@icon-park/react'
import { DeepKeys } from '@tanstack/react-form'
import classNames from 'classnames'
import { ReactFormExtendedApi } from 'node_modules/@tanstack/react-form/dist/esm/useForm'
import { PropsWithChildren } from 'react'
import { FieldValidate } from '../common/FieldValidate'
import { Label } from '../ui/label'
import { RcUpload } from '../upload/RcUpload'
interface Props<T> extends React.InputHTMLAttributes<HTMLInputElement> {
	formObject: ReactFormExtendedApi<T, undefined>;
	fieldName: DeepKeys<T>;
	label?: string;
	action?: string;
	[key: string]: any
}
export const HdImageUpload = <T extends object>({ formObject, fieldName, label, action, children }: PropsWithChildren<Props<T>>) => {
	return (
		<formObject.Field name={fieldName} children={field => (
			<div className=''>
				{label && <Label htmlFor={field.name}>{label}</Label>}
				<div className={classNames('grid-cols-[1fr_auto] gap-2', {
					'grid': !!children
				})}>
					<RcUpload action={action ?? '/upload/image'} accept='.jpeg,.png' onSuccess={v => {
						field.handleChange(v.url as any)
					}}>
						{field.state.value ?
							<div className='bg-gray-200 rounded-lg inline-block cursor-pointer'>
								<img src={field.state.value as any} className='w-32 rounded-lg' />
							</div>
							: <div className='border inline-block rounded-lg p-3 cursor-pointer'>
								<Plus theme="outline" size="50" fill="#333" strokeWidth={2} />
							</div>}
					</RcUpload>
				</div>
				<FieldValidate name={field.name} errors={field.state.meta.errors} />
			</div>
		)} />
	)
}
