import { Button } from '@/components/ui/button'
import { useUpdateVideoSortMutation } from '@/services/video'
import { IChapter } from '@/type/chapter'
import { IVideo } from '@/type/video'
import { AlignTextBoth } from '@icon-park/react'
import { Link } from '@tanstack/react-router'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { ReactSortable } from "react-sortablejs"

export const VideoList = ({ videos, chapter, currentChapterId }: { videos: IVideo[], chapter: IChapter, currentChapterId: number }) => {
	const [videoList, setVideoList] = useState(videos)
	const orderMutation = useUpdateVideoSortMutation()
	useEffect(() => {
		setVideoList(videos)
	}, [chapter])
	return <div>
		<ReactSortable list={videoList} setList={(newList) => {
			const isSort = newList.some((item, index) => item.id !== videos[index].id)
			if (isSort) {
				setVideoList(newList)
				orderMutation.mutate(newList)
			}
		}}>
			{videoList.map((video, index) => (
				<div key={video.id} className={
					classNames('text-xs text-muted-foreground bg-gray-100 border-t pl-2 flex justify-between items-center', {
						'hidden': currentChapterId !== chapter.id,
					})
				}>
					<div className='flex items-center'>
						<AlignTextBoth theme="outline" size="20" strokeWidth={2} />
						<div className='py-2 px-3 '>
							第{index + 1}课
							<div>{video.title}</div>
						</div>
					</div>
					<Link to="/video/$id" params={{ id: video.id }} target='_blank'>
						<Button variant="outline" size={'sm'}>查看视频</Button>
					</Link>
				</div>
			))}
		</ReactSortable>
	</div>
}
