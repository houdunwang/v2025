import {
	QueryClient,
	QueryClientProvider
} from '@tanstack/react-query'
import { ReactNode } from 'react'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false
		}
	}
})

export const useAppQuery = () => {
	const AppQueryProvider = ({ children }: { children: ReactNode }) => <QueryClientProvider client={queryClient}>
		{children}
	</QueryClientProvider>
	return { AppQueryProvider }
}