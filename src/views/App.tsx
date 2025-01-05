import { useState, useEffect } from 'react'
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Notification from '@src/common/Notification'
import { StartIcons } from '@src/common/Icons'
import Header from '@src/common/Header'
const { HomeIcon, FireworksIcon } = StartIcons
//
import { RootState } from '@src/store/index'
import Home from '@src/views/Home/App'

import Setting from '@src/views/settings/App'
import Configuration from '@src/views/Config/App'
import ConfigurationCode from '@src/views/Config/ConfigCode/App'

import { hideNotification } from '@src/store/notificationSlice'
import { setStatus } from '@src/store/bot'

import { BottomBar } from '@src/views/BottomBar'
import { Title } from '@src/views/Title'

export default () => {
  const navigate = useNavigate()
  const location = useLocation()
  const notification = useSelector((state: RootState) => state.notification)
  const dispatch = useDispatch()

  const [activeIndex, setActiveIndex] = useState('/')

  const navList = [
    { Icon: <HomeIcon width="20" height="20" />, path: '/' },
    { Icon: <FireworksIcon width="20" height="20" />, path: '/config' }
  ]

  /**
   * 定期询问机器人状态。
   * 状态不一致的时候更改。
   */
  useEffect(() => {
    const timer = setInterval(() => {
      window.app.isTemplateExists().then(res =>
        dispatch(
          setStatus({
            nodeModulesStatus: res
          })
        )
      )
      window.app.botIsRunning().then(res =>
        dispatch(
          setStatus({
            runStatus: res
          })
        )
      )
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  }, [])

  // 通知 5 秒后消失
  useEffect(() => {
    if (notification.visible) {
      const timer = setTimeout(() => {
        dispatch(hideNotification())
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [notification.visible, dispatch])

  // 切换路由时，更改底部导航栏的激活状态
  useEffect(() => {
    const item = navList.find(item => item.path === location.pathname)
    if (item) setActiveIndex(item.path)
  }, [location.pathname])

  return (
    <section className="h-full flex flex-col">
      <Header>
        <div className="flex-1 drag-area flex justify-center items-center"></div>
      </Header>
      <Notification
        message={notification.message}
        visible={notification.visible}
        onClose={() => dispatch(hideNotification())}
      />
      <section className="flex-1 flex flex-col overflow-y-auto  px-4 bg-[#fef6ea]">
        <Title onClickTitle={() => navigate('/')} onclickIcon={() => navigate('/setting')} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/config" element={<Configuration />} />
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
      </section>
    </section>
  )
}
