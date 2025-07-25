import { useValidateStroe } from "@/store/useValidateStore";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

export const useAxios = () => {
	const setErrors = useValidateStroe(s => s.setErrors)
	const resetErrors = useValidateStroe(s => s.resetErrors)
	const axiosInstance = axios.create({
		baseURL: '/hd',
		timeout: 10000,
		// headers: { 'X-Custom-Header': 'foobar' }
	});

	// 添加请求拦截器
	axiosInstance.interceptors.request.use(function (config) {
		// 在发送请求之前做些什么
		resetErrors()
		return config;
	}, function (error) {
		// 对请求错误做些什么
		return Promise.reject(error);
	});

	// 添加响应拦截器
	axiosInstance.interceptors.response.use(function (response) {
		// 2xx 范围内的状态码都会触发该函数。
		// 对响应数据做点什么
		return response;
	}, function (error: AxiosError) {
		const data = error.response?.data as any
		const message = data?.message || ''
		switch (error.status) {
			case 422: {
				setErrors(data.errors)
				break;
			}
			case 403: {
				toast('没有操作权限')
				break;
			}
			case 429:
				toast(message || '操作过于频繁')
				break;

		}
		// 超出 2xx 范围的状态码都会触发该函数。
		// 对响应错误做点什么
		return Promise.reject(error);
	});
	return { axiosInstance, axios: axiosInstance }
}