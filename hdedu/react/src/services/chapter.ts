import { useAxios } from "@/hooks/useAxios";
import { IChapter } from "@/type/chapter";
import { IPaginate } from "@/type/paginate";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

//获取章节详情
export const useGetChapterQuery = (id: number) => {
	const { axiosInstance } = useAxios()
	return useQuery<IChapter, AxiosError>({
		queryKey: ['chapter', id],
		queryFn: async () => (await axiosInstance.get(`/chapter/${id}`)).data
	})
}

//获取章节列表
export const useGetChapterListQuery = (page: number) => {
	const { axiosInstance } = useAxios()
	return useQuery<IPaginate<IChapter>, AxiosError>({
		queryKey: ['chapterList', page],
		queryFn: async () => (await axiosInstance.get(`/chapter?page=${page}`)).data
	})
}

//更改章节顺序
export const useUpdateChapterOrderMutation = () => {
	const { axiosInstance } = useAxios()
	return useMutation({
		mutationFn: async (data: IChapter[]) => {
			await axiosInstance.put(`/chapter/sort`, { data })
		}
	})
}

//添加章节
export const useAddChapterMutation = () => {
	const { axiosInstance } = useAxios()
	return useMutation({
		mutationFn: async (data: Partial<IChapter>) => {
			await axiosInstance.post(`/chapter`, data)
		}
	})
}

//修改章节 
export const useUpdateChapterMutation = () => {
	const { axiosInstance } = useAxios()
	return useMutation({
		mutationFn: async (data: Partial<IChapter>) => {
			await axiosInstance.put(`/chapter/${data.id}`, data)
		}
	})
}

//删除章节
export const useDeleteChapterMutation = () => {
	const { axiosInstance } = useAxios()
	return useMutation({
		mutationFn: async (id: number) => {
			await axiosInstance.delete(`/chapter/${id}`)
		}
	})
}