import { DisappointedFace } from '@icon-park/react'
import { AxiosError } from 'axios'

export const Error = ({ error }: { error: AxiosError }) => {
	switch (error.response?.status) {
		case 403:
			return <div>403</div>
		case 404:
		default:
			return <div className='flex items-center justify-center 2xl:w-7xl mx-auto bg-white py-20 border rounded-lg'>
				<DisappointedFace theme="outline" size="27" fill="#333" strokeWidth={3} /> 你访问的页面不存在
			</div>
	}

}
