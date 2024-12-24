import { useState, useEffect } from 'react'
import Home from './containers/Home'

import { StartIcons } from '@src/pages/start/common/Icons'
import Header from '@src/pages/Header'
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom'
import About from '@src/pages/about/App' // 关于页面
import Chat from '@src/pages/chat/App' // 聊天页面
import Setting from '@src/pages/settings/App' // 设置页面
import ChatConfig from '@src/pages/chat-config/App' // 聊天配置页面
import Code from '@src/pages/code/App' // 代码页面
import ChatMessageConfig from '@src/pages/chat-message-config/App' // 聊天消息配置页面

import Tool from '@src/views/common/Tool'
import Configuration from '@src/views/tags/config/App'
import ConfigurationCode from '@src/views/tags/config-code/App' // 首页

import Notification from '@src/common/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { hideNotification } from '@src/store/notificationSlice'
import { RootState } from '@src/store/index'
import classNames from 'classnames'
const { PetalIcon, HomeIcon, FireworksIcon, ContactIcon, PizzaIcon, SettingIcon } = StartIcons

export default () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [activeIndex, setActiveIndex] = useState('/')
  const dispatch = useDispatch()
  const notification = useSelector((state: RootState) => state.notification)

  const navList = [
    { Icon: <HomeIcon width="20" height="20" />, path: '/' },
    { Icon: <FireworksIcon width="20" height="20" />, path: '/config' },
    { Icon: <ContactIcon width="20" height="20" />, path: '/chat' },
    { Icon: <PizzaIcon width="20" height="20" />, path: '/code', includes: ['/config-code'] }
  ]

  useEffect(() => {
    if (notification.visible) {
      const timer = setTimeout(() => {
        dispatch(hideNotification())
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [notification.visible, dispatch])

  useEffect(() => {
    const { path = '/' } =
      navList.find(
        item => item.path === location.pathname || item.includes?.includes(location.pathname)
      ) || {}
    setActiveIndex(path)
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
      <section className="flex-1 flex flex-col overflow-y-auto webkit px-4 bg-[#fef6ea]">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <PetalIcon width="28" />
            <span className="text-2xl font-bold ">AlemonJS</span>
          </div>
          <div className="text-base flex items-center gap-2">
            <span className="font-[AlibabaPuHuiTi2.0]">设置</span>
            <div className="cursor-pointer" onClick={() => navigate('/setting')}>
              <SettingIcon width="28" height="28" />
            </div>
          </div>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/config" element={<Configuration />} />
          <Route path="/config-code" element={<ConfigurationCode />} />
          <Route path="/code" element={<Code />} />
          <Route path="/about" element={<About />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/chat-config" element={<ChatConfig />} />
          <Route path="/chat-message-config" element={<ChatMessageConfig />} />
          <Route path="/setting" element={<Setting />} />
        </Routes>
        <section className="grid grid-cols-3 items-center py-2">
          <div className="col-span-1 flex items-center">
            {activeIndex === '/config' && <Tool />}
          </div>
          <div className="col-span-1 flex justify-center items-center">
            <div className="px-2 py-1 bg-white text-[#de853c] rounded-full flex gap-4">
              {navList.map((item, index) => (
                <span
                  key={index}
                  className={classNames(
                    'w-10 h-10 rounded-full flex items-center justify-center cursor-pointer',
                    item.path == activeIndex ? ' bg-[#de853c] text-white' : ' text-[#de853c]'
                  )}
                  onClick={() => {
                    setActiveIndex(item.path)
                    navigate(item.path)
                  }}
                >
                  {item.Icon}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 row-span-1"></div>
        </section>
      </section>
    </section>
  )
}
