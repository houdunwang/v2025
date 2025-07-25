import { DeepKeys, ReactFormExtendedApi } from '@tanstack/react-form';
import { Ref, useImperativeHandle, useRef } from 'react';
import { FieldValidate } from '../common/FieldValidate';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
export type ICaptcheRef = { refresh: () => void }
interface Props<T> {
	formObject: ReactFormExtendedApi<T, undefined>;
	fieldName: DeepKeys<T>;
	label?: string;
	[key: string]: any
	ref: Ref<ICaptcheRef>
}
export const HdCaptcha = <T extends object>({ formObject, label, ref, fieldName }: Props<T>) => {
	const imgRef = useRef<HTMLImageElement | null>(null)
	useImperativeHandle(ref, () => {
		return {
			refresh: () => {
				if (imgRef.current)
					imgRef.current.src = '/captcha/math?' + Math.random()
			}
		}
	})
	return (
		<formObject.Field name={fieldName} children={field => (
			<main>
				{label && <Label htmlFor={field.name}>{label}</Label>}
				<div className="grid grid-cols-[1fr_auto] gap-1">
					<Input placeholder='请输入验证码' onChange={e => {
						field.handleChange(e.target.value as any)
					}} />
					<img src="/captcha/math" ref={imgRef} className='rounded-sm cursor-pointer border' onClick={e => {
						e.currentTarget.src = '/captcha/math?' + Math.random()
					}} />
				</div>
				<FieldValidate name={field.name} errors={field.state.meta.errors} />
			</main>
		)} />
	)
}
