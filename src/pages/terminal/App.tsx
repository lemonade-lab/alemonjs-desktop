import { Outlet } from 'react-router-dom'
import Header from '@src/common/Header'
import { useEffect } from 'react'
import { postMessage } from '@src/store/log'
import { useDispatch } from 'react-redux'
import { PrimaryDiv } from '@src/ui/PrimaryDiv'
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

    // 加载主题
    window.theme.mode().then(res => {
      if (res === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    })

    window.terminal.on((message: string) => {
      dispatch(postMessage(message))
    })
  }, [])
  return (
    <div className="flex flex-col h-screen ">
      <Header>
        <div className="drag-area flex-1"></div>
      </Header>
      <PrimaryDiv className="flex flex-1">
        <div className="flex flex-1">
          <Outlet />
        </div>
      </PrimaryDiv>
    </div>
  )
})
