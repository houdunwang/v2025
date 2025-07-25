import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { RcUpload } from '@/components/upload/RcUpload'
import { IChapter } from '@/type/chapter'
import { IVideo } from '@/type/video'
import { useQueryClient } from '@tanstack/react-query'
import { FC, useState } from 'react'
import BarLoader from "react-spinners/BarLoader"

interface Props {
	chapter: IChapter
}
type IVideoType = Partial<IVideo> & { finish: boolean, uid?: string }
export const VideoManage: FC<Props> = ({ chapter }) => {
	const [videos, setVideos] = useState<IVideoType[]>(chapter.videos.map(v => ({ ...v, finish: true })))
	const queryClient = useQueryClient()
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="outline" size={'sm'}>视频管理</Button>
			</SheetTrigger>
			<SheetContent side={'top'}>
				<SheetHeader>
					<SheetTitle>视频管理 / {chapter.title}</SheetTitle>
					<SheetDescription> </SheetDescription>
				</SheetHeader>
				<RcUpload<IVideoType> action={`video/upload/${chapter.id}`}
					accept='.mp4'
					onStart={(file) => {
						setVideos(videos => ([...videos, { title: file.name, finish: false, uid: file.uid }]))
					}}
					onSuccess={(_data, file) => {
						const video = videos.find(v => v.uid == file.uid)!
						video.finish = true
						setVideos([...videos])
						queryClient.invalidateQueries({ queryKey: ['lessonData'], exact: false })
					}} />
				{videos.length == 0 ? <div className='border p-3 text-center mt-3 rounded-lg'>
					暂无视频
				</div> : <VideoList videos={videos} />}

			</SheetContent>
		</Sheet>
	)
}

function VideoList({ videos }: { videos: IVideoType[] }) {
	return <div className="grid grid-cols-5 gap-2 p-3  border rounded-lg mt-3">
		{videos.map(video => (
			<div key={video.id}>
				<Input value={video.title} className='rounded-none' />
				{video.finish || <BarLoader width={'100%'} height={1} />}
			</div>
		))}
	</div>
}
