import { useAxios } from "@/hooks/useAxios";
import qs from 'qs'
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { IPaginate } from "@/type/paginate";
import { IOrder } from "@/type/order";

//获取网站订单列表
export const useGetOrderListQuery = (params: Record<string, any>) => {
	const { axios } = useAxios();
	return useQuery<IPaginate<IOrder>, AxiosError>({
		queryKey: ['orderList', ...Object.values(params)],
		queryFn: async () => {
			const res = (await axios.get('order?' + qs.stringify(params))).data;
			return res;
		},
	})
}

//统一下单
export const useCreateOrderMutation = () => {
	const { axios } = useAxios();
	return useMutation<IOrder, AxiosError, { modelName: string, modelId: number }>({
		mutationFn: async (data) => {
			const res = (await axios.post('order', data)).data;
			return res;
		},
	})
}