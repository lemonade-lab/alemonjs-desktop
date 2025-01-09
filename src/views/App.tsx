import { useState, useEffect } from 'react'
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Header from '@src/common/Header'
import Home from '@src/views/Home/App'
import Setting from '@src/views/settings/App'
import ConfigurationCode from '@src/views/Config/ConfigCode/App'

import { setStatus } from '@src/store/bot'

import { BottomBar } from '@src/views/BottomBar'
import { Title } from '@src/views/Title'
import BotLog from './BotLog/App'
import { FireworksIcon, HomeIcon, PizzaIcon } from '@src/common/MenuIcons'

export default () => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  const [activeIndex, setActiveIndex] = useState('/')

  const [loading, setLoading] = useState(false)

  const navList = [
    { Icon: <HomeIcon width="20" height="20" />, path: '/' },
    { Icon: <FireworksIcon width="20" height="20" />, path: '/config-code' },
    { Icon: <PizzaIcon width="20" height="20" />, path: '/bot-log' }
  ]

  /**
   * 定期询问机器人状态。
   * 状态不一致的时候更改。
   */
  useEffect(() => {
    // 获取 bot 状态
    window.app
      .botStatus()
      .then(res =>
        dispatch(
          setStatus({
            runStatus: res
          })
        )
      )
      .catch(err => {
        console.error(err)
      })

    // 监听 bot 状态
    window.app.onBotStatus((value: number) => {
      console.log('bot-status', value)
      dispatch(
        setStatus({
          runStatus: value == 0 ? false : true
        })
      )
    })

    // 立即加载依赖
    window.yarn.install().catch(err => {
      console.error(err)
    })

    // 监听依赖安装状态
    window.yarn.onInstallStatus((value: number) => {
      dispatch(
        setStatus({
          nodeModulesStatus: value == 0 ? false : true
        })
      )
    })

    window.controller.cssVariables()

    window.controller.onCSSVariables((value: string) => {
      try {
        // 等css变量加载完毕后再加载页面
        setLoading(true)
        const cssVariables = JSON.parse(value)
        Object.keys(cssVariables).forEach(key => {
          document.documentElement.style.setProperty(`--${key}`, cssVariables[key])
        })
      } catch (e) {
        console.error(e)
        // 致命错误
      }
    })
  }, [])

  // 切换路由时，更改底部导航栏的激活状态
  useEffect(() => {
    const item = navList.find(item => item.path === location.pathname)
    if (item) setActiveIndex(item.path)
  }, [location.pathname])

  return (
    <div className="flex flex-col h-screen">
      <Header>
        <div className="flex-1 drag-area flex justify-center items-center"></div>
      </Header>
      {loading && (
        <>
          <Title onClickTitle={() => navigate('/')} onclickIcon={() => navigate('/setting')} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bot-log" element={<BotLog />} />
            {/* <Route path="/config" element={<Configuration />} /> */}
            <Route path="/config-code" element={<ConfigurationCode />} />
            <Route path="/setting" element={<Setting />} />
          </Routes>
          <BottomBar
            data={navList}
            onClickIcon={path => {
              setActiveIndex(path)
              navigate(path)
            }}
            active={activeIndex}
          />
        </>
      )}
    </div>
  )
}
