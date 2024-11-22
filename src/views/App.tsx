import { useState } from 'react'
import user_avatar from '@src/assets/user.jpg' // logo图片

import Home from './containers/Home'
import Configuration from './containers/Configuration'

import './start.scss'
import { StartIcons } from '@src/pages/start/common/Icons'
import Header from '@src/pages/Header'

import { Route, Routes, useNavigate } from 'react-router-dom'

import About from '@src/pages/about/App' // 关于页面
import Chat from '@src/pages/chat/App' // 聊天页面
import Docs from '@src/pages/docs/App' // 文档页面
import Setting from '@src/pages/settings/App' // 设置页面
import img_logo from '@src/assets/logo.jpg' // logo图片
import ChatConfig from '@src/pages/chat-config/App' // 聊天配置页面
import Code from '@src/pages/code/App' // 代码页面
import Start from '@src/pages/start/App' // 开始页面
import ChatMessageConfig from '@src/pages/chat-message-config/App' // 聊天消息配置页面
import ConfigurationCode from '@src/pages/home/App' // 首页

const { PetalIcon, HomeIcon, FireworksIcon, ContactIcon, PizzaIcon, SettingIcon } = StartIcons

export default () => {
  const [activeIndex, setActiveIndex] = useState('/')
  const navList = [
    { Icon: <HomeIcon width="24" height="24" />, path: '/' },
    { Icon: <FireworksIcon width="20" height="20" />, path: '/start' },
    { Icon: <ContactIcon width="20" height="20" />, path: '/chat' },
    { Icon: <PizzaIcon width="20" height="20" />, path: '/code' },
    { Icon: <SettingIcon width="20" height="20" />, path: '/setting' }
  ]
  const navigate = useNavigate()
  return (
    <section className="h-full flex flex-col">
      <Header>
        <div className="flex-1 drag-area flex justify-center items-center"></div>
      </Header>
      <section className="flex-1 flex flex-col gap-6 overflow-y-auto webkit p-4 px-8 bg-[#fef6ea] ALemonJS-start">
        {/* Logo 栏 */}
        <div className="flex justify-between py-2 items-center">
          <div className="flex items-center gap-2">
            <PetalIcon width="34" height="44" />
            <span className="text-2xl font-bold font-[AlimamaShuHeiTi]">A LemonJS</span>
          </div>
          <div className="text-base flex items-center gap-2">
            <span className="font-[AlibabaPuHuiTi]">Antony DQ</span>
            <img src={user_avatar} alt="avatar" className="w-10 h-10 rounded-full" />
          </div>
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/code" element={<Code />} />
          <Route path="/about" element={<About />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/start" element={<Configuration />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/configuration-code" element={<ConfigurationCode />} />
          <Route path="/chat-config" element={<ChatConfig />} />
          <Route path="/chat-message-config" element={<ChatMessageConfig />} />
        </Routes>

        {/* 底部导航 */}
        <section className="flex items-center justify-center mt-auto">
          <div className="px-4 py-2 bg-white text-[#de853c] rounded-full flex gap-4">
            {navList.map((item, index) => (
              <span
                key={index}
                className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer ${
                  item.path == activeIndex ? ' bg-[#de853c] text-white' : ' text-[#de853c]'
                }`}
                onClick={() => navigate(item.path)}
              >
                {item.Icon}
              </span>
            ))}
          </div>
        </section>
      </section>
    </section>
  )
}
