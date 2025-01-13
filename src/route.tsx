import { createBrowserRouter } from 'react-router-dom'
import { lazy } from 'react'
import App from '@src/views/App'
import Main from '@src/views/MainView'
const Home = lazy(() => import('@src/views/Home/App'))
const Setting = lazy(() => import('@src/views/Setting/App'))
const ConfigEdit = lazy(() => import('@src/views/ConfigEdit/App'))
const BotLog = lazy(() => import('@src/views/BotLog/App'))
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Main />
      },
      {
        path: 'home',
        element: <Home />
      },
      {
        path: 'setting',
        element: <Setting />
      },
      {
        path: 'config-edit',
        element: <ConfigEdit />
      },
      {
        path: 'bot-log',
        element: <BotLog />
      }
    ]
  },
  {
    // 最后要回到首页
    path: '/*',
    element: <App />
  }
])
export default router
