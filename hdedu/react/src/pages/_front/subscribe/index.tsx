import { Loading } from '@/components/common/Loading'
import { Error } from '@/components/error/Error'
import { PackageItem } from '@/components/package/PackageItem'
import { useAuth } from '@/hooks/useAuth'
import { useGetPackageListQuery } from '@/services/package'
import { createFileRoute } from '@tanstack/react-router'
import classNames from 'classnames'

export const Route = createFileRoute('/_front/subscribe/')({
	component: RouteComponent,
})

function RouteComponent() {
	const { isPending, isError, error, data: packages } = useGetPackageListQuery()
	const auth = useAuth()
	if (isPending) return <Loading />
	if (isError) return <Error error={error} />
	return <main className="-mt-6">
		<section className='pt-20 pb-32 bg-gradient-to-br from-blue-800 via-blue-700 to-blue-600'>
			<div className='xl:w-7xl mx-auto flex justify-center flex-col items-center'>
				<h2 className='text-center text-8xl text-white font-extrabold'>投资学习是值得的</h2>
				<div className='bg-yellow-400 text-accent-foreground py-3 px-12 rounded-lg mt-12 mb-6'>
					网站新版本上线，现在是优惠期！价格即将上涨！
				</div>
			</div>
		</section>
		<section className='xl:w-7xl mx-auto grid grid-cols-3 gap-3 -mt-20 mb-20'>
			{packages.map(pack => (
				<PackageItem pack={pack} key={pack.id} showManageButton={auth.isAdministrator()}
					className={
						classNames('origin-bottom', {
							'scale-110': pack.recommend,
							'scale-90': !pack.recommend,
						})
					} />
			))}
		</section>
	</main>
}
