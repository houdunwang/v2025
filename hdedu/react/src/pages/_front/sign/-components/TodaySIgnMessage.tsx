import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ISign } from '@/type/sign'
import dayjs from 'dayjs'
import { FC } from 'react'

export const TodaySIgnMessage: FC<{ sign: ISign }> = ({ sign }) => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>今天已经签到了</CardTitle>
				{/* <CardDescription>Card Description</CardDescription> */}
			</CardHeader>
			<CardContent className=''>
				<div className='flex items-center'>
					<img src={`/assets/emoji/${sign.mood}.gif`} alt="" />
					{sign.content}
				</div>
				<div className='text-sm mt-3'>
					签到时间： {dayjs(sign.created_at).format('HH:mm:ss')} <br />
					总签到次数:{sign.sign_count.total} 次 <br />
					年签到次数: {sign.sign_count.year} 次 <br />
					月签到次数: {sign.sign_count.month}次 <br />
				</div>
			</CardContent>
		</Card>
	)
}
