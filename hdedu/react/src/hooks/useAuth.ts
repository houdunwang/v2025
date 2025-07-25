import { IUser } from "@/type/user";

const data = {
	user: {}
} as { user: IUser }

export const useAuth = () => {
	const getAllFields = () => {
		return data.user
	}
	const user = <T extends keyof IUser>(field: T) => {
		return data.user[field];
	}
	const isAuthenticated = () => {
		const isLogin = !!data.user?.id
		if (!isLogin) {
			localStorage.setItem('redirectUrl', location.href)
		}
		return isLogin
	}

	const isAdministrator = () => {
		return data.user?.id === 1
	}

	const setUser = (user: IUser) => {
		data.user = user
	}
	return { user, setUser, isAuthenticated, isAdministrator, getAllFields }
}

export type IUserAuth = ReturnType<typeof useAuth>