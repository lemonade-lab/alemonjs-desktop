import { useNotification } from '@/context/Notification'
import useNetworkSpeed from '@/hook/useNetworkSpeed'
import { RootState } from '@/store'
import { BarDiv } from '@alemonjs/react-ui'
import { Pause, Play } from '@/common/Icons'
import { Input } from '@alemonjs/react-ui'
import { PrimaryDiv } from '@alemonjs/react-ui'
import { SecondaryDiv } from '@alemonjs/react-ui'
import { Tooltip } from '@alemonjs/react-ui'
import classNames from 'classnames'
import { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppstoreOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { AntdIcon } from '@/common/AntdIcon'
import { setCommand } from '@/store/command'
interface Sidebar {
  expansions_name: string
  name: string
  icon: string
  commond: string
}

export default function WordBox() {
  const notification = useNotification()
  const dispatch = useDispatch()

  const modules = useSelector((state: RootState) => state.modules)
  const expansions = useSelector((state: RootState) => state.expansions)
  const app = useSelector((state: RootState) => state.app)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [conmond, setCommond] = useState<Sidebar[]>([])
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  const [view, setView] = useState('')

  // 公共样式常量
  const onClose = () => {
    setIsDropdownOpen(false)
  }

  // 点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current) {
        const target = event.target as HTMLElement
        if (!dropdownRef.current?.contains(target)) {
          setIsDropdownOpen(false)
        }
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    const commondItem =
      expansions.package?.flatMap((item: any) => {
        return (
          item.alemonjs?.desktop?.commond?.map((sidebar: any) => ({
            ...sidebar,
            expansions_name: item.name
          })) || []
        )
      }) || []
    setCommond(commondItem)
  }, [expansions.package])

  const { networkSpeed } = useNetworkSpeed()

  const createIconURL = (viewItem: Sidebar) => {
    return `resource://-/${app.userDataTemplatePath}/node_modules/${viewItem.expansions_name}/${viewItem.icon}`
  }

  const createIcon = (viewItem: Sidebar) => {
    if (!viewItem.icon) return <AppstoreOutlined />
    if (viewItem.icon.startsWith('antd.')) {
      // 是antd的图标
      const icon = viewItem.icon.split('.')[1]
      return <AntdIcon className="text-xl" defaultIcon={<AppstoreOutlined />} icon={icon} />
    }
    return (
      <img
        className="size-4 rounded-md flex justify-center items-center"
        src={createIconURL(viewItem)}
      ></img>
    )
  }

  return (
    <div className="flex-[6] flex gap-2 justify-between items-center">
      {isDropdownOpen ? (
        <div
          ref={dropdownRef}
          className="absolute top-0 p-1 left-1/2 transform -translate-x-1/2  z-10"
        >
          <PrimaryDiv className={classNames('rounded-md  shadow-md p-1')}>
            <Input
              type="text"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              // 回车
              onKeyUp={(e: any) => {
                // const commands = ['open.devtools']
                if (e.key === 'Enter') {
                  const value = e.target.value

                  // 记录当前的命令
                  dispatch(setCommand(value))

                  // 关闭下拉菜单
                  setIsDropdownOpen(false)
                }
              }}
              placeholder="input command"
              className="border rounded-md min-w-72 px-2 py-1"
              aria-label="Command Input"
            />
            <div className="py-2 flex flex-col gap-2 scrollbar overflow-auto  max-h-[calc(100vh/5*2)]">
              {conmond.map((item, index) => (
                <PrimaryDiv
                  hover={true}
                  key={index}
                  onClick={() => {
                    if (!modules.nodeModulesStatus) return

                    // 记录当前的命令
                    dispatch(setCommand(item.commond))

                    // 关闭下拉菜单
                    setIsDropdownOpen(false)
                  }}
                  className={classNames(
                    'flex justify-between px-2 py-1 cursor-pointer duration-700 transition-all   rounded-md'
                  )}
                >
                  <div className="flex gap-2">
                    <div className="flex items-center justify-center ">{createIcon(item)}</div>
                    <div className="flex items-center justify-center ">{item.name}</div>
                  </div>
                  <div className="text-secondary-text">{item.commond}</div>
                </PrimaryDiv>
              ))}
            </div>
            <div className="flex justify-end">
              <BarDiv
                onClick={onClose}
                className=" duration-700 rounded-full p-1 transition-all  cursor-pointer"
              >
                <CloseCircleOutlined />
              </BarDiv>
            </div>
          </PrimaryDiv>
        </div>
      ) : (
        <>
          <div className=" flex-1 flex items-center ">
            <div className="text-[0.7rem] drag-area flex-1 flex justify-end">
              {networkSpeed && (
                <div className="flex gap-1 items-center">
                  <div>{networkSpeed.downlink}</div>
                  <div>MB/s</div>
                  <div>RTT</div>
                  <div>{networkSpeed.rtt}</div>
                  <div>ms</div>
                </div>
              )}
            </div>
          </div>
          <div className=" flex-1 flex items-center justify-center">
            <div
              ref={dropdownRef}
              className="w-full relative steps-3 "
              onClick={() => {
                // 检查是否加载完毕
                if (!modules.nodeModulesStatus) {
                  // 通知
                  notification('依赖未加载', 'warning')
                  return
                }
                setIsDropdownOpen(prev => !prev)
              }}
              aria-expanded={isDropdownOpen}
              role="button"
            >
              <SecondaryDiv className="text-sm  cursor-pointer border flex justify-center items-center h-[1.1rem] rounded-md">
                <span className="">input command</span>
              </SecondaryDiv>
            </div>
          </div>
          <div
            className={classNames('flex-1 flex items-center', {
              'drag-area h-full': !modules.nodeModulesStatus
            })}
          >
            {
              // 当依赖加载完毕后再显示操作按钮
            }
            <div className="flex flex-1">
              <div className="steps-2 flex justify-center items-center">
                <Tooltip text="运行扩展器">
                  {expansions.runStatus ? (
                    <div
                      className=" "
                      onClick={() => {
                        window.expansions.close()
                      }}
                    >
                      <Pause width={20} height={20} />
                    </div>
                  ) : (
                    <div
                      className=" "
                      onClick={() => {
                        if (!modules.nodeModulesStatus) {
                          notification('依赖未加载', 'warning')
                          return
                        }
                        window.expansions.run([])
                      }}
                    >
                      <Play width={20} height={20} />
                    </div>
                  )}
                </Tooltip>
              </div>
              <div className="drag-area flex-1 "></div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
