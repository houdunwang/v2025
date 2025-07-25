import { useAxios } from "@/hooks/useAxios"
import { useMutation } from "@tanstack/react-query"

//生成微信支付二维码
export const useGetWxPayQrCodeMutation = () => {
	const { axios } = useAxios()
	return useMutation({
		mutationFn: async (order: number) => {
			const res = await axios.post(`pay/wepay/${order}`, {}, {
				responseType: 'blob'
			})
			return res.data;
		}
	})
}