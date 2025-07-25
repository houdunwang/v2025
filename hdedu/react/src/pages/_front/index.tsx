import { Tip } from '@/components/common/Tip'
import { DynamicList } from '@/components/dynamic/DynamicList'
import { LearnList } from '@/components/learn/LearnList'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_front/')({
  component: RouteComponent,
})

function RouteComponent() {

  return <main className="xl:w-7xl mx-auto grid grid-cols-[1fr_350px] gap-3">
    <DynamicList />
    <div className='space-y-3'>
      <Tip />
      <LearnList />
    </div>
  </main>
}
