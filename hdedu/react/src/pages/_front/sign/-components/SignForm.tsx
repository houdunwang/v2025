import { FieldValidate } from '@/components/common/FieldValidate'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useAddSignMutation } from '@/services/sign'
import { useForm } from '@tanstack/react-form'
import classNames from 'classnames'

const emojis = [
	"ch",
	"fd",
	"kx",
	"ng",
	"nu",
	"shuai",
	"wl",
	"yl",
	"ym",
]
export const SignForm = () => {
	const addSignMutation = useAddSignMutation()
	const form = useForm({
		defaultValues: {
			content: '',
			mood: ''
		},
		onSubmit: ({ value }) => {
			addSignMutation.mutate(value, {
				onSuccess: () => {
					form.reset()
				}
			})
		}
	})
	return (
		<form onSubmit={e => {
			e.preventDefault()
			e.stopPropagation()
			form.handleSubmit()
		}}>
			<Card>
				<CardHeader>
					<CardTitle>签到快乐，再接再厉</CardTitle>
					{/* <CardDescription>Card Description</CardDescription> */}
				</CardHeader>
				<CardContent>
					<form.Field name="content" children={field => (
						<div>
							<Input placeholder='你今天的心情或最想说的话...' value={field.state.value} onChange={e => field.handleChange(e.target.value)} />
							<FieldValidate name="content" errors={field.state.meta.errors} />
						</div>
					)} />
					<form.Field name="mood" children={field => (
						<div>
							<div className='flex gap-2 items-center'>
								{emojis.map(emoji => (
									<div className={classNames('bg-muted rounded-lg border-4 group cursor-pointer', {
										'border-primary': field.state.value == emoji
									})} onClick={() => {
										field.handleChange(emoji)
									}}>
										<img src={`/assets/emoji/${emoji}.gif`} className='w-10 h-10 group-hover:scale-150 duration-500' />
									</div>
								))}
							</div>
							<FieldValidate name="mood" errors={field.state.meta.errors} />
						</div>
					)} />
					{/* <CardFooter> */}
					<Button variant="default" className='mt-3'>开始签到</Button>
					{/* </CardFooter> */}
				</CardContent>
			</Card>
		</form>
	)
}
