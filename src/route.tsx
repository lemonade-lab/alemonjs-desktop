import { createHashRouter } from 'react-router-dom'
import App from '@/views/App'
import Main from '@/views/Home/App'
import Application from '@/views/Application/App'
import BotLog from '@/views/BotLog/App'
import Expansions from '@/views/Expansions/App'
import GitExpansions from '@/views/GitExpansions/App'
import YarnManage from '@/views/Setting/YarnManage'
import Common from '@/views/Setting/Common'
import Theme from '@/views/Setting/Theme'
import UpdateLog from '@/views/Setting/UpdateLog'
import Npmrc from '@/views/Setting/Npmrc'
import About from '@/views/Setting/About'

import WindowBotLog from '@/pages/terminal/BotLog'
import WindowApp from '@/pages/terminal/App'

const router = createHashRouter([
  {
    path: '/window',
    element: <WindowApp />,
    children: [{ path: 'terminal', element: <WindowBotLog /> }]
  },
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Main />
      },
      {
        path: 'git-expansions',
        element: <GitExpansions />
      },
      {
        path: 'application',
        element: <Application />
      },
      {
        path: 'bot-log',
        element: <BotLog />
      },
      {
        path: 'expansions',
        element: <Expansions />
      },
      {
        path: 'common',
        element: <Common />
      },
      {
        path: 'theme',
        element: <Theme />
      },
      {
        path: 'log',
        element: <UpdateLog />
      },
      {
        path: 'npmrc',
        element: <Npmrc />
      },
      {
        path: 'yarn-manage',
        element: <YarnManage />
      },
      {
        path: 'about',
        element: <About />
      },
      { path: '*', element: <Main /> }
    ]
  }
])
export default router
