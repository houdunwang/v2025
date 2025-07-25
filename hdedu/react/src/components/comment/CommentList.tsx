import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CommentSubmit } from './CommentSubmit';
import { useGetCommentListQuery } from '@/services/comment';
import { FC, useEffect } from 'react';
import { Loading } from '../common/Loading';
import { Error } from '../error/Error';
import { CommentItem } from './CommentItem';
import { ContextProvider, useCommentContext } from '@/context/CommentContext';
import { useSearch } from '@tanstack/react-router';
interface Props {
	modelName: string,
	modelId: number
}
export const CommentList: FC<Props> = (params) => {
	return (
		<ContextProvider>
			<List {...params} />
		</ContextProvider>
	)
}

function List(params: Props) {
	const { commentId } = useSearch({ strict: false }) as { commentId: number }
	const { isPending, isError, error, data: comments } = useGetCommentListQuery(params)
	const { setModelName, setModelId } = useCommentContext()
	useEffect(() => {
		console.log(commentId);
		const commentElement = document.querySelector(`#comment${commentId}`)
		if (commentElement) {
			commentElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
		}
	}, [comments])
	useEffect(() => {
		setModelName(params.modelName)
		setModelId(params.modelId)
	}, [setModelName, setModelId, params.modelName, params.modelId])
	if (isPending) return <Loading />
	if (isError) return <Error error={error} />
	return <Card className='xl:w-7xl mx-auto mt-3'>
		<CardHeader>
			<CardTitle>交流讨论</CardTitle>
			<CardDescription>清晰的问题描述，可以更快的得到答案</CardDescription>
		</CardHeader>
		<CardContent>
			{comments.map(comment => (
				<div className='mt-2'>
					<div id={`comment${comment.id}`} key={comment.id}>
						<CommentItem comment={comment} />
					</div>
					{comment.replys.length > 0 &&
						<div className='bg-muted p-3 mt-2 ml-12 border'>
							{comment.replys.map(reply => (
								<div id={`comment${comment.id}`} key={reply.id}>
									<CommentItem comment={reply} />
								</div>
							))}
						</div>}
				</div>
			))}
		</CardContent>
		<CardFooter className='w-full'>
			<CommentSubmit />
		</CardFooter>
	</Card >
}
