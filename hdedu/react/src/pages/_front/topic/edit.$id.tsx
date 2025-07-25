import { createFileRoute } from '@tanstack/react-router'
import { Form } from './-components/Form';
import { useGetTopicQuery } from '@/services/topic';
import { Loading } from '@/components/common/Loading';
import { Error } from '@/components/error/Error';

export const Route = createFileRoute('/_front/topic/edit/$id')({
  component: RouteComponent,
  params: {
    parse: ({ id }) => {
      return { id: Number(id) }
    }
  }
})

function RouteComponent() {
  const { id } = Route.useParams()
  const { isPending, isError, error, data: topic } = useGetTopicQuery(id)
  if (isPending) return <Loading />
  if (isError) return <Error error={error} />
  return <Form defaultValues={topic} />
}
