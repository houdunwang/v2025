import { Button } from '@/components/ui/button'
import { useDeleteChapterMutation, useUpdateChapterOrderMutation } from '@/services/chapter'
import { IChapter } from '@/type/chapter'
import { ILesson } from '@/type/lesson'
import { Down, Right } from '@icon-park/react'
import { Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { ReactSortable } from "react-sortablejs"
import { VideoList } from './VideoList'
import { toast } from 'sonner'
import { Form } from './Form'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { useQueryClient } from '@tanstack/react-query'
import { VideoManage } from './VideoManage'


export const ChapterList = ({ lesson, currentChapterId, setCurrentChapterId }: { lesson: ILesson, currentChapterId: number, setCurrentChapterId: (id: number) => void }) => {
	const [chapters, setChapters] = useState<IChapter[]>(lesson.chapters)
	const orderMutation = useUpdateChapterOrderMutation()
	useEffect(() => {
		setChapters(lesson.chapters)
	}, [lesson])
	return <main className="">
		<ReactSortable list={chapters} setList={newList => {
			setChapters(newList)
			const isSort = newList.some((item, index) => item.id != chapters[index].id)
			if (isSort) {
				setChapters(newList)
				orderMutation.mutate(newList, {
					onSuccess: () => {
						// toast('排序成功')
					}
				})
			}
		}}>
			{chapters.map(chapter => (
				<div key={chapter.id}>
					<div key={chapter.id} className='py-3 border-t flex justify-between cursor-pointer hover:bg-gray-100' onClick={() => {
						setCurrentChapterId(chapter.id === currentChapterId ? 0 : chapter.id)
					}}>
						<div className='flex items-center'>
							{currentChapterId === chapter.id ?
								<Down theme="outline" size="20" strokeWidth={3} />
								: <Right theme="outline" size="20" strokeWidth={3} />}
							{chapter.title}
						</div>
						<div className='flex gap-1' onClick={e => {
							e.stopPropagation()
						}}>
							<Link to={'/chapter/$id'} params={{ id: chapter.id }} target='_blank'>
								<Button variant="outline" size={'sm'}>前台效果</Button>
							</Link>
							<DelChapter chapter={chapter} />
							<Form chapter={chapter} lesson={lesson} />
							<VideoManage chapter={chapter} />
						</div>
					</div>
					<VideoList videos={chapter.videos} chapter={chapter} currentChapterId={currentChapterId} />
				</div>
			))}
		</ReactSortable>
	</main>
}

function DelChapter({ chapter }: { chapter: IChapter }) {
	const delMutation = useDeleteChapterMutation()
	const queryClient = useQueryClient()
	return <AlertDialog>
		<AlertDialogTrigger asChild>
			<Button variant="outline" size={'sm'}>删除</Button>
		</AlertDialogTrigger>
		<AlertDialogContent>
			<AlertDialogHeader>
				<AlertDialogTitle>确定删除章节吗？</AlertDialogTitle>
				<AlertDialogDescription>
					{chapter.title}
				</AlertDialogDescription>
			</AlertDialogHeader>
			<AlertDialogFooter>
				<AlertDialogCancel>放弃</AlertDialogCancel>
				<AlertDialogAction onClick={() => {
					delMutation.mutate(chapter.id, {
						onSuccess: () => {
							queryClient.invalidateQueries({ queryKey: ['lessonData'], exact: false })
							toast('删除成功')
						}
					})
				}}>删除</AlertDialogAction>
			</AlertDialogFooter>
		</AlertDialogContent>
	</AlertDialog>
}
