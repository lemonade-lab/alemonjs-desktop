import { createHashRouter } from 'react-router-dom'
import App from '@src/views/App'
import Main from '@src/views/MainView'
import Setting from '@src/views/Setting/App'
import Application from '@src/views/Application/App'
import BotLog from '@src/views/BotLog/App'
import Expansions from '@src/views/Expansions/App'
import GitExpansions from '@src/views/GitExpansions/App'
import YarnManage from '@src/views/YarnManage/App'

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
      {
        path: 'git-expansions',
        element: <GitExpansions />
      },
      { path: 'setting', element: <Setting /> },
      { path: 'application', element: <Application /> },
      { path: 'bot-log', element: <BotLog /> },
      { path: 'expansions', element: <Expansions /> },
      { path: 'yarn-manage', element: <YarnManage /> },
      { path: '*', element: <Main /> }
    ]
  }
])
export default router
