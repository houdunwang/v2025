import { ChapterItem } from '@/components/chapter/ChapterItem'
import { Loading } from '@/components/common/Loading'
import { Error } from '@/components/error/Error'
import { DownloadLesson } from '@/components/lessson/DownloadLesson'
import { AliPay } from '@/components/pay/AliPay'
import { WechatPay } from '@/components/pay/WechatPay'
import { Badge } from '@/components/ui/badge'
import { useGetLessonData } from '@/services/lesson'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_front/lesson/show/$id')({
	component: RouteComponent,
	params: {
		parse: ({ id }) => {
			return { id: Number(id) }
		}
	}
})

function RouteComponent() {
	const { id } = Route.useParams()
	const { isPending, isError, error, data: lesson } = useGetLessonData(id)
	if (isPending) return <Loading />
	if (isError) return <Error error={error} />
	return <main className=" -mt-6 ">
		<section className='py-12 bg-accent-foreground'>
			<div className="2xl:w-7xl mx-auto ">
				<div className="text-muted">
					<h1 className='text-2xl mb-3 flex items-center gap-2'>
						<Badge variant="default"> 课程 </Badge> {lesson.title}
					</h1>
					<div className='font-light'>{lesson.description}</div>
				</div>
				<div className='mt-6 flex items-center gap-3'>
					<DownloadLesson lesson={lesson} />
					{lesson.isBuy || <><AliPay modelName='lesson' modelId={lesson.id} title='每一个课程都精心录制'
						description={`你正要购买的课程是：${lesson.title}`} />
						<WechatPay modelName='lesson' modelId={lesson.id} title='每一个课程都精心录制'
							description={`你正要购买的课程是：${lesson.title}`} />
					</>
					}
				</div>
			</div>
		</section>
		<section className='bg-white p-6 rounded-lg xl:w-7xl m-auto mt-6 grid grid-cols-4 gap-3'>
			{lesson.chapters.map(chapter => (
				<ChapterItem chapter={chapter} key={chapter.id} />
			))}
		</section>
	</main>
}
