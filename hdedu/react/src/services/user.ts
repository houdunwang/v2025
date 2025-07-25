import { useAxios } from "@/hooks/useAxios"
import { IUser } from "@/type/user"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { toast } from "sonner"

export const useGetCurrentUserQuery = () => {
	const { axiosInstance } = useAxios()
	return useQuery<IUser, AxiosError>({
		queryKey: ['useGetCurrentUserQuery',],
		queryFn: async () => {
			const response = await axiosInstance.get('/user/current')
			return response.data;
		}
	})
}

export const useGettUserQuery = (id: number) => {
	const { axiosInstance } = useAxios()
	return useQuery<IUser, AxiosError>({
		queryKey: ['useGettUserQuery'],
		queryFn: async () => {
			const response = await axiosInstance.get(`/user/info/${id}`)
			return response.data;
		}
	})
}

//更新用户资料
export const useUpdateUserMutation = () => {
	const { axiosInstance } = useAxios()
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: async (data: IUser) => {
			const response = await axiosInstance.put('/user', data)
			toast('资料更新成功')
			queryClient.invalidateQueries({ queryKey: ['useGetCurrentUserQuery'] });
			return response.data;
		}
	})
}

//更新用户密码
export const useUpdatePasswordMutation = <T>() => {
	const { axiosInstance } = useAxios()
	return useMutation({
		mutationFn: async (data: T) => {
			const response = await axiosInstance.put('/user/password', data)
			toast('密码更新成功')
			return response.data;
		}
	})
}

//绑定邮箱
export const useUpdateEmailMutation = <T>() => {
	const { axiosInstance } = useAxios()
	return useMutation({
		mutationFn: async (data: T) => {
			const response = await axiosInstance.post('user/bind/email', data)
			toast('邮箱绑定成功')
			return response.data;
		}
	})
}


//绑定邮箱
export const useUpdateMobileMutation = <T>() => {
	const { axiosInstance } = useAxios()
	return useMutation({
		mutationFn: async (data: T) => {
			const response = await axiosInstance.post('user/bind/mobile', data)
			toast('手机号绑定成功')
			return response.data;
		}
	})
}
