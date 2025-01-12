import { useEffect, useState } from 'react'
import logoURL from '@src/assets/logo.jpg'
import classNames from 'classnames'
import { RootState } from '@src/store'
import { useDispatch, useSelector } from 'react-redux'
import { data } from './test'
import { setCommand } from '@src/store/command'

const createTextHtmlURL = (html: string) =>
  `data:text/html;charset=utf-8,${encodeURIComponent(html)}`

export default function ConfigEdit() {
  const command = useSelector((state: RootState) => state.command)
  const dispatch = useDispatch()

  const [viewIndex, setViewIndex] = useState(-1)
  const [webviews, setWebviews] = useState(data)

  useEffect(() => {
    // 获取扩展列表。
    setWebviews(data)
  }, [])

  useEffect(() => {
    // 检查是否有指令
    if (command.name) {
      // 查找指令对应的索引
      const index = webviews.findIndex(view => view.event === command.name)
      if (index === -1) {
        // 不存在
        return
      }
      // 设置索引
      setViewIndex(index)
    }
  }, [command])

  return (
    <section className="flex flex-col flex-1  shadow-md">
      {/* 主内容区 */}
      <div className="flex flex-1">
        {/* Webview 显示区 */}
        <div className="flex flex-col flex-1 h-[calc(100vh-2rem)] bg-[var(--primary-bg-front)]">
          {viewIndex != -1 ? (
            <webview src={createTextHtmlURL(webviews[viewIndex].html)} className="w-full h-full" />
          ) : (
            <div className="select-none flex-1 flex-col flex justify-center items-center">
              <div className="flex-col flex">
                <img src={logoURL} alt="logo" className="w-96" />
                <div className="flex-col flex justify-center items-center">
                  可选择左侧导航栏中的选项进行查看
                </div>
              </div>
            </div>
          )}
        </div>
        {/* 右侧导航栏 */}
        <nav className="border-l ">
          {webviews.map((view, index) => (
            <div
              key={index}
              onClick={() => {
                // 设置 command
                dispatch(setCommand(view.event))
              }}
              className={classNames(
                'p-2 size-14 text-sm flex cursor-pointer  justify-center items-center hover:bg-slate-200',
                'border-r-2',
                {
                  'bg-[var(--primary-bg-front)] border-r-2 border-slate-500':
                    view.event === command.name
                }
              )}
            >
              {view.name}
            </div>
          ))}
        </nav>
      </div>
    </section>
  )
}
