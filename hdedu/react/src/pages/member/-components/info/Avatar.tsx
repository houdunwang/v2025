import { RcUpload } from '@/components/upload/RcUpload'
import { useAuth } from '@/hooks/useAuth'
import { useUpdateUserMutation } from '@/services/user'

export const Avatar = () => {
	const { user, getAllFields } = useAuth()
	const updateUserMutation = useUpdateUserMutation()

	return (
		<main className="">
			<div className="w-52 rounded-lg overflow-hidden">
				<RcUpload action="/user/upload/avatar" onSuccess={(data) => {
					updateUserMutation.mutate({ ...getAllFields(), avatar: data.url })
				}} accept='.jpeg,.png,.jpg' >
					<img src={user('avatar')} className='w-52 ' />
				</RcUpload>
				<div className='text-center text-muted-foreground text-sm mt-2'>请点击图片上传图像</div>
			</div>
		</main>
	)
}
