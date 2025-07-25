import { useAxios } from "@/hooks/useAxios"
import { useMutation } from "@tanstack/react-query"

//图片上传
export const useUploadImageMutation = () => {
	const { axios } = useAxios()
	return useMutation({
		mutationFn: async (file: File) => {
			const formData = new FormData()
			formData.append('file', file)
			const response = await axios.post('/upload/image', formData)
			return response.data
		}
	})
}