import { useState, useEffect, PropsWithChildren } from 'react'
import Header from '@/common/Header'

const Error = () => {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 justify-center items-center">
        <div>
          <h1 className="text-4xl font-bold text-red-500">Error</h1>
          <p> 发生严重的界面崩溃。。。</p>
          <p> 请使用退出后重新启动</p>
          <p>
            或者点击
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => {
                // 去到首页
                window.location.href = '/'
              }}
            >
              回到初始界面
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

const ErrorBoundary = ({ children }: PropsWithChildren) => {
  const [hasError, setHasError] = useState(false)

  const handleError = (error: ErrorEvent) => {
    console.error('Error occurred:', error)
    setHasError(true)
  }

  useEffect(() => {
    const errorHandler = (event: ErrorEvent) => {
      handleError(event.error)
      // 向 开发者 错误收集平台 留存错误信息
    }

    window.addEventListener('error', errorHandler)

    return () => {
      window.removeEventListener('error', errorHandler)
    }
  }, [])

  if (hasError) {
    return <Error />
  }

  return children
}

export default ErrorBoundary
