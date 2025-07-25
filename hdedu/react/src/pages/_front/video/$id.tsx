import { ChapterDownList } from '@/components/chapter/ChapterDownList';
import { CommentList } from '@/components/comment/CommentList';
import { Loading } from '@/components/common/Loading';
import { VideoPlay } from '@/components/common/VideoPlay';
import { Error } from '@/components/error/Error';
import { DownloadLesson } from '@/components/lessson/DownloadLesson';
import { Button } from '@/components/ui/button';
import { VideoItem } from '@/components/video/VideoItem';
import { useGetVideoQuery } from '@/services/video';
import { Book, Right } from '@icon-park/react';
import { createFileRoute, Link, redirect } from '@tanstack/react-router';
import classNames from 'classnames';
import { useEffect } from 'react';
import { toast } from 'sonner';

export const Route = createFileRoute('/_front/video/$id')({
	component: RouteComponent,
	beforeLoad: ({ context }) => {
		if (!context.auth.isAuthenticated()) {
			toast('请登录后操作')
			throw redirect({ to: '/auth/login' })
		}
	},
	params: {
		parse: ({ id }: Record<string, unknown>) => {
			return { id: Number(id) }
		}
	}
})

function RouteComponent() {
	const { id } = Route.useParams();
	const { isPending, isError, error, data: video } = useGetVideoQuery(id)
	useEffect(() => {
		// console.log(video);
		if (video) {
			const el = document.querySelector(`#video-${id}`)
			el?.scrollIntoView({ behavior: 'smooth', block: 'end' })
		}
	}, [id, video])
	if (isPending) return <Loading />
	if (isError) return <Error error={error} />
	if (!video.path) return <NoSubscribe />
	return <main className="-mt-6">
		<section className='bg-accent-foreground '>
			<div className='xl:w-7xl mx-auto grid grid-cols-[1fr_300px]'>
				<VideoPlay url={video.path} />
				<div className='bg-muted p-3 relative'>
					<h2>视频列表</h2>
					<div className="absolute left-0 top-10 right-0 bottom-0 overflow-y-auto px-3">
						{video.chapter.videos.map(v => (
							<div id={`video-${v.id}`}>
								<VideoItem video={v} showTime={false} className={
									classNames('text-sm', {
										'text-primary': video.id == v.id
									})
								} />
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
		<section className='xl:w-7xl mx-auto bg-white p-6 rounded-lg mt-3 flex justify-between'>
			<div>
				<h2>{video.title}</h2>
				<div className='flex items-center gap-1 text-muted-foreground font-light text-sm mt-2'>
					<Book theme="outline" size="15" fill="#333" />
					<Link to='/lesson/show/$id' params={{ id: video.lesson_id }} >{video.lesson.title}</Link>
					<Right theme="outline" size="15" fill="#333" />
					<Link to='/chapter/$id' params={{ id: video.chapter_id }} >{video.chapter.title}</Link>
				</div>
			</div>
			<div className='flex items-center gap-2'>
				<DownloadLesson lesson={video.lesson} />
				<ChapterDownList chapters={video.lesson.chapters} />
			</div>
		</section>
		<CommentList modelName='Video' modelId={video.id} />
	</main>
}

function NoSubscribe() {
	return <div className='flex flex-col justify-center items-center bg-white rounded-3xl border py-20 2xl:w-7xl mx-auto gap-6'>
		<div className='text-7xl font-bold text-primary'>
			投资学习是值得的
		</div>
		<Link to='/subscribe'>
			<Button variant="default" size={'lg'}>订阅后马上开始学习</Button>
		</Link>
	</div>
}