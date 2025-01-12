import React, { useState, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useNotification } from '@src/context/Notification'
import useGoNavigate, { NavigatePath } from '@src/hook/navigate'
import { setBotStatus } from '@src/store/bot'
import { setCommand } from '@src/store/command'

import { ContactIcon, FireworksIcon, HomeIcon, PizzaIcon } from '@src/common/MenuIcons'

import Header from '@src/common/Header'
import Home from '@src/views/Home/App'
import Setting from '@src/views/settings/App'
import ConfigCode from '@src/views/ConfigCode/App'
import ConfigEdit from '@src/views/ConfigEdit/App'
import { BottomBar } from '@src/views/BottomBar'
import BotLog from '@src/views/BotLog/App'

import Docs from './Docs/App'
import Loading from './Loading'
import WordBox from './WordBox'
import { setModulesStatus } from '@src/store/modules'
import { initPackage, setExpansionsStatus } from '@src/store/expansions'
import { RootState } from '@src/store'
import { setPath } from '@src/store/app'

export default () => {
  const navigate = useGoNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const [activeIndex, setActiveIndex] = useState('/')
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
      path: '/',
      onClick: path => {
        setActiveIndex(path)
        navigate(path)
      }
    },
    {
      Icon: <FireworksIcon width="20" height="20" />,
      path: '/config-edit',
      onClick: path => {
        setActiveIndex(path)
        navigate(path)
      }
    },
    {
      Icon: <ContactIcon width="20" height="20" />,
      path: '/bot-log',
      onClick: path => {
        setActiveIndex(path)
        navigate(path)
      }
    },
    {
      Icon: <PizzaIcon width="20" height="20" />,
      path: '/docs',
      onClick: path => {
        setActiveIndex(path)
        navigate(path)
      }
    }
  ]

  useEffect(() => {
    // 加载css变量
    window.controller.cssVariables()

    // 立即加载依赖
    window.yarn.install().catch(err => {
      console.error(err)
    })

    //app dir
    window.app.getAppPath().then(res => {
      dispatch(setPath(res))
    })

    // 获取 bot 状态
    window.bot.status().then(res =>
      dispatch(
        setBotStatus({
          runStatus: res
        })
      )
    )
  }, [])

  useEffect(() => {
    // 监听 bot 状态
    window.bot.onStatus((value: number) => {
      dispatch(
        setBotStatus({
          runStatus: value == 0 ? false : true
        })
      )
    })
    // 监听依赖安装状态
    window.yarn.onInstallStatus((value: number) => {
      dispatch(
        setModulesStatus({
          nodeModulesStatus: value == 0 ? false : true
        })
      )
    })

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
        // 致命错误
        showNotification('主题解析错误')
      }
    })

    // 监听消息
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

    // 监听扩展器状态
    window.expansions.onStatus((value: number) => {
      if (value == 0) {
        showNotification('扩展器已关闭')
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
    if (modules.nodeModulesStatus) {
      // 查看是否启动
      if (!expansions.runStatus) {
        // 未启动
        window.expansions.run([])
      }
    }
  }, [modules.nodeModulesStatus])

  useEffect(() => {
    // 变化时，获取扩展器列表
    window.expansions.postMessage({ type: 'get-expansions' })
  }, [expansions.runStatus])

  // 切换路由时，更改底部导航栏的激活状态
  useEffect(() => {
    const item = navList.find(item => item.path === location.pathname)
    if (item) setActiveIndex(item.path)
  }, [location.pathname])

  return (
    <div className="flex flex-col h-screen ">
      <Header>{loading ? <WordBox /> : <div></div>}</Header>
      {loading ? (
        <div className="flex flex-1">
          <BottomBar
            centerList={navList}
            centerIndex={activeIndex}
            onClickSetting={() => navigate('/setting')}
          />
          <main className="flex flex-1 bg-[var(--secondary-bg-front)]">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/bot-log" element={<BotLog />} />
              <Route path="/config-edit" element={<ConfigEdit />} />
              <Route path="/config-code" element={<ConfigCode />} />
              <Route path="/setting" element={<Setting />} />
              <Route path="/docs" element={<Docs />} />
            </Routes>
          </main>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  )
}
