import { Outlet } from 'react-router-dom'
import Header from '@src/common/Header'
import { useEffect } from 'react'
import { postMessage } from '@src/store/log'
import { useDispatch } from 'react-redux'
export default (function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    // 加载css变量
    window.theme.variables()

    // 监听 css 变量
    window.theme.on(cssVariables => {
      try {
        Object.keys(cssVariables).forEach(key => {
          document.documentElement.style.setProperty(`--${key}`, cssVariables[key])
        })
      } catch (e) {
        console.error(e)
      }
    })

    window.terminal.on((message: string) => {
      dispatch(postMessage(message))
    })
  }, [])
  return (
    <div className="flex flex-col h-screen">
      <Header>
        <div className="drag-area flex-1"></div>
      </Header>
      <div className="flex flex-1">
        <main className=" flex flex-1 bg-[var(--alemonjs-primary-bg)]">
          <Outlet />
        </main>
      </div>
    </div>
  )
})
