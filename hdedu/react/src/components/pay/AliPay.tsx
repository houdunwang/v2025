import { useCreateOrderMutation } from '@/services/order'
import { Alipay, Buy } from '@icon-park/react'
import { FC } from 'react'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { IPayComponentProps } from '@/type/pay'

export const AliPay: FC<IPayComponentProps> = (props) => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="default"
					className='flex items-center bg-blue-500 hover:bg-blue-500 cursor-pointer'
				>
					<Alipay theme="outline" size="27" />支付宝
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle></DialogTitle>
				</DialogHeader>
				<Pay {...props} />
			</DialogContent>
		</Dialog>
	)
}

function Pay(props: IPayComponentProps) {
	const orderMutation = useCreateOrderMutation()
	return <main className='flex flex-col items-center justify-center space-y-8'>
		<div className='font-bold text-center space-y-3'>
			<div> {props.title} </div>
			<div className='text-center text-sm font-light'>
				{props.description}
			</div>
		</div>
		<div className='flex justify-center '>
			<div className='bg-yellow-400 px-3 py-1 rounded-lg'>
				现在是优惠期！即将恢复原价
			</div>
		</div>
		<Button variant="default" onClick={() => orderMutation.mutate(props, {
			onSuccess: (order) => {
				window.open(`/hd/pay/alipay/${order.id}`)
			}
		})}
		>
			<Buy theme="outline" size="27" strokeWidth={3} />
			立即付款
		</Button>
	</main>

}
