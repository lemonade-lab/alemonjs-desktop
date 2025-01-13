// global
import './index.scss'
// types
import './index'
// view
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import store from '@src/store/index'
import { NotificationProvider } from '@src/context/Notification'
import router from './route'
import { Suspense } from 'react'
import Transition from '@src/Transition'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <Suspense fallback={<Transition />}>
    <Provider store={store}>
      <NotificationProvider>
        <RouterProvider router={router} />
      </NotificationProvider>
    </Provider>
  </Suspense>
)
