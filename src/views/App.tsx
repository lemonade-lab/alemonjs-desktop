import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useNotification } from '@src/context/Notification'
import useGoNavigate, { NavigatePath } from '@src/hook/navigate'
import { setBotStatus } from '@src/store/bot'
import { setCommand } from '@src/store/command'
import { ContactIcon, FireworksIcon, HomeIcon, PizzaIcon } from '@src/common/MenuIcons'
import Header from '@src/common/Header'
import { BottomBar } from '@src/views/BottomBar'

// import Docs from './Docs/App'
import WordBox from './WordBox'
import { setModulesStatus } from '@src/store/modules'
import { initPackage, setExpansionsStatus } from '@src/store/expansions'
import { RootState } from '@src/store'
import { setPath } from '@src/store/app'
import Loading from './Loading'

export default () => {
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

  useEffect(() => {
    // showNotification('正在初始化数据...')

    // 立即得到 app 路径
    window.app.getAppPath().then(res => {
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
        //
        setLoading(true)
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
    // 依赖安装完成后，启动扩展器
    if (modules.nodeModulesStatus) {
      // 查看是否启动
      if (!expansions.runStatus) {
        // 未启动
        window.expansions.run([])
      }
    }
  }, [modules.nodeModulesStatus])

  useEffect(() => {
    // 获取扩展器列表
    window.expansions.postMessage({ type: 'get-expansions' })
  }, [expansions.runStatus])

  return (
    <div className="flex flex-col h-screen">
      {
        // 数据初始化时
        // 不允许进行任何数据交互相关的操作
        // loading 应该显示文字，告知目前正在进行的操作
      }
      <Header>{loading && <WordBox />}</Header>
      {loading ? (
        <div className="flex flex-1">
          <BottomBar
            onClickLogo={() => navigate('/')}
            centerList={navList}
            onClickSetting={() => navigate('/setting')}
          />
          <main className="flex flex-1 bg-[var(--secondary-bg-front)]">
            <Outlet />
          </main>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  )
}
