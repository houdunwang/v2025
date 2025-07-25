import { useAxios } from "@/hooks/useAxios"
import { ILearn } from "@/type/learn"
import { IPaginate } from "@/type/paginate"
import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import qs from 'qs'

//获取学习记录
export function useLearnListQuery(params: { page?: number }) {
	const { axiosInstance } = useAxios()
	return useQuery<IPaginate<ILearn>, AxiosError>({
		queryKey: ["lessonList", ...Object.values(params)],
		queryFn: async () => {
			const response = await axiosInstance.get(`/learn?` + qs.stringify(params))
			return response.data
		}
	})
}