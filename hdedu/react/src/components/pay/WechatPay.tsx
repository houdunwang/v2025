import { useCreateOrderMutation } from '@/services/order'
import { useGetWxPayQrCodeMutation } from '@/services/pay'
import { IPayComponentProps } from '@/type/pay'
import { ShoppingBag } from '@icon-park/react'
import { Link } from '@tanstack/react-router'
import { FC, useCallback, useEffect, useState } from 'react'
import { Loading } from '../common/Loading'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'

export const WechatPay: FC<IPayComponentProps> = (props) => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="default" className='flex items-center bg-green-600 hover:bg-green-500 cursor-pointer'>
					<ShoppingBag theme="outline" size="27" />微信支付
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle></DialogTitle>
					<DialogDescription></DialogDescription>
					<Pay {...props} />
				</DialogHeader>
			</DialogContent>
		</Dialog>
	)
}

function Pay(props: IPayComponentProps) {
	const orderMutation = useCreateOrderMutation()
	const qrMutation = useGetWxPayQrCodeMutation()
	const [qrImage, setQrImage] = useState<string | null>(null)
	const makeOrder = useCallback(() => {
		orderMutation.mutate(props, {
			onSuccess: (order) => {
				qrMutation.mutate(order.id, {
					onSuccess: (res) => {
						setQrImage(URL.createObjectURL(res))
					}
				})
			}
		})
	}, [])
	useEffect(() => {
		makeOrder()
	}, [])
	return <main className='flex flex-col items-center justify-center space-y-6'>
		<div className='font-bold text-center space-y-3'>
			<div>{props.title}</div>
			<div className='text-center text-sm font-light'>
				{props.description}
			</div>
		</div>
		<div className='flex flex-col justify-center items-center'>
			<div className='bg-yellow-400 px-3 py-1 rounded-lg mb-3'>
				现在是优惠期！即将恢复原价
			</div>
			{qrImage ?
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger><img src={qrImage} className='w-52 h-52 cursor-pointer' onClick={makeOrder} /></TooltipTrigger>
						<TooltipContent>
							点击刷新二维码
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
				: <Loading />}
		</div>
		<div className='mt-3 text-sm font-light'>
			支付成功后请访问
			<Link to='/member/subscribe' target='_blank' className='text-primary font-bold'>
				会员中心
			</Link>
			查看
		</div>
	</main>
}
