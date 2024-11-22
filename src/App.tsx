import { Suspense } from 'react'
import { HashRouter } from 'react-router-dom'
import ChatBox from '@src/views/App'
import Loading from '@src/pages/Loading'
export default () => {
  return (
    <HashRouter>
      <Suspense
        fallback={
          <div className="w-screen h-screen">
            <Loading />
          </div>
        }
      >
        <ChatBox />
      </Suspense>
    </HashRouter>
  )
}
