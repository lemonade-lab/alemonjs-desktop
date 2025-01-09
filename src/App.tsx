import { HashRouter } from 'react-router-dom'
import { NotificationProvider } from '@src/context/Notification'
import App from '@src/views/App'
export default function AppMain() {
  return (
    <NotificationProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </NotificationProvider>
  )
}
