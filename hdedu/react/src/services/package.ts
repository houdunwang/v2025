import { useAxios } from "@/hooks/useAxios"
import { IPackage } from "@/type/package"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import qs from 'qs'
//获取套餐列表
export const useGetPackageListQuery = (params: Record<string, string> = {}) => {
	const { axiosInstance } = useAxios()
	return useQuery<IPackage[], AxiosError>({
		queryKey: ["useGetPackageListQuery", ...Object.values(params)],
		queryFn: async () => {
			const response = await axiosInstance.get(`/package?` + qs.stringify(params))
			return response.data
		},
	})
}

//添加套餐
export const useAddPackageMutation = () => {
	const { axiosInstance } = useAxios()
	return useMutation({
		mutationFn: async (data: Partial<IPackage>) => {
			const response = await axiosInstance.post(`/package`, data)
			return response.data
		}
	})
}

//修改套餐
export const useUpdatePackageMutation = () => {
	const { axiosInstance } = useAxios()
	return useMutation({
		mutationFn: async (data: Partial<IPackage>) => {
			const response = await axiosInstance.put(`/package/${data.id}`, data)
			return response.data
		}
	})
}

//删除套餐
export const useDeletePackageMutation = () => {
	const { axiosInstance } = useAxios()
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: async (id: number) => {
			const response = await axiosInstance.delete(`/package/${id}`)
			return response.data
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['useGetPackageListQuery'], exact: false })
		}
	})
}