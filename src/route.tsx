import { createBrowserRouter } from 'react-router-dom'
import { lazy } from 'react'
import App from '@src/views/App'
const Home = lazy(() => import('@src/views/Home/App'))
const Setting = lazy(() => import('@src/views/settings/App'))
const ConfigEdit = lazy(() => import('@src/views/ConfigEdit/App'))
const BotLog = lazy(() => import('@src/views/BotLog/App'))
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
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
    path: '/*',
    element: <App />
  }
])
export default router
