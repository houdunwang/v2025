import { Loading } from '@/components/common/Loading'
import { Error } from '@/components/error/Error'
import { PackageItem } from '@/components/package/PackageItem'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useGetPackageListQuery } from '@/services/package'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Form } from './-components/Form'

export const Route = createFileRoute('/admin/package/')({
	component: RouteComponent,
})

function RouteComponent() {
	const { isPending, isError, error, data: packages } = useGetPackageListQuery()
	if (isPending) return <Loading />
	if (isError) return <Error error={error} />
	return <Card>
		<CardHeader>
			<CardTitle className='flex items-center justify-between'>
				网站套餐管理
				<div className='flex items-center gap-1'>
					<Form />
					<Link to="/subscribe" target='_blank'>
						<Button variant="outline">查看前端效果</Button>
					</Link>
				</div>
			</CardTitle>
		</CardHeader>
		<CardContent className='grid grid-cols-4 gap-3 bg-muted p-6'>
			{packages.map(pack => (
				<PackageItem showManageButton={true} pack={pack} />
			))}
		</CardContent>
	</Card>
}
