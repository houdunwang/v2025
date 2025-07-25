import { IVideo } from '@/type/video'
import { Play } from '@icon-park/react'
import { Link } from '@tanstack/react-router'
import classNames from 'classnames'
import dayjs from 'dayjs'
import { FC } from 'react'

interface Props {
	video: IVideo,
	showTime?: boolean,
	className?: string
}
export const VideoItem: FC<Props> = ({ video, showTime = true, className }) => {
	return (
		<main className={classNames("flex justify-between items-center border-b ", className)}>
			<Link to="/video/$id" params={{ id: video.id }} className='truncate flex items-center gap-2 font-light py-2'>
				<Play theme="outline" size="12" fill="#333" />
				<div className='truncate'>{video.title}</div>
			</Link>
			{showTime &&
				<div className='text-xs font-light'>
					{dayjs(video.created_at).fromNow()}
				</div>
			}
		</main>
	)
}
