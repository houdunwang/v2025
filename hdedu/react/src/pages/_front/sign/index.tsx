import { Loading } from '@/components/common/Loading'
import { Error } from '@/components/error/Error'
import { useAuth } from '@/hooks/useAuth'
import { useGetSignListQuery } from '@/services/sign'
import { createFileRoute } from '@tanstack/react-router'
import { NoLogin } from './-components/NoLogin'
import { SignList } from './-components/SignList'
import { SignSubmit } from './-components/SignSubmit'
import { WechatSign } from './-components/WechatSign'

export const Route = createFileRoute('/_front/sign/')({
	component: RouteComponent,
})

function RouteComponent() {
	const { isPending, isError, error, data } = useGetSignListQuery()
	const { isAuthenticated } = useAuth()
	if (isPending) return <Loading />
	if (isError) return <Error error={error} />
	return <main className='xl:w-7xl mx-auto'>
		{isAuthenticated() ? <SignSubmit signs={data} /> : <NoLogin />}
		<WechatSign />
		<SignList signs={data} />
	</main>
}