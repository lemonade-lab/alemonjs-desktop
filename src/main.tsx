import '@/index.scss'
import '@alemonjs/react-ui/style.css'
import '@/main.typing'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'
import store from '@/store/index'
import { NotificationProvider } from '@/context/Notification'
import ModalProvider from '@/context/modal'
import PopProvider from '@/context/Pop'
import router from '@/route'
import Transition from '@/common/Transition'
import ErrorBoundary from '@/common/ErrorBoundar'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
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
