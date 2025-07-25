import { ChapterItem } from '@/components/chapter/ChapterItem'
import { Loading } from '@/components/common/Loading'
import { Error } from '@/components/error/Error'
import { DownloadLesson } from '@/components/lessson/DownloadLesson'
import { AliPay } from '@/components/pay/AliPay'
import { WechatPay } from '@/components/pay/WechatPay'
import { Badge } from '@/components/ui/badge'
import { VideoItem } from '@/components/video/VideoItem'
import { useGetChapterQuery } from '@/services/chapter'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_front/chapter/$id')({
  component: RouteComponent,
  params: {
    parse: ({ id }) => {
      return { id: Number(id) }
    }
  }
})

function RouteComponent() {
  const { id } = Route.useParams()
  const { isPending, isError, error, data: chapter } = useGetChapterQuery(id)
  if (isPending) return <Loading />
  if (isError) return <Error error={error} />
  return <main className=" -mt-6 ">
    <section className='py-12 bg-accent-foreground'>
      <div className="2xl:w-7xl mx-auto ">
        <div className="text-muted">
          <h1 className='text-2xl mb-3 flex items-center gap-2'>
            <Badge variant="default" className='bg-green-700 hover:bg-green-600'> 章节 </Badge> {chapter.title}
          </h1>
          <div className='font-light'>{chapter.description}</div>
        </div>
        <div className='mt-6 flex items-center gap-3'>
          <DownloadLesson lesson={chapter.lesson} />
          <AliPay modelId={chapter.lesson.id} modelName={'lesson'}
            title="每个课程都精心录制"
            description={`你正要购买的课程是：${chapter.lesson.title}`} />
          <WechatPay modelId={chapter.lesson.id} modelName={'lesson'}
            title="每个课程都精心录制"
            description={`你正要购买的课程是：${chapter.lesson.title}`} />
        </div>
      </div>
    </section>
    <section className='xl:w-7xl m-auto mt-6 grid grid-cols-[1fr_300px] gap-3'>
      <div className='bg-white p-6 rounded-lg '>
        <h2 className='mb-3'>视频列表 </h2>
        {chapter.videos.map(video => (
          <VideoItem key={video.id} video={video} />
        ))}
      </div>
      <div className='-mt-32'>
        <ChapterItem chapter={chapter} />
      </div>
    </section>
  </main>
}
