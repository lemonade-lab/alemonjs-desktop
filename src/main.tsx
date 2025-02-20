import '@src/index.scss'
import '@src/App'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import store from '@src/store/index'
import { NotificationProvider } from '@src/context/Notification'
import ModalProvider from '@src/context/modal'
import PopProvider from '@src/context/Pop'
import router from '@src/route'
import { Suspense } from 'react'
import Transition from '@src/Transition'
import ErrorBoundary from '@src/common/ErrorBoundar'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    {
      // lazy
    }
    <Suspense fallback={<Transition />}>
      <Provider store={store}>
        <NotificationProvider>
          <ModalProvider>
            <PopProvider>
              <RouterProvider router={router} />
            </PopProvider>
          </ModalProvider>
        </NotificationProvider>
      </Provider>
    </Suspense>
  </ErrorBoundary>
)
