import { Link } from '@tanstack/react-router'
import { Button } from '../ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card'

export const Tip = () => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>网站小贴</CardTitle>
			</CardHeader>
			<CardContent className=''>
				<div className='text-center leading-8'>
					是一个主张友好、分享、自由的技术交流社区。
					请记住我们的口号
				</div>
				<div className='text-center text-red-600 font-bold leading-8'>
					我自踏雪至山巅
				</div>
			</CardContent>
			<CardFooter className='flex justify-center gap-3 pt-3 border-t'>
				<Link to='/subscribe'>
					<Button variant="default">订阅优惠</Button>
				</Link>
				<Link to='/topic'>
					<Button variant="outline">发贴交流</Button>
				</Link>
			</CardFooter>
		</Card>
	)
}
