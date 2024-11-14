import { Route, Routes, useNavigate } from 'react-router-dom'
import Home from '@src/pages/home/App' // 首页
import About from '@src/pages/about/App' // 关于页面
import Chat from '@src/pages/chat/App' // 聊天页面
import Docs from '@src/pages/docs/App' // 文档页面
import Setting from '@src/pages/settings/App' // 设置页面
import img_logo from '@src/assets/logo.jpg' // logo图片
import ChatConfig from '@src/pages/chat-config/App' // 聊天配置页面
import Code from '@src/pages/code/App' // 代码页面
import Start from '@src/pages/start/App' // 开始页面
import ChatMessageConfig from '@src/pages/chat-message-config/App' // 聊天消息配置页面

import {
  AboutIcon,
  AppsIcon,
  ChatbotIcon,
  CodeIcon,
  GlobeIcon,
  HelpIcon,
  MenuIcon,
  RefreshIcon,
  SettingIcon,
  StartIcon
} from '@src/pages/Icons'
import { useEffect, useRef, useState } from 'react'

export default () => {
  const navigate = useNavigate()
  const Apps = [
    { Icon: <AppsIcon />, path: '/' },
    { Icon: <ChatbotIcon />, path: '/chat' },
    { Icon: <CodeIcon />, path: '/code' },
    { Icon: <GlobeIcon />, path: '/docs' },
    { Icon: <StartIcon />, path: '/start' }
  ]
  const [isOpen, setIsOpen] = useState(false)
  const toggleMenu = () => setIsOpen(!isOpen)

  // 更新当前页面path
  let currentPath = useRef('/')
  const setCurrentPath = (path: string) => {
    currentPath.current = path
    navigate(path)
  }

  const menuRef = useRef<HTMLElement>(null)
  // 处理点击外部关闭菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && event.target && !menuRef.current.contains(event.target as any)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <main className="flex flex-row h-full">
      <section
        ref={menuRef}
        className="flex flex-col w-[4.125rem] bg-gradient-to-tl from-sky-900 to-indigo-900 relative pt-2"
      >
        {window.versions.platform != 'win32' && <section className="h-6" />}
        <section className="flex justify-center py-1 relative cursor-pointer">
          <img
            className="w-[2.75rem] rounded-full border-2 border-slate-500 my-1 bg-white"
            src={img_logo}
            alt="Avatar"
          />
        </section>

        <section className="flex items-center flex-col">
          {Apps.map((Item, index) => (
            <span
              key={index}
              className={`my-2 cursor-pointer shadow-content bg-opacity-90 rounded-md px-1.5 ${currentPath.current == Item.path ? 'bg-white' : 'text-white'}`}
              onClick={() => setCurrentPath(Item.path)}
            >
              {Item.Icon}
            </span>
          ))}
        </section>

        <div className="flex-1 drag-area"></div>
        <section className="py-2 flex items-center flex-col relative">
          <div className="rounded-md w-8 my-2 cursor-pointer" onClick={toggleMenu}>
            <MenuIcon />
          </div>

          {isOpen && (
            <div className="absolute left-[4.3rem] bottom-4 mt-2 w-48 bg-gradient-to-r from-blue-100 via-blue-300 to-blue-300 border border-gray-200 rounded shadow-centent z-10">
              <ul className="p-1 text-sm">
                <li
                  className="px-2 hover:bg-gray-50 flex items-center rounded-md cursor-pointer "
                  onClick={() => window.controller.update()}
                >
                  <div className=" ">
                    <RefreshIcon width="20" />
                  </div>
                  <div className="ml-2">检查更新</div>
                </li>
                <li className="px-2 hover:bg-gray-50 flex items-center rounded-md cursor-pointer ">
                  <div className=" fill-white">
                    <HelpIcon width="20" />
                  </div>
                  <div className="ml-2">帮助</div>
                </li>
                <li
                  className="px-2 hover:bg-gray-50 flex items-center rounded-md cursor-pointer "
                  onClick={() => navigate('/setting')}
                >
                  <div className="">
                    <SettingIcon width="20" />
                  </div>
                  <div className="ml-2">设置</div>
                </li>
                <li
                  className="px-2 hover:bg-gray-50 flex items-center rounded-md cursor-pointer "
                  onClick={() => navigate('/about')}
                >
                  <div className="">
                    <AboutIcon width="20" />
                  </div>
                  <div className="ml-2">关于</div>
                </li>
              </ul>
            </div>
          )}
        </section>
      </section>

      <article className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/code" element={<Code />} />
          <Route path="/about" element={<About />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/start" element={<Start />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/chat-config" element={<ChatConfig />} />
          <Route path="/chat-message-config" element={<ChatMessageConfig />} />
        </Routes>
      </article>
    </main>
  )
}
