import { useAxios } from "@/hooks/useAxios"
import { useMutation, useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios";

//生成获取用户信息的二维码
interface IWechatUserInfoQr {
	ticket: string,
	image: string
}
export const useGetWechatUserInfoQrQuery = () => {
	const { axios } = useAxios();
	return useQuery<IWechatUserInfoQr, AxiosError>({
		queryKey: ["getWechatUserInfoQr"],
		queryFn: async () => {
			return (await axios.post("wechat/qr/user_info")).data
		}
	})
}

//微信扫码登录
export const useWechatQrMutation = (action: string) => {
	const { axios } = useAxios();
	return useMutation<{ success: boolean, message: string }, AxiosError, { ticket: string }>({
		mutationFn: async (data) => {
			return (await axios.post(action, data)).data
		}
	})
}