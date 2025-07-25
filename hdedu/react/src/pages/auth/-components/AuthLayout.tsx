import { Link } from '@tanstack/react-router';
import classNames from 'classnames';
import { FC, PropsWithChildren } from 'react';
interface Props {
	bgImage: string;
	title: string;
	className?: string
}
export const AuthLayout: FC<PropsWithChildren<Props>> = ({ children, title, bgImage, className }) => {
	return (
		<main className={classNames("w-screen h-screen flex justify-center items-center bg-[#2c3e50]", className)}>
			<section className='grid grid-cols-2 '>
				<div className='bg-white rounded-l-sm px-6 pt-10 pb-6 w-[350px]'>
					<h1 className='text-center mb-6'>{title}</h1>
					{children}
					<div className='flex justify-center gap-1 text-xs mt-6'>
						<Link to="/auth/login">用户登录</Link>
						<Link to="/auth/register">帐号注册</Link>
						<Link to="/auth/forget">找回密码</Link>
						<Link to="/">网站首页</Link>
					</div>
				</div>
				{/* /assets/images/auth/login.jpg */}
				<div style={{
					backgroundImage: `url(${bgImage})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
				}} className='rounded-r-sm'>

				</div>
			</section>
		</main>
	)
}
