import { useAxios } from "@/hooks/useAxios"
import { INotification } from "@/type/notification"
import { IPaginate } from "@/type/paginate"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import qs from 'qs'
//获取通知列表
export function useNotificationListQuery(params: { page?: number }) {
	const { axiosInstance } = useAxios()
	return useQuery<IPaginate<INotification>, AxiosError>({
		queryKey: ["useNotificationListQuery", ...Object.values(params)],
		queryFn: async () => {
			const response = await axiosInstance.get(`/notification?` + qs.stringify(params))
			return response.data
		}
	})
}

//读取通知
export const useReadNotificationMutation = () => {
	const { axios } = useAxios()
	return useMutation({
		mutationFn: async (id: string) => {
			return await axios.get(`/notification/${id}`)
		},
	})
}

//删除所有已读通知
export const useDeleteAllReadNotificationMutation = () => {
	const { axios } = useAxios()
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: async () => {
			await axios.delete(`/notification/delete_all`)
			queryClient.invalidateQueries({ key: ['useNotificationListQuery'], exact: false })
		},
	})
}

//删除通知
export const useNotificationMutation = () => {
	const { axios } = useAxios()
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: async (id: string) => {
			await axios.delete(`/notification/${id}`)
			queryClient.invalidateQueries({ key: ['useNotificationListQuery'], exact: false })
		},
	})
}