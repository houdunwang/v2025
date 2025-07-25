import { useConfig } from '@/hooks/useConfig'

export const Footer = () => {
	const { config } = useConfig()
	return (
		<main className='py-12 text-center text-sm'>
			<div className='text-sm text-accent-foreground'>扶我青云志，我自踏雪至山巅，加油少年！</div>
			<div className='text-xs text-muted-foreground'>晚八点直播 欢迎来到直播间交流</div>
			<div className='text-muted-foreground font-light'>{config('common').app_icp}</div>
			<div className='text-muted-foreground font-light'>{config('common').copyright}</div>
		</main>
	)
}
