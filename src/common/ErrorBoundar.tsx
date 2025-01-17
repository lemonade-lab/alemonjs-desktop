import { useState, useEffect, PropsWithChildren } from 'react'

const ErrorBoundary = ({ children }: PropsWithChildren) => {
  const [hasError, setHasError] = useState(false)

  const handleError = (error: ErrorEvent) => {
    console.error('Error occurred:', error)
    setHasError(true)
  }

  useEffect(() => {
    const errorHandler = (event: ErrorEvent) => {
      handleError(event.error)
    }

    window.addEventListener('error', errorHandler)

    return () => {
      window.removeEventListener('error', errorHandler)
    }
  }, [])

  if (hasError) {
    return <h1>发生错误，请稍后再试。 请使用Ctrl+R刷新界面 </h1>
  }

  return children
}

export default ErrorBoundary
