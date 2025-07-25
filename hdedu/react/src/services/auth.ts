import { useAxios } from "@/hooks/useAxios"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import { toast } from "sonner"

export const useLoginMutation = () => {
	const { axiosInstance } = useAxios()
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: async (data: { account: string, password: string }) => {
			const response = await axiosInstance.post('/auth/login', data)
			return response.data
		},
		onSuccess: () => {
			toast.success('登录成功', { position: 'top-center' })
			queryClient.invalidateQueries({ queryKey: ['useGetCurrentUserQuery'] })
			location.href = localStorage.getItem('redirectUrl') || '/'
			// navigate({ to: '/' })
		}
	})
}

//退出登录
export const useLogoutMutation = () => {
	const { axiosInstance } = useAxios()
	const navigate = useNavigate()
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async () => {
			const response = await axiosInstance.post('/auth/logout')
			return response.data
		},
		onSuccess: () => {
			toast.info('退出登录成功')
			queryClient.invalidateQueries({ queryKey: ['useGetCurrentUserQuery'] })
			navigate({ to: '/' })
		}
	})
}

//用户注册
export const useRegisterMutation = <T>() => {
	const { axiosInstance } = useAxios()
	const navigate = useNavigate()
	return useMutation({
		mutationFn: async (data: T) => {
			const response = await axiosInstance.post('/auth/register', data)
			toast('注册成功');
			navigate({ to: '/auth/login' })
			return response.data
		},
	})
}

//找回密码
export const useFindPasswordMutation = <T>() => {
	const { axiosInstance } = useAxios()
	const navigate = useNavigate()
	return useMutation({
		mutationFn: async (data: T) => {
			const response = await axiosInstance.post('/auth/findPassword/email', data)
			toast('找回密码成功');
			navigate({ to: '/auth/login' })
			return response.data
		},
	})
}