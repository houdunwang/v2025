import { Info } from '@icon-park/react'
import { FC, PropsWithChildren } from 'react'
interface Props {
	description?: string
}
export const MemberLayout: FC<PropsWithChildren<Props>> = ({ description, children }) => {
	return (
		<main>
			<Description description={description} />
			<div className="border p-3 rounded-sm">
				{children}
			</div>
		</main>
	)
}

function Description({ description }: { description?: string }) {
	if (!description) return;
	return <div className='text-muted-foreground bg-muted text-sm border px-3 py-2 rounded-md flex gap-2 items-center mb-3'>
		<Info /> {description}
	</div>
}
