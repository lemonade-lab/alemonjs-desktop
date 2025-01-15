import { useState } from 'react'
import classNames from 'classnames'
import About from './About'
import UpdateLog from './UpdateLog'
import Common from './Common'
export default function SettingApp() {
  const [view, setView] = useState(0)
  const datas = [
    {
      name: '关于',
      value: 'about',
      com: <About />
    },
    {
      name: '记录',
      value: 'log',
      com: <UpdateLog />
    },
    {
      name: '通用',
      value: 'common',
      com: <Common />
    }
  ]
  return (
    <section className="animate__animated animate__fadeIn flex flex-col flex-1 shadow-md">
      <div className="flex flex-1">
        <div className="flex flex-col flex-1 h-[calc(100vh-2rem)] bg-[var(--primary-bg-front)]">
          {datas[view].com}
        </div>
        <nav className="min-w-14 border-l">
          {datas.map((viewItem, index) => (
            <div
              key={index}
              onClick={() => {
                setView(index)
              }}
              className={classNames(
                'p-2 w-full h-14 text-sm relative flex cursor-pointer justify-center items-center duration-700 transition-all  hover:bg-slate-200',
                {
                  'bg-[var(--primary-bg-front)] ': view === index
                }
              )}
            >
              {viewItem.name}
              <div className="absolute top-0 right-0 h-full border-r-2 border-slate-500"></div>
            </div>
          ))}
        </nav>
      </div>
    </section>
  )
}
