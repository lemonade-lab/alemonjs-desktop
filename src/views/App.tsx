import { useState, useEffect, useRef } from 'react'
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useNotification } from '@src/context/Notification'
import useGoNavigate, { NavigatePath } from '@src/hook/navigate'
import { setBotStatus } from '@src/store/bot'
import { setCommand } from '@src/store/command'
import { ContactIcon, FireworksIcon, HomeIcon, PizzaIcon } from '@src/common/MenuIcons'
import Header from '@src/common/Header'
import { BottomBar } from '@src/views/BottomBar'
import WordBox from './WordBox'
import { setModulesStatus } from '@src/store/modules'
import { initPackage, setExpansionsStatus } from '@src/store/expansions'
import { RootState } from '@src/store'
import { setPath } from '@src/store/app'
import MainView from './MainView'

export default (function App() {
  const navigate = useGoNavigate()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const { showNotification } = useNotification()
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
      path: '/config-edit',
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
    setTimeout(() => {
      if (!modulesRef.current.nodeModulesStatus) {
        showNotification('正在加载依赖，请耐心等待...')
      }
    }, 1600)

    // 立即得到 app 路径
    window.app.getAppsPath().then(res => {
      dispatch(setPath(res))
    })

    // 加载css变量
    window.controller.cssVariables()

    // 监听 css 变量
    window.controller.onCSSVariables(cssVariables => {
      try {
        Object.keys(cssVariables).forEach(key => {
          document.documentElement.style.setProperty(`--${key}`, cssVariables[key])
        })
      } catch (e) {
        console.error(e)
      }
    })

    // 立即加载依赖
    window.yarn.install().catch(err => {
      console.error(err)
    })

    // 监听依赖安装状态
    window.yarn.onInstallStatus((value: number) => {
      dispatch(
        setModulesStatus({
          nodeModulesStatus: value == 0 ? false : true
        })
      )
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

    // 监听expansions消息
    window.expansions.onMessage(data => {
      try {
        if (data.type === 'notification') {
          showNotification(data.data)
          return
        } else if (data.type === 'command') {
          dispatch(setCommand(data.data))
          return
        } else if (data.type === 'get-expansions') {
          dispatch(initPackage(data.data))
        }
      } catch {
        console.error('HomeApp 解析消息失败')
      }
    })

    // 监听expansions状态
    window.expansions.onStatus((value: number) => {
      if (value == 0) {
        showNotification('扩展器已停止')
      } else {
        showNotification('扩展器已启动')
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
      if (!expansions.runStatus) window.expansions.run([])
    }
  }, [modules.nodeModulesStatus])

  useEffect(() => {
    // 运行的时候才会获取扩展器
    if (expansions.runStatus) {
      window.expansions.postMessage({ type: 'get-expansions' })
    }
  }, [expansions.runStatus])

  return (
    <div className="flex flex-col h-screen">
      <Header>{loading && <WordBox />}</Header>
      <div className="flex flex-1">
        <BottomBar
          onClickLogo={() => navigate('/')}
          centerList={navList}
          onClickSetting={() => navigate('/setting')}
        />
        {loading ? (
          <main className=" flex flex-1 bg-[var(--secondary-bg-front)]">
            <Outlet />
          </main>
        ) : (
          <main className=" flex flex-1 bg-[var(--secondary-bg-front)]">
            <MainView />
          </main>
        )}
      </div>
    </div>
  )
})
