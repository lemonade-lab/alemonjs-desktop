import { useState } from 'react'
import classNames from 'classnames'
import About from './About'
import UpdateLog from './UpdateLog'
import Common from './Common'
import Npmrc from './Npmrc'
import Theme from './Theme'
import { SecondaryDiv, SidebarDiv, TagDiv } from '@src/ui/Div'
export default function SettingApp() {
  const [view, setView] = useState(0)
  const datas = [
    {
      name: '通用',
      value: 'common',
      com: <Common />
    },
    {
      name: '主题',
      value: 'theme',
      com: <Theme />
    },
    {
      name: '记录',
      value: 'log',
      com: <UpdateLog />
    },
    {
      name: '配置',
      value: 'npmrc',
      com: <Npmrc />
    },
    {
      name: '关于',
      value: 'about',
      com: <About />
    }
  ]
  return (
    <section className="flex flex-col flex-1 shadow-md">
      <div className="flex flex-1">
        <SecondaryDiv className="flex flex-col flex-1">{datas[view].com}</SecondaryDiv>
        <SidebarDiv className="min-w-14 border-l">
          {datas.map((viewItem, index) => (
            <TagDiv
              key={index}
              onClick={() => {
                setView(index)
              }}
              className={classNames(
                'p-2 w-full h-14 text-sm relative flex cursor-pointer justify-center items-center duration-700 transition-all  ',
                {
                  'bg-secondary-bg': view == index
                }
              )}
            >
              {viewItem.name}
              {view == index && (
                <div className="absolute top-0 right-0 h-full border-r-2 border-slate-500"></div>
              )}
            </TagDiv>
          ))}
        </SidebarDiv>
      </div>
    </section>
  )
}
