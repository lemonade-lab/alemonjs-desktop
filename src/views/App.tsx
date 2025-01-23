import { useState, useEffect, useRef } from 'react'
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useNotification } from '@src/context/Notification'
import useGoNavigate, { NavigatePath } from '@src/hook/navigate'
import { setBotStatus } from '@src/store/bot'
import { setCommand } from '@src/store/command'
import { ContactIcon, FireworksIcon, HomeIcon, PizzaIcon } from '@src/common/MenuIcons'
import Header from '@src/common/Header'
import Menu from '@src/views/Menu'
import WordBox from './WordBox'
import { setModulesStatus } from '@src/store/modules'
import { initPackage, setExpansionsStatus } from '@src/store/expansions'
import { RootState } from '@src/store'
import { setPath } from '@src/store/app'
import MainView from './MainView'
import { postMessage } from '@src/store/log'
import { PrimaryDiv } from '@src/ui/Div'

export default (function App() {
  const navigate = useGoNavigate()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const { notification } = useNotification()
  const modules = useSelector((state: RootState) => state.modules)
  const expansions = useSelector((state: RootState) => state.expansions)

  const navList: {
    Icon: React.ReactNode
    path: NavigatePath
    onClick: (path: NavigatePath) => void
  }[] = [
    {
      Icon: <HomeIcon width="20" height="20" />,
      path: '/home',
      onClick: path => {
        navigate(path)
      }
    },
    {
      Icon: <ContactIcon width="20" height="20" />,
      path: '/bot-log',
      onClick: path => navigate(path)
    },
    {
      Icon: <FireworksIcon width="20" height="20" />,
      path: '/application',
      onClick: path => navigate(path)
    },
    {
      Icon: <PizzaIcon width="20" height="20" />,
      path: '/expansions',
      onClick: path => navigate(path)
    }
  ]

  const modulesRef = useRef(modules)

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
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark')
    }

    console.log('App.tsx useEffect')

    // 依赖加载状态提示
    const msg = [
      '正在加载依赖，请耐心等待...',
      '若时间过长，请检查网络或退出重试...',
      '你的依赖超长未完成，请联系开发者协议...'
    ]
    const outAt = 1000 * 10
    const notifyUser = (index: number) => {
      if (index < msg.length && !modulesRef.current.nodeModulesStatus) {
        notification(msg[index])
        setTimeout(() => notifyUser(index + 1), outAt)
      }
    }
    // 开始通知
    setTimeout(() => notifyUser(0), outAt)

    // 立即得到 app 路径
    window.app.getAppsPath().then(res => {
      console.log('app.getAppsPath', res)
      dispatch(setPath(res))
    })

    // 立即加载依赖
    window.yarn.cmds({
      type: 'install',
      value: ['install', '--ignore-warnings']
    })

    // 监听依赖安装状态 0 失败 1 成功
    window.yarn.on(data => {
      const value = data.value
      if (data.type == 'install') {
        if (value == 0) {
          notification('依赖初始化失败', 'error')
        }
        dispatch(
          setModulesStatus({
            nodeModulesStatus: value == 0 ? false : true
          })
        )
      }
    })

    // 立即获取 bot 状态
    window.bot.status().then(res =>
      dispatch(
        setBotStatus({
          runStatus: res
        })
      )
    )

    // 监听 bot 状态
    window.bot.onStatus((value: number) => {
      dispatch(
        setBotStatus({
          runStatus: value == 0 ? false : true
        })
      )
    })

    window.controller.onNotification((value: any) => {
      notification(value)
    })

    // 监听expansions消息
    window.expansions.onMessage(data => {
      try {
        if (/^action:/.test(data.type)) {
          const actions = data.type.split(':')
          const db = data.data
          if (actions[1] === 'application' && actions[2] === 'sidebar' && actions[3] === 'load') {
            navigate('/application', {
              state: {
                view: db
              }
            })
          } else if (actions[1] === 'expansions') {
            navigate('/expansions')
          } else if (actions[1] === 'home') {
            navigate('/home')
          } else if (actions[1] === 'setting') {
            navigate('/setting')
          } else if (actions[1] === 'bot-log') {
            navigate('/bot-log')
          }
        } else if (data.type === 'notification') {
          const db = data.data
          notification(db.value, db.typing)
          return
        } else if (data.type === 'command') {
          dispatch(setCommand(data.data))
          return
        } else if (data.type === 'get-expansions') {
          const db = data.data
          console.log('get-expansions', db)
          dispatch(initPackage(db))
        }
      } catch {
        console.error('HomeApp 解析消息失败')
      }
    })

    // 监听expansions状态
    window.expansions.onStatus((value: number) => {
      if (value == 0) {
        notification('扩展器已停止', 'warning')
      } else {
        notification('扩展器已启动')
      }
      dispatch(
        setExpansionsStatus({
          runStatus: value == 0 ? false : true
        })
      )
    })
  }, [])

  useEffect(() => {
    modulesRef.current = modules
    // 依赖状态变化时。
    if (modules.nodeModulesStatus) {
      setLoading(true)
    } else {
      setLoading(false)
    }
    // 依赖安装完成后，启动扩展器
    if (modules.nodeModulesStatus) {
      // 启动扩展器
      if (!expansions.runStatus) {
        console.log('runStatus', expansions.runStatus)
        window.expansions.run([])
      }
    }
  }, [modules.nodeModulesStatus])

  useEffect(() => {
    // 运行的时候才会获取扩展器
    if (expansions.runStatus) {
      window.expansions.postMessage({ type: 'get-expansions' })
    }
  }, [expansions.runStatus])

  useEffect(() => {
    window.terminal.on((message: string) => {
      dispatch(postMessage(message))
    })
  }, [])

  return (
    <div className="flex flex-col h-screen ">
      <Header>
        <WordBox />
      </Header>
      <PrimaryDiv className="flex flex-1">
        <Menu
          onClickLogo={() => navigate('/')}
          centerList={navList}
          onClickSetting={() => navigate('/setting')}
        />
        {loading ? (
          <div className=" flex flex-1">
            <Outlet />
          </div>
        ) : (
          <div className=" flex flex-1">
            <MainView />
          </div>
        )}
      </PrimaryDiv>
    </div>
  )
})
