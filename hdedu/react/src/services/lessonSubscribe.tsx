import { useAxios } from "@/hooks/useAxios"
import { ILesson } from "@/type/lesson"
import { IPaginate } from "@/type/paginate"
import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"

//获取课程订阅状态
export const useGetLessonSubscribeQuery = () => {
	const { axiosInstance } = useAxios()
	return useQuery<IPaginate<ILesson>, AxiosError>({
		queryKey: ["useGetLessonSubscribeQuery"],
		queryFn: async () => {
			const response = await axiosInstance.get(`/user/lesson/subscribe`)
			return response.data
		},
	})
}