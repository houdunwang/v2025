import { Form } from '@/pages/admin/package/-components/Form'
import { useDeletePackageMutation } from '@/services/package'
import { IPackage } from '@/type/package'
import { CheckOne } from '@icon-park/react'
import classNames from 'classnames'
import { FC, PropsWithChildren } from 'react'
import { AliPay } from '../pay/AliPay'
import { WechatPay } from '../pay/WechatPay'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog'
import { Button } from '../ui/button'
interface Props {
	className?: string,
	showManageButton?: boolean;
	pack: IPackage
}
export const PackageItem: FC<PropsWithChildren<Props>> = ({ showManageButton, pack, className }) => {
	return (
		<main className={
			classNames('px-6 py-10 rounded-xl flex flex-col justify-center items-center hover:shadow-lg duration-500 ', {
				'text-white': pack.recommend,
				'bg-gradient-to-br from-red-400 via-red-500 to-yellow-600': pack.recommend,
				'bg-white': !pack.recommend,
			}, className)
		}>
			<img src={pack.icon} alt="" className='w-32' />
			<h2 className='text-xl font-bold py-3 text-center'>{pack.title}</h2>
			<div className='text-sm text-center'>订阅周期{pack.months}个月</div>
			<div className='text-sm text-center'>{pack.ad}</div>
			<div className='text-4xl font-bold py-3'>{Number(pack.price)}
				<span className='text-sm font-light'>元</span>
			</div>
			<div className='text-sm'>
				<div className='flex items-center gap-1'>
					<CheckOneComponent pack={pack} />
					学习网站所有课程
				</div>
				<div className='flex items-center gap-1'>
					<CheckOneComponent pack={pack} />
					高清版视频下载
				</div>
			</div>
			<div className='flex items-center gap-2 mt-6'>
				<AliPay modelName='package' modelId={pack.id}
					title='订阅后观看网站所有课程'
					description={`你订阅的套餐是：${pack.title}`} />
				<WechatPay modelName='package' modelId={pack.id} title='订阅后观看网站所有课程'
					description={`你订阅的套餐是：${pack.title}`} />
			</div>
			<div className='text-accent-foreground'>
				{showManageButton && <ManageButton pack={pack} />}
			</div>
		</main>
	)
}

function ManageButton({ pack }: { pack: IPackage }) {
	const deleteMutation = useDeletePackageMutation()
	return <div className='flex items-center gap-1 pt-3'>
		<Form pack={pack} />
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button variant="outline" > 删除 </Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle> 确定删除套餐吗？</AlertDialogTitle>
					<AlertDialogDescription>
						删除后将无法恢复
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel> 取消</AlertDialogCancel>
					<AlertDialogAction onClick={() => {
						deleteMutation.mutate(pack.id)
					}}>删除</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>

	</div>
}

function CheckOneComponent({ pack }: { pack: IPackage }) {
	return <CheckOne theme="outline" size="16" className={
		pack.recommend ? 'text-white' : 'text-green-600'
	} strokeWidth={4} />
}