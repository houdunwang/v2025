import { useGetWechatUserInfoQrQuery, useWechatQrMutation } from '@/services/wechat'
import { FC, useEffect, useRef } from 'react'
import { toast } from 'sonner'
import { Loading } from '../common/Loading'
import { Error } from '../error/Error'

export const WechatUserInfoQr: FC<{ action: string, onSuccess: () => void }> = ({ action, onSuccess }) => {
	const qrMutation = useWechatQrMutation(action);
	const timeId = useRef<NodeJS.Timeout | undefined>(undefined)
	const { isPending, isFetching, isError, error, data: qr, refetch } = useGetWechatUserInfoQrQuery()

	useEffect(() => {
		timeId.current = setInterval(() => {
			if (qr?.ticket)
				qrMutation.mutate({ ticket: qr.ticket }, {
					onSuccess: data => {
						if (data.success) onSuccess();
						else if (data.success === false) {
							toast(data.message)
							refetch()
						}
					}
				})
		}, 2000)
		return () => {
			if (timeId.current) {
				clearInterval(timeId.current)
			}
		}
	}, [qr])
	if (isPending || isFetching) return <Loading />
	if (isError) return <Error error={error} />
	return (
		<main className='flex flex-col items-center justify-center cursor-pointer' onClick={() => {
			refetch()
		}}>
			<img src={qr.image} alt="" className='w-52 h-52' />
			<div className='text-xs text-muted-foreground'>
				请点击后刷新二维码
			</div>
		</main>
	)
}
