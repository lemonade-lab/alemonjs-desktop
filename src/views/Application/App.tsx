import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import classNames from 'classnames'
import { RootState } from '@src/store'
import { useDispatch, useSelector } from 'react-redux'
import { setCommand } from '@src/store/command'
import { useLocation } from 'react-router-dom'
import { SecondaryDiv, SidebarDiv, TagDiv } from '@src/ui/Div'

interface Sidebar {
  expansions_name: string
  name: string
  commond: string
}

const createTextHtmlURL = (html: string) =>
  `data:text/html;charset=utf-8,${encodeURIComponent(html)}`

export default function Webviews() {
  const location = useLocation()

  const command = useSelector((state: RootState) => state.command)
  const app = useSelector((state: RootState) => state.app)
  const dispatch = useDispatch()
  const [view, setView] = useState('')
  const expansions = useSelector((state: RootState) => state.expansions)
  const viewRef = useRef<HTMLWebViewElement>(null)
  const [viewSidebars, setViewSidebars] = useState<Sidebar[]>([])

  const handleSidebarClick = useCallback(
    (viewItem: Sidebar) => {
      // 记录当前的命令
      dispatch(setCommand(viewItem.commond))

      // 应该是 viewItem
      window.expansions.postMessage({
        type: 'command',
        data: viewItem.commond
      })

      //
    },
    [dispatch]
  )

  useEffect(() => {
    if (location.state?.view) {
      setView(location.state.view)
    }
  }, [location.state])

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

  return (
    <section className=" flex flex-col flex-1 shadow-md">
      <div className="flex flex-1">
        <SecondaryDiv className="animate__animated animate__fadeIn flex flex-col flex-1 ">
          {view ? (
            <webview
              ref={viewRef}
              preload={`file://${app.preloadPath}/webview.js`}
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
        </SecondaryDiv>
        <SidebarDiv className="min-w-14 border-l">
          {viewSidebars.map((viewItem, index) => (
            <TagDiv
              key={index}
              onClick={() => handleSidebarClick(viewItem)}
              className={classNames(
                'p-2 w-full h-14 text-sm relative flex cursor-pointer justify-center items-center duration-700 transition-all  ',
                { 'bg-secondary-bg': viewItem.commond === command.name }
              )}
            >
              {viewItem.name}
              {view && viewItem.commond === command.name && (
                <div className="absolute top-0 right-0 h-full border-r-2 border-slate-500"></div>
              )}
            </TagDiv>
          ))}
        </SidebarDiv>
      </div>
    </section>
  )
}
