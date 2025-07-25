import { useAxios } from "@/hooks/useAxios";
import { IComment } from "@/type/comment";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import qs from 'qs'

//获取评论列表
export const useGetCommentListQuery = (params: { modelName: string, modelId: number }) => {
	const { axios } = useAxios();
	return useQuery<IComment[], AxiosError>({
		queryKey: ['commentList', ...Object.values(params)],
		queryFn: async () => (await axios.get(`/comment?` + qs.stringify(params))).data
	})
}

export const useAddCommentMutation = () => {
	const { axios } = useAxios();
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: async (data: { modelName: string, modelId: number, content: string }) => {
			const response = await axios.post('/comment', data);
			queryClient.invalidateQueries({ queryKey: ['commentList'], stale: true })
			return response.data;
		}
	})
}

//删除评论
export const useDeleteCommentMutation = () => {
	const { axios } = useAxios();
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: async (id: number) => {
			await axios.delete(`/comment/${id}`);
			queryClient.invalidateQueries({ queryKey: ['commentList'], stale: true })
		}
	})
}