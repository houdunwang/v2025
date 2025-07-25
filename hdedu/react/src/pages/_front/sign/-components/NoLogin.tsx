import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Link } from '@tanstack/react-router'

export const NoLogin = () => {
	return (
		<Card>
			<CardHeader>
				<CardTitle> 签到快乐，再接再厉</CardTitle>
			</CardHeader>
			<CardContent className='flex justify-center'>
				<Link to="/auth/login">
					<Button variant="default">马上登录</Button>
				</Link>
			</CardContent>
		</Card>
	)
}
