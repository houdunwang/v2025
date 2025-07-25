import { useAxios } from "@/hooks/useAxios"
import { IPaginate } from "@/type/paginate"
import { IVideo } from "@/type/video"
import { useMutation, useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"

//获取视频详细数据
export const useGetVideoQuery = (id: number) => {
	const { axios } = useAxios()
	return useQuery<IVideo, AxiosError>({
		queryKey: ['useGetVideoQuery', id],
		queryFn: async () => (await axios.get(`/video/${id}`)).data
	})
}

export const useGetVideoListQuery = (page: number) => {
	const { axios } = useAxios()
	return useQuery<IPaginate<IVideo>, AxiosError>({
		queryKey: ['useGetVideoListQuery', page],
		queryFn: async () => (await axios.get(`/video?page=${page}`)).data
	})
}

//更新视频排序
export const useUpdateVideoSortMutation = () => {
	const { axios } = useAxios()
	return useMutation({
		mutationFn: async (data: IVideo[]) => (await axios.put(`/video/order`, { data }))
	})
}