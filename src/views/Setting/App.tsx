import { useState } from 'react'
import classNames from 'classnames'
import About from './About'
export default function SettingApp() {
  const [view, setView] = useState(0)
  const datas = [
    {
      name: '关于',
      value: 'about',
      com: <About />
    }
  ]
  const [viewSidebars, setViewSidebars] = useState<{ name: string; value: number }[]>([
    {
      name: '关于',
      value: 0
    }
  ])
  return (
    <section className="flex flex-col flex-1 shadow-md">
      <div className="flex flex-1">
        <div className="flex flex-col flex-1 h-[calc(100vh-2rem)] bg-[var(--primary-bg-front)]">
          {datas[view].com}
        </div>
        <nav className="min-w-14 border-l">
          {viewSidebars.map((viewItem, index) => (
            <div
              key={index}
              onClick={() => {
                setView(viewItem.value)
              }}
              className={classNames(
                'p-2 size-14 text-sm flex cursor-pointer justify-center items-center hover:bg-slate-200',
                'border-r-2',
                {
                  'bg-[var(--primary-bg-front)] border-r-2 border-slate-500':
                    viewItem.value === index
                }
              )}
            >
              {viewItem.name}
            </div>
          ))}
        </nav>
      </div>
    </section>
  )
}
