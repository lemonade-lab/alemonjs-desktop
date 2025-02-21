import { createHashRouter } from 'react-router-dom'
import App from '@src/views/App'
import Main from '@src/views/MainView'
import Application from '@src/views/Application/App'
import BotLog from '@src/views/BotLog/App'
import Expansions from '@src/views/Expansions/App'
import GitExpansions from '@src/views/GitExpansions/App'
import YarnManage from '@src/views/Setting/YarnManage'
import BotLog2 from '@src/pages/terminal/BotLog'
import App2 from '@src/pages/terminal/App'
import Common from './views/Setting/Common'
import Theme from './views/Setting/Theme'
import UpdateLog from './views/Setting/UpdateLog'
import Npmrc from './views/Setting/Npmrc'
import About from './views/Setting/About'
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
      { path: 'application', element: <Application /> },
      { path: 'bot-log', element: <BotLog /> },
      { path: 'expansions', element: <Expansions /> },
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
