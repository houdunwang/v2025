import { useAxios } from "@/hooks/useAxios"
import { IPaginate } from "@/type/paginate"
import { ISign } from "@/type/sign"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { toast } from "sonner"

//获取签到列表
export const useGetSignListQuery = () => {
	const { axios } = useAxios()
	return useQuery<ISign[], AxiosError>({
		queryKey: ['useGetSignListQuery'],
		queryFn: async () => {
			return (await axios.get('/sign')).data
		}
	})
}


//获取签到列表
export const useGetUserSignListQuery = (userId: number) => {
	const { axios } = useAxios()
	return useQuery<IPaginate<ISign>, AxiosError>({
		queryKey: ['useGetUserSignListQuery'],
		queryFn: async () => {
			const response = await axios.get(`/sign/userSignList/${userId}`)
			return response.data
		}
	})
}


//发表签到
export const useAddSignMutation = () => {
	const { axios } = useAxios();
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: async (data: Pick<ISign, 'content' | 'mood'>) => {
			const response = await axios.post('sign', data)
			queryClient.invalidateQueries({ queryKey: ['useGetSignListQuery'] })
			return response.data
		}

	})
}

//删除
export const useDeleteSignMutation = () => {
	const { axios } = useAxios();
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: async (id: number) => {
			await axios.delete(`sign/${id}`)
			queryClient.invalidateQueries({ queryKey: ['useGetSignListQuery'] })
		},
		onSuccess: () => {
			toast('删除成功')
		}
	})
}