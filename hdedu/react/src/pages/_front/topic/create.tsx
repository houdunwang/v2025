import { createFileRoute } from '@tanstack/react-router';
import { Form } from './-components/Form';

export const Route = createFileRoute('/_front/topic/create')({
	component: RouteComponent,
})

function RouteComponent() {
	const defaultValues = { title: '', content: '' };
	return <Form defaultValues={defaultValues} />
}
