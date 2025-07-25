import { useAxios } from "@/hooks/useAxios"
import { IConfig } from "@/type/config"
import { useMutation, useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { toast } from "sonner"

//获取所有配置（管理员)
export const useGetConfigQuery = (type: 'all' | 'common') => {
	const { axiosInstance } = useAxios()
	return useQuery<IConfig, AxiosError>({
		queryKey: ["useGetConfigQuery", type],
		queryFn: async () => {
			const response = await axiosInstance.get(`/config/${type}`)
			return response.data
		}
	})
}

//保存配置项
export const useSaveConfigMutation = () => {
	const { axiosInstance } = useAxios()
	return useMutation({
		mutationFn: async (data: Record<string, any>) => {
			const response = await axiosInstance.put(`/config`, data)
			toast('配置项更新成功')
			return response.data
		}
	})
}