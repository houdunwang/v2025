import { Loading } from '@/components/common/Loading'
import { Page } from '@/components/common/Page'
import { Error } from '@/components/error/Error'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { UserIcon } from '@/components/user/UserIcon'
import { useGetOrderListQuery } from '@/services/order'
import { IOrder } from '@/type/order'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import dayjs from 'dayjs'

export const Route = createFileRoute('/admin/order')({
	component: RouteComponent,
	validateSearch: (search: Record<string, unknown>): { page?: number, key?: string } => {
		return search
	}
})

function RouteComponent() {
	const search = Route.useSearch()
	const navigate = useNavigate()
	const { isPending, isError, error, data: orders } = useGetOrderListQuery(search)
	if (isPending) return <Loading />
	if (isError) return <Error error={error} />
	return <Card>
		<CardHeader>
			<CardTitle className='flex justify-between items-center'>
				订单列表
				<div >
					<form className='flex items-center gap-1'>
						<Input name="key" placeholder='请输入网站订单号、支付订单号' />
						<Button variant="outline" > 搜索</Button>
					</form>
				</div>
			</CardTitle>
			{/* <CardDescription>Card Description</CardDescription> */}
		</CardHeader>
		<CardContent>
			<Table className='border'>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[100px]">ID</TableHead>
						<TableHead>商品名称</TableHead>
						<TableHead> 价格</TableHead>
						<TableHead> 商户订单号</TableHead>
						<TableHead> 支付订单号</TableHead>
						<TableHead> 支付状态</TableHead>
						<TableHead> 金额</TableHead>
						<TableHead className="w-[200px]"> 时间</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{orders.data.map(order => (
						<TableRow>
							<TableCell className="font-medium">{order.id}</TableCell>
							<TableCell>
								<OrderInfo order={order} />
							</TableCell>
							<TableCell>{order.price}</TableCell>
							<TableCell>{order.sn}</TableCell>
							<TableCell>{order.trade_no}</TableCell>
							<TableCell>{order.pay_type ? '已支付' : '未支付'}</TableCell>
							<TableCell>{order.pay_type == 'wechat' ? '微信' : '支付宝'}</TableCell>
							<TableCell>{dayjs(order.created_at).format('YYYY-MM-DD HH:mm')}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</CardContent>
		<CardFooter>
			<Page meta={orders.meta} onChange={page => {
				navigate({ to: '/admin/order', search: { ...search, page } })
			}} />
		</CardFooter>
	</Card >
}

function OrderInfo({ order }: { order: IOrder }) {
	return <Dialog>
		<DialogTrigger asChild>
			<Button variant="outline" size={'sm'}>
				{order.subject}
			</Button>
		</DialogTrigger>
		<DialogContent>
			<DialogHeader>
				<DialogTitle>订单详情</DialogTitle>
				<DialogDescription>
				</DialogDescription>
				<div className='space-y-2'>
					<div className='flex items-center gap-1 bg-muted p-3 rounded-lg gap-2'>
						<UserIcon user={order.user} />
						<div className="flex flex-col gap-1 justify-between text-xs">
							<div className="">	{order.user.nickname}</div>
							<div>手机号: {order.user.mobile}</div>
						</div>
					</div>
					{Object.entries(order).map(([key, value]) => {
						if (key == 'user') return
						return <div className='grid grid-cols-[100px_1fr] gap-1'>
							<Label htmlFor="email">{key}</Label>
							<Input defaultValue={value} />
						</div>
					})}
				</div>
			</DialogHeader>
		</DialogContent>
	</Dialog>
}
