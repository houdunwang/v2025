import { useAxios } from "@/hooks/useAxios"
import { IPaginate } from "@/type/paginate"
import { ITopic } from "@/type/topic"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import { AxiosError } from "axios"
import { toast } from "sonner"
import qs from 'qs'

//获取话题列表
export const useGetTopicListQuery = (params: { page?: number, uid?: number }) => {
	const { axios } = useAxios()
	return useQuery<IPaginate<ITopic>, AxiosError>({
		queryKey: ['topicList', ...Object.values(params)],
		queryFn: async () => (await axios.get(`/topic?` + qs.stringify(params))).data,
	})
}

//话题详情
export const useGetTopicQuery = (id: number) => {
	const { axios } = useAxios()
	return useQuery<ITopic, AxiosError>({
		queryKey: ['useGetTopicQuery', id],
		queryFn: async () => (await axios.get(`/topic/${id}`)).data,
	})
}

//发表话题
export const useAddTopicMutation = () => {
	const { axios } = useAxios()
	return useMutation({
		mutationFn: async (data: Partial<ITopic>) => (await axios.post('/topic', data)).data
	})
}

//更新话题
export const useUpdateTopicMutation = () => {
	const { axios } = useAxios()
	return useMutation({
		mutationFn: async (data: Partial<ITopic>) => (await axios.put(`/topic/${data.id}`, data)).data
	})
}

//删除话题
export const useDeleteTopicMutation = () => {
	const { axios } = useAxios()
	const navigate = useNavigate()
	return useMutation({
		mutationFn: async (id: number) => (await axios.delete(`/topic/${id}`)),
		onSuccess: () => {
			toast('删除成功');
			navigate({ to: '/topic' })
		}
	})
}