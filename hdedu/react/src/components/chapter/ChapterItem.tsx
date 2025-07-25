import { Link } from '@tanstack/react-router'
import { FC } from 'react'
import { Badge } from '../ui/badge'
import { IChapter } from '@/type/chapter'
interface Props {
	chapter: IChapter
}
export const ChapterItem: FC<Props> = ({ chapter }) => {
	return (
		<main className="bg-background border rounded-lg overflow-hidden flex flex-col">
			<Link to="/chapter/$id" params={{ id: chapter.id }} className='cursor-pointer overflow-hidden flex'>
				<img src={chapter.preview} className='hover:scale-125 duration-700' />
			</Link>
			<Link to="/chapter/$id" params={{ id: chapter.id }} className='px-3 pt-3 flex truncate'>
				{chapter.title}
			</Link>
			<div className='px-3 font-light text-muted-foreground text-xs line-clamp-2 flex-1'>
				{chapter.description}
			</div>
			<div className='px-3 py-2 text-xs border-t mt-3 flex justify-between items-center'>
				<div><Badge variant="outline">89</Badge>个视频</div>
			</div>
		</main>
	)
}
