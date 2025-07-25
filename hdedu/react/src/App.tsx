import { Toaster } from 'sonner'
import { Loading } from './components/common/Loading'
import { Error } from './components/error/Error'
import { useAppQuery } from "./hooks/useAppQuery"
import { useAppRouter } from "./hooks/useAppRouter"
import { useAuth } from './hooks/useAuth'
import { useConfig } from './hooks/useConfig'
import { useGetConfigQuery } from './services/config'
import { useGetCurrentUserQuery } from "./services/user"
function App() {
  const { AppQueryProvider } = useAppQuery()
  return <AppQueryProvider>
    <Toaster position='top-center' toastOptions={{ duration: 3000 }} />
    <InItData />
  </AppQueryProvider>
}

//初始数据
function InItData() {
  const { isPending, isError, error, data } = useGetCurrentUserQuery()
  const configQuery = useGetConfigQuery('common')
  const { AppRouterProvider } = useAppRouter()
  const { setUser } = useAuth()
  const { set: setConfig } = useConfig()
  if (isPending || configQuery.isPending) return <Loading />
  if (isError) return <Error error={error} />
  if (configQuery.isError) return <Error error={configQuery.error} />
  setUser(data)
  setConfig(configQuery.data)
  return <AppRouterProvider />
}
export default App
