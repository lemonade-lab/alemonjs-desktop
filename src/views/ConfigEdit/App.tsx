import { useEffect, useRef, useState } from 'react'
import logoURL from '@src/assets/logo.jpg'
import classNames from 'classnames'
import { RootState } from '@src/store'
import { useDispatch, useSelector } from 'react-redux'
import { setCommand } from '@src/store/command'

const createTextHtmlURL = (html: string) =>
  `data:text/html;charset=utf-8,${encodeURIComponent(html)}`

export default function ConfigEdit() {
  const command = useSelector((state: RootState) => state.command)
  const app = useSelector((state: RootState) => state.app)
  const dispatch = useDispatch()
  const [view, setView] = useState('')
  const expansions = useSelector((state: RootState) => state.expansions)
  const viewRef = useRef<HTMLWebViewElement>(null)
  const [viewSidebars, setViewSidebars] = useState<
    { expansions_name: string; name: string; commond: string }[]
  >([])

  const key2 = 'webview-sidebar-load'

  useEffect(() => {
    const sidebarsItem =
      expansions.package?.flatMap((item: any) => {
        return (
          item.alemonjs?.desktop?.sidebars?.map((sidebar: any) => ({
            ...sidebar,
            expansions_name: item.name
          })) || []
        )
      }) || []
    setViewSidebars(sidebarsItem)
    window.expansions.onMessage(data => {
      try {
        if (data.type === key2) {
          setView(data.data)
        }
      } catch (error) {
        console.error('ConfigEdit 消息解析失败:', error)
      }
    })
  }, [expansions.package])

  useEffect(() => {
    if (view != '' && viewRef.current) {
      viewRef.current.addEventListener('console-message', (e: any) => {
        // 根据消息类型进行log
        if (e.level === 1) {
          console.log(e.message)
        } else if (e.level === 2) {
          console.warn(e.message)
        } else {
          console.error(e.message)
        }
      })
    }
  }, [view])

  return (
    <section className="flex flex-col flex-1 shadow-md">
      <div className="flex flex-1">
        <div className="flex flex-col flex-1 h-[calc(100vh-2rem)] bg-[var(--primary-bg-front)]">
          {view ? (
            <webview
              ref={viewRef}
              preload={`file://${app.path}/preload/webview.js`}
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
        <nav className="min-w-14 border-l">
          {viewSidebars.map((viewItem, index) => (
            <div
              key={index}
              onClick={() => {
                dispatch(setCommand(viewItem.commond))
                window.expansions.postMessage({
                  type: 'command',
                  data: viewItem.commond
                })
              }}
              className={classNames(
                'p-2 size-14 text-sm flex cursor-pointer justify-center items-center hover:bg-slate-200',
                'border-r-2',
                {
                  'bg-[var(--primary-bg-front)] border-r-2 border-slate-500':
                    viewItem.commond === command.name
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
