import { useValidateStroe } from '@/store/useValidateStore';
import { ValidationError } from '@tanstack/react-form';

export const FieldValidate = ({ errors, name }: { errors: ValidationError[] | [], name: string }) => {
	const errorStoreData = useValidateStroe(s => s.errors)
	if (errors.length == 0 && !errorStoreData[name]) return <div className='my-3'></div>;
	return (
		<div className='border bg-red-100 h-6 flex items-center px-2 my-1 text-xs text-accent-foreground rounded-sm'>
			<div className='scale-100 origin-left'>
				{errors.join('') || errorStoreData[name].join('')}
			</div>
		</div>
	)
}
