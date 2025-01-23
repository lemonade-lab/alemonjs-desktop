import { createBrowserRouter, createHashRouter } from 'react-router-dom'
import App from '@src/views/App'
import Main from '@src/views/MainView'
import Home from '@src/views/Home/App'
import Setting from '@src/views/Setting/App'
import Application from '@src/views/Application/App'
import BotLog from '@src/views/BotLog/App'
import Expansions from '@src/views/Expansions/App'

import BotLog2 from '@src/pages/terminal/BotLog'
import App2 from '@src/pages/terminal/App'

const router = createHashRouter([
  {
    path: '/window',
    element: <App2 />,
    children: [{ path: 'terminal', element: <BotLog2 /> }]
  },
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <Main /> },
      { path: 'home', element: <Home /> },
      { path: 'setting', element: <Setting /> },
      { path: 'application', element: <Application /> },
      { path: 'bot-log', element: <BotLog /> },
      { path: 'expansions', element: <Expansions /> },
      { path: '*', element: <Main /> }
    ]
  }
])
export default router
