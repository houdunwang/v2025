import { useAxios } from "@/hooks/useAxios";
import { ILesson } from "@/type/lesson";
import { IPaginate } from "@/type/paginate";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import qs from 'qs';

//获取课程列表
export function useGetLessonList(params: { type?: string, page?: number, row?: number }) {
	const { axiosInstance } = useAxios()
	return useQuery<IPaginate<ILesson>, AxiosError>({
		queryKey: ["lessonList", ...Object.values(params)],
		queryFn: async () => {
			const response = await axiosInstance.get(`/lesson?` + qs.stringify(params))
			return response.data
		},
	})
}

//获取课程数据
export function useGetLessonData(id: number) {
	const { axiosInstance } = useAxios()
	return useQuery<ILesson, AxiosError>({
		queryKey: ["lessonData", id],
		queryFn: async () => {
			const response = await axiosInstance.get(`/lesson/${id}`)
			return response.data
		}
	})
}

//添加课程
export function useAddLessonMutation() {
	const { axiosInstance } = useAxios()
	return useMutation({
		mutationFn: async (data: Partial<ILesson>) => {
			const response = await axiosInstance.post(`/lesson`, data)
			return response.data
		}
	})
}

//更新课程
export function useUpdateLessonMutation() {
	const { axiosInstance } = useAxios()
	return useMutation({
		mutationFn: async (data: Partial<ILesson>) => {
			const response = await axiosInstance.put(`/lesson/${data.id}`, data)
			return response.data
		}
	})
}

//删除课程
export function useDeleteLessonMutation() {
	const { axiosInstance } = useAxios()
	return useMutation({
		mutationFn: async (id: number) => {
			const response = await axiosInstance.delete(`/lesson/${id}`)
			return response.data
		}
	})
}