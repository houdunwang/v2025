import { useAxios } from "@/hooks/useAxios"
import { IDynamic } from "@/type/dynamic"
import { IPaginate } from "@/type/paginate"
import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import qs from 'qs'

//获取网站动态数据
export const useGetDynamicListQuery = (params: { page?: number }) => {
	const { axiosInstance } = useAxios()
	return useQuery<IPaginate<IDynamic>, AxiosError>({
		queryKey: ["useGetDynamicListQuery", ...Object.values(params)],
		queryFn: async () => {
			const response = await axiosInstance.get(`/dynamic?` + qs.stringify(params))
			return response.data
		}
	})
}