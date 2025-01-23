import { createBrowserRouter } from 'react-router-dom'
import BotLog from '@src/pages/terminal/BotLog'
import App from '@src/pages/terminal/App'
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [{ path: '*', element: <BotLog /> }]
  }
])
export default router
