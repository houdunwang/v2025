import { ISign } from '@/type/sign'
import { FC } from 'react'
import { SignForm } from './SignForm'
import { useAuth } from '@/hooks/useAuth'
import { TodaySIgnMessage } from './TodaySIgnMessage'

export const SignSubmit: FC<{ signs: ISign[] }> = ({ signs }) => {
	const { user } = useAuth()
	const sign = signs.find(sign => sign.user_id == user('id'))
	return sign ? <TodaySIgnMessage sign={sign} /> : <SignForm />
}
