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
  const viewRef = useRef<HTMLWebViewElement>(null)

  const [viewSidebars, setViewSidebars] = useState<
    { expansions_name: string; name: string; commond: string }[]
  >([])

  useEffect(() => {
    const postMessage = (event: any) => {
      console.log('data', event.data)
    }

    if (view != '' && viewRef.current) {
      viewRef.current.addEventListener('ipc-message', postMessage)

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

      const loadstart = () => {
        console.log('loadstart')
      }

      const loadstop = () => {
        console.log('loadstop')
      }

      viewRef.current.addEventListener('did-start-loading', loadstart)
      viewRef.current.addEventListener('did-stop-loading', loadstop)
    }
  }, [view])

  const key = 'get-expansions'
  const key2 = 'load-sidebar-webview'

  useEffect(() => {
    if (window.expansions) {
      window.expansions.postMessage(JSON.stringify({ type: key }))

      window.expansions.onMessage((data: string) => {
        try {
          const res = JSON.parse(data)
          if (res.type === key) {
            const sidebarsItem =
              res.data?.flatMap((item: any) => {
                return (
                  item.alemonjs?.desktop?.sidebars?.map((sidebar: any) => ({
                    ...sidebar,
                    expansions_name: item.name
                  })) || []
                )
              }) || []
            setViewSidebars(sidebarsItem)
          } else if (res.type === key2) {
            setView(res.data)
          }
        } catch (error) {
          console.error('ConfigEdit 消息解析失败:', error)
        }
      })
    }
  }, [])

  return (
    <section className="flex flex-col flex-1 shadow-md">
      <div className="flex flex-1">
        <div className="flex flex-col flex-1 h-[calc(100vh-2rem)] bg-[var(--primary-bg-front)]">
          {view ? (
            <webview
              ref={viewRef}
              nodeintegration="false"
              disablewebsecurity="false"
              // disablewebsecurity
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
                window.expansions.postMessage(
                  JSON.stringify({
                    type: 'command',
                    data: viewItem.commond
                  })
                )
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
