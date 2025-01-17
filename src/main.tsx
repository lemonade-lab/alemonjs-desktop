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
import ModalProvider from '@src/context/modal'
import router from './route'
import { Suspense } from 'react'
import Transition from '@src/Transition'
import ErrorBoundary from './common/ErrorBoundar'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <Suspense fallback={<Transition />}>
      <Provider store={store}>
        <NotificationProvider>
          <ModalProvider>
            <RouterProvider router={router} />
          </ModalProvider>
        </NotificationProvider>
      </Provider>
    </Suspense>
  </ErrorBoundary>
)
