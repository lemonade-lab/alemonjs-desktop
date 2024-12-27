import { useState, useEffect } from 'react'
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom'
import Home from './containers/Home'

import About from '@src/views/about/App'
import Setting from '@src/views/settings/App'
import { StartIcons } from '@src/views/common/Icons'
import Header from '@src/views/common/Header'
import Tool from '@src/views/common/Tool'
import Configuration from '@src/views/tags/config/App'
import ConfigurationCode from '@src/views/tags/ConfigCode/App'

import Notification from '@src/common/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { hideNotification } from '@src/store/notificationSlice'
import { RootState } from '@src/store/index'
import classNames from 'classnames'
const { PetalIcon, HomeIcon, FireworksIcon, SettingIcon } = StartIcons

export default () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [activeIndex, setActiveIndex] = useState('/')
  const dispatch = useDispatch()
  const notification = useSelector((state: RootState) => state.notification)

  const navList = [
    { Icon: <HomeIcon width="20" height="20" />, path: '/' },
    { Icon: <FireworksIcon width="20" height="20" />, path: '/config' }
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
      <section className="flex-1 flex flex-col overflow-y-auto  px-4 bg-[#fef6ea]">
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
          <Route path="/about" element={<About />} />
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
