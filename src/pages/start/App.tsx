import { useEffect, useState } from 'react'
import 'ace-builds/src-noconflict/mode-json'
import 'ace-builds/src-noconflict/mode-typescript'
import 'ace-builds/src-noconflict/theme-solarized_dark'
import 'ace-builds/src-noconflict/ext-language_tools'
import user_avatar from '@src/assets/user.jpg' // logo图片
import { StartLearn } from '@src/pages/Icons'
import Header from '../Header'

const { PetalIcon, RobotIcon, HomeIcon, FireworksIcon, ContactIcon, PizzaIcon, SettingIcon } =
  StartLearn

export default () => {
  const [activeIndex, setActiveIndex] = useState('home')
  const navList = [
    { Icon: <HomeIcon />, name: 'home' },
    { Icon: <FireworksIcon />, name: 'fireworks' },
    { Icon: <ContactIcon />, name: 'contact' },
    { Icon: <PizzaIcon />, name: 'pizza' },
    { Icon: <SettingIcon />, name: 'setting' }
  ]

  return (
    <section className=" h-full flex flex-col">
      <Header>
        <div className="flex-1 drag-area flex justify-center items-center"></div>
      </Header>

      <section className="flex-1 flex flex-col overflow-y-auto webkit p-4 px-8 bg-[#fef6ea]">
        <div className="flex justify-between py-2 items-center">
          <div className="flex items-center gap-2">
            <PetalIcon />
            <span className="text-2xl font-bold">A LemonJS</span>
          </div>
          <div className="text-base flex items-center gap-2">
            <span>Antony DQ</span>
            <img src={user_avatar} alt="avatar" className="w-8 h-8 rounded-full" />
          </div>
        </div>

        <div className="flex-1 flex flex-col mt-8">
          <div className="flex-1 flex flex-col">
            <div className="flex justify-between items-center">
              <div className="text-xl pl-2">
                欢迎使用
                <br />
                跨时代的聊天平台开发框架
              </div>

              <button className="px-4 py-1 border border-[#de853c] text-[#de853c] rounded-full flex items-center gap-4">
                <RobotIcon width="20" height="20" />
                <span className="text-sm">快速继续机器人开发之旅</span>
              </button>
            </div>

            <div className="mt-8 grid grid-cols-4 gap-4 flex-1">
              <div className="row-span-2 col-span-1 bg-[#e59f30] rounded-2xl p-4 shadow-[#de853c]">
                更新事迹
              </div>
              <div className="col-span-1 bg-white rounded-2xl p-4 shadow-[#de853c]">02</div>
              <div className="col-span-1 bg-white rounded-2xl p-4 shadow-[#de853c]">03</div>
              <div className="col-span-1 bg-white rounded-2xl p-4 shadow-[#de853c]">04</div>
              <div className="col-span-2 bg-white rounded-2xl p-4 shadow-[#de853c]">05</div>
              <div className="col-span-1 bg-white rounded-2xl p-4 shadow-[#de853c]">06</div>
            </div>
          </div>

          <section className="flex items-center justify-center mt-8">
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
        </div>
      </section>
    </section>
  )
}
