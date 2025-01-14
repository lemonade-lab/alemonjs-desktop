import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import classNames from 'classnames'
import { RootState } from '@src/store'
import { useDispatch, useSelector } from 'react-redux'
import { setCommand } from '@src/store/command'

interface Sidebar {
  expansions_name: string
  name: string
  commond: string
}

const createTextHtmlURL = (html: string) =>
  `data:text/html;charset=utf-8,${encodeURIComponent(html)}`

export default function ConfigEdit() {
  const command = useSelector((state: RootState) => state.command)
  const app = useSelector((state: RootState) => state.app)
  const dispatch = useDispatch()
  const [view, setView] = useState('')
  const expansions = useSelector((state: RootState) => state.expansions)
  const viewRef = useRef<HTMLWebViewElement>(null)
  const [viewSidebars, setViewSidebars] = useState<Sidebar[]>([])

  const key2 = 'webview-sidebar-load'

  useEffect(() => {
    const sidebarsItem =
      expansions.package?.flatMap(item => {
        return (
          item.alemonjs?.desktop?.sidebars?.map((sidebar: { name: string; commond: string }) => ({
            ...sidebar,
            expansions_name: item.name
          })) || []
        )
      }) || []
    setViewSidebars(sidebarsItem)

    const handleMessage = (data: any) => {
      try {
        if (data.type === key2) {
          setView(data.data)
        }
      } catch (error) {
        console.error('ConfigEdit 消息解析失败:', error)
      }
    }

    window.expansions.onMessage(handleMessage)
  }, [expansions.package])

  useEffect(() => {
    if (view && viewRef.current) {
      const handleConsoleMessage = (e: any) => {
        if (e.level === 1) {
          console.log(e.message)
        } else if (e.level === 2) {
          console.warn(e.message)
        } else {
          console.error(e.message)
        }
      }
      viewRef.current.addEventListener('console-message', handleConsoleMessage)
      return () => {
        viewRef.current &&
          viewRef.current.removeEventListener('console-message', handleConsoleMessage)
      }
    }
  }, [view])

  const handleSidebarClick = useCallback(
    (viewItem: Sidebar) => {
      dispatch(setCommand(viewItem.commond))
      window.expansions.postMessage({
        type: 'command',
        data: viewItem.commond
      })
    },
    [dispatch]
  )

  return (
    <section className="animate__animated animate__fadeIn flex flex-col flex-1 shadow-md">
      <div className="flex flex-1">
        <div className="flex flex-col flex-1 h-[calc(100vh-2rem)] bg-[var(--primary-bg-front)]">
          {view ? (
            <webview
              ref={viewRef}
              preload={`file://${app.resourcesPath}/preload/webview.js`}
              src={createTextHtmlURL(view)}
              className="w-full h-full"
            />
          ) : (
            <div className="flex-1 flex justify-center items-center">
              <div className="flex-col flex justify-center items-center">
                {viewSidebars.length === 0
                  ? '未找到相关扩展，请前往商场下载'
                  : '可选择左侧导航栏中的选项进行查看'}
              </div>
            </div>
          )}
        </div>
        <nav className="min-w-14 border-l">
          {viewSidebars.map((viewItem, index) => (
            <div
              key={index}
              onClick={() => handleSidebarClick(viewItem)}
              className={classNames(
                'p-2 w-full h-14 text-sm relative flex cursor-pointer justify-center items-center hover:bg-slate-200',
                {
                  'bg-[var(--primary-bg-front)]': viewItem.commond === command.name
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
