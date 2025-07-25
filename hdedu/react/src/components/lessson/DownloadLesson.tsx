import { ILesson } from '@/type/lesson'
import { DownloadOne } from '@icon-park/react'
import { FC } from 'react'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'

export const DownloadLesson: FC<{ lesson: ILesson }> = ({ lesson }) => {
	if (!lesson.download_address) return
	return (
		<Dialog>
			<DialogTrigger>	<Button variant={'outline'} size={'lg'} className='flex items-center'>
				<DownloadOne theme="outline" size="27" />高清视频
			</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>高清视频课程下载</DialogTitle>
					<DialogDescription>
						{lesson.download_address}
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>

	)
}
