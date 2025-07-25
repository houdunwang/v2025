import { ILesson } from '@/type/lesson'
import { Link } from '@tanstack/react-router'
import { FC, PropsWithChildren } from 'react'
import { Badge } from '../ui/badge'
interface Props {
	lesson: ILesson
}
export const LessonItem: FC<PropsWithChildren<Props>> = ({ lesson, children }) => {
	return (
		<main className="bg-background border rounded-lg overflow-hidden group">
			<Link to="/lesson/show/$id" params={{ id: lesson.id }} className='cursor-pointer overflow-hidden flex'>
				<img src={lesson.preview} className='hover:scale-125 duration-700' />
			</Link>
			<Link to="/lesson/show/$id" params={{ id: lesson.id }} className='px-3 pt-3 flex truncate'>
				{lesson.title}
			</Link>
			<div className='px-3 font-light text-muted-foreground text-xs line-clamp-2'>
				{lesson.description}
			</div>
			<div className='px-3 py-2 text-xs border-t mt-3 flex justify-between items-center'>
				<div><Badge variant="outline">8</Badge>个章节</div>
				{children}
				<div><Badge variant="outline">89</Badge>个视频</div>
			</div>
		</main>
	)
}
