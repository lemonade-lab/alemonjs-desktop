import { useEffect, useState } from 'react'
import logoURL from '@src/assets/logo.jpg'
import classNames from 'classnames'
import { RootState } from '@src/store'
import { useDispatch, useSelector } from 'react-redux'
import { setCommand } from '@src/store/command'

const createTextHtmlURL = (html: string) =>
  `data:text/html;charset=utf-8,${encodeURIComponent(html)}`

export default function ConfigEdit() {
  const command = useSelector((state: RootState) => state.command)
  const dispatch = useDispatch()

  const [view, setView] = useState('')

  // 扩展信息
  const [viewSidebars, setViewSidebars] = useState<
    {
      expansions_name: string
      name: string
      commond: string
    }[]
  >([])

  const key = 'get-expansions'
  const key2 = 'load-sidebar-webview'

  useEffect(() => {
    // 发送消息给扩展 获取扩展信息
    window.expansions.postMessage(JSON.stringify({ type: key }))

    // 监听消息
    window.expansions.onMessage((data: string) => {
      try {
        const res = JSON.parse(data)
        // 解析消息
        if (res.type === key) {
          if (Array.isArray(res.data)) {
            const sidebarsItem = []
            for (const item of res.data) {
              const sidebars = item.alemonjs?.desktop?.sidebars
              if (Array.isArray(sidebars)) {
                for (const sidebar of sidebars) {
                  sidebarsItem.push({
                    ...sidebar,
                    // 扩展名
                    expansions_name: item.name
                  })
                }
              }
            }
            setViewSidebars(sidebarsItem)
          }
        } else if (res.type === key2) {
          console.log('res.data', res.data)

          // 立即渲染 webview。
          setView(res.data)
        }
      } catch {
        console.error('ConfigEdit 解析消息失败')
      }
    })
  }, [])

  return (
    <section className="flex flex-col flex-1  shadow-md">
      {/* 主内容区 */}
      <div className="flex flex-1">
        {/* Webview 显示区 */}
        <div className="flex flex-col flex-1 h-[calc(100vh-2rem)] bg-[var(--primary-bg-front)]">
          {view != '' ? (
            <webview
              // nodeintegration={false}
              nodeintegration
              // contextIsolation={true}
              disablewebsecurity
              src={createTextHtmlURL(view)}
              className="w-full h-full"
            />
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
        <nav className="min-w-14 border-l ">
          {viewSidebars.map((view, index) => (
            <div
              key={index}
              onClick={() => {
                // 设置 command
                dispatch(setCommand(view.commond))

                window.expansions.postMessage(
                  JSON.stringify({
                    type: `command`,
                    data: view.commond
                  })
                )
              }}
              className={classNames(
                'p-2 size-14 text-sm flex cursor-pointer  justify-center items-center hover:bg-slate-200',
                'border-r-2',
                {
                  'bg-[var(--primary-bg-front)] border-r-2 border-slate-500':
                    view.commond === command.name
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
