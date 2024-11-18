import { useState } from 'react'
import user_avatar from '@src/assets/user.jpg' // logo图片

import Home from './containers/Home'
import Configuration from './containers/Configuration'

import './start.scss'
import { StartIcons } from '@src/pages/start/common/Icons'
import Header from '../Header'

const { PetalIcon, HomeIcon, FireworksIcon, ContactIcon, PizzaIcon, SettingIcon } = StartIcons

export default () => {
  const [activeIndex, setActiveIndex] = useState('Configuration')
  const navList = [
    { Icon: <HomeIcon width="24" height="24" />, name: 'Home' },
    { Icon: <FireworksIcon width="20" height="20" />, name: 'Configuration' },
    { Icon: <ContactIcon width="20" height="20" />, name: 'Contact' },
    { Icon: <PizzaIcon width="20" height="20" />, name: 'Pizza' },
    { Icon: <SettingIcon width="20" height="20" />, name: 'Setting' }
  ]

  return (
    <section className="h-full flex flex-col">
      <Header>
        <div className="flex-1 drag-area flex justify-center items-center"></div>
      </Header>

      <section className="flex-1 flex flex-col gap-8 overflow-y-auto webkit p-4 px-8 bg-[#fef6ea] ALemonJS-start">
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

        {activeIndex === 'Home' && <Home />}
        {activeIndex === 'Configuration' && <Configuration />}
        {activeIndex === 'Contact' && <>待开发</>}
        {activeIndex === 'Pizza' && <>待开发</>}
        {activeIndex === 'Setting' && <>待开发</>}

        {/* 底部导航 */}
        <section className="flex items-center justify-center mt-auto">
          <div className="px-4 py-2 bg-white text-[#de853c] rounded-full flex gap-4">
            {navList.map((item, index) => (
              <span
                key={index}
                className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer ${
                  item.name == activeIndex ? ' bg-[#de853c] text-white' : ' text-[#de853c]'
                }`}
                onClick={() => setActiveIndex(item.name)}
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
