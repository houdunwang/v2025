import { Button } from '@/components/ui/button'
import { useAxios } from '@/hooks/useAxios'
import { useMutation } from '@tanstack/react-query'
import { FC, InputHTMLAttributes, useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import { FieldValidate } from '../common/FieldValidate'
import { Input } from '../ui/input'
import { ReactFormExtendedApi } from '@tanstack/react-form'
import { Label } from '../ui/label'
import dayjs from 'dayjs'
interface Props extends InputHTMLAttributes<HTMLInputElement> {
	formObject: ReactFormExtendedApi<any, undefined>;
	field: 'email' | 'mobile';
	label?: string
	action: string;
}

export const SendCode: FC<Props> = ({ formObject, field, label, action, ...props }) => {
	const sendEndTime = localStorage.getItem('sendCodeEndTime')
	const [endtime, setEndTime] = useState(sendEndTime ? dayjs(sendEndTime) : dayjs())
	const [currentTime, setCurrentTime] = useState(dayjs());
	const timeoutId = useRef<NodeJS.Timeout | undefined>(undefined)
	const [value, setValue] = useState('')
	const { axiosInstance } = useAxios()
	const sendCodeMutation = useMutation({
		mutationFn: async () => {
			await axiosInstance.post(action, { [field]: value })
			toast('验证码发送成功')
		}
	})
	useEffect(() => {
		timeoutId.current = setInterval(() => {
			setCurrentTime(dayjs())
		}, 1000)
		return () => clearInterval(timeoutId.current)
	}, [])
	return (
		<formObject.Field name={field} children={fieldInstance => (
			<>
				{label && <Label htmlFor="email">{label}</Label>}
				<div className='grid grid-cols-[1fr_auto] gap-2'>
					<Input type='password' {...props} value={value}
						placeholder={`请输入${field === 'email' ? '邮箱' : '手机号'}`}
						onChange={e => {
							setValue(e.target.value)
							fieldInstance.handleChange(e.target.value)
						}} />
					<Button variant="outline"
						type='button'
						disabled={currentTime < endtime || sendCodeMutation.isPending}
						onClick={() => {
							if (!value) return toast('请设置发送的' + (field as unknown as string == 'email' ? '邮件' : '手机号'))
							sendCodeMutation.mutate(undefined, {
								onSuccess: () => {
									localStorage.setItem('sendCodeEndTime', dayjs().add(60, 'second').toISOString())
									setEndTime(dayjs().add(60, 'second'))
								}
							})
						}}>
						{currentTime > endtime ? '发送验证码' : `请` + (endtime.diff(currentTime, 'second')) + '秒后操作'}
					</Button>
				</div >
				<FieldValidate errors={fieldInstance.state.meta.errors} name={fieldInstance.name} /></>
		)} />
	)
}
