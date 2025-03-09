import React, { useEffect, useRef, useState, useCallback, useMemo, createElement } from 'react'
import classNames from 'classnames'
import { RootState } from '@/store'
import { useDispatch, useSelector } from 'react-redux'
import { setCommand } from '@/store/command'
import { useLocation } from 'react-router-dom'
import { SecondaryDiv } from '@alemonjs/react-ui'
import { SidebarDiv } from '@alemonjs/react-ui'
import { TagDiv } from '@alemonjs/react-ui'
import { AntdIcon } from '@/common/AntdIcon'

interface Sidebar {
  expansions_name: string
  name: string
  icon: string
  commond: string
}

const createTextHtmlURL = (html: string) =>
  `data:text/html;charset=utf-8,${encodeURIComponent(html)}`

export default function Webviews() {
  const location = useLocation()
  const dispatch = useDispatch()
  const expansions = useSelector((state: RootState) => state.expansions)
  const command = useSelector((state: RootState) => state.command)
  const app = useSelector((state: RootState) => state.app)
  const [viewSidebars, setViewSidebars] = useState<Sidebar[]>([])
  const viewRef = useRef<HTMLWebViewElement>(null)
  const [view, setView] = useState('')

  // 点击侧边栏
  const handleSidebarClick = (viewItem: Sidebar) => {
    if (viewItem.commond === command.name) {
      return
    }
    // 记录当前的命令
    dispatch(setCommand(viewItem.commond))
  }

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

  // 创建图标地址
  const createIconURL = (viewItem: Sidebar) => {
    return `resource://-/${app.userDataTemplatePath}/node_modules/${viewItem.expansions_name}/${viewItem.icon}`
  }

  const createIcon = (viewItem: Sidebar) => {
    if (!viewItem.icon) return viewItem.name
    if (viewItem.icon.startsWith('antd.')) {
      // 是antd的图标
      const icon = viewItem.icon.split('.')[1]
      return <AntdIcon className="text-4xl" defaultIcon={viewItem.name} icon={icon} />
    }
    return (
      <img
        className="size-12 flex justify-center items-center rounded-md"
        src={createIconURL(viewItem)}
      ></img>
    )
  }

  return (
    <section className=" flex flex-col flex-1 shadow-md">
      <div className="flex flex-1">
        <SecondaryDiv className="animate__animated animate__fadeIn flex flex-col flex-1 ">
          {/* { (
            <div className="flex-1 flex justify-center items-center">
              <div className="flex-col flex justify-center items-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-bg">
                  <LoadingOutlined />
                </div>
                <div className="mt-2">加载中...</div>
              </div>
            </div>
          )} */}
          {view && (
            <webview
              ref={viewRef}
              preload={`file://${app.preloadPath}/webview.js`}
              src={createTextHtmlURL(view)}
              className="w-full h-full"
            />
          )}
          {!view && (
            <div className="flex-1 flex justify-center items-center">
              <div className="flex-col flex justify-center items-center">
                {viewSidebars.length === 0
                  ? '未找到相关扩展，请前往商场下载'
                  : '可选择右侧导航栏中的应用进行查看'}
              </div>
            </div>
          )}
        </SecondaryDiv>
        <SidebarDiv className="animate__animated animate__fadeInRight duration-500 flex flex-col  w-72 xl:w-80 border-l h-full">
          <div className="flex flex-wrap gap-1 p-1">
            {viewSidebars
              .sort(item => {
                if (item.name == 'APPS') return -1
                return /@alemonjs-/.test(item.expansions_name) ? -1 : 1
              })
              .map((viewItem, index) => (
                <TagDiv
                  key={index}
                  onClick={() => handleSidebarClick(viewItem)}
                  className={classNames(
                    'p-1 size-[3.28rem] rounded-md border text-sm relative flex cursor-pointer justify-center items-center duration-700 transition-all  ',
                    { 'bg-secondary-bg': viewItem.commond === command.name }
                  )}
                >
                  {createIcon(viewItem)}
                </TagDiv>
              ))}
          </div>
        </SidebarDiv>
      </div>
    </section>
  )
}
