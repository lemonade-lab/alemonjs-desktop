import { useNotification } from '@src/context/Notification'
import useNetworkSpeed from '@src/hook/useNetworkSpeed'
import { RootState } from '@src/store'
import { BarDiv } from '@src/component/BarDiv'
import { AlignTextCenter, Close, Pause, Play } from '@src/component/Icons'
import { Input } from '@src/component/Input'
import { PrimaryDiv } from '@src/component/PrimaryDiv'
import { SecondaryDiv } from '@src/component/SecondaryDiv'
import { Tooltip } from '@src/component/Tooltip'
import classNames from 'classnames'
import { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
interface Sidebar {
  expansions_name: string
  name: string
  icon: string
  commond: string
}

export default function WordBox() {
  const app = useSelector((state: RootState) => state.app)

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const dropdownRef = useRef<HTMLDivElement | null>(null)
  const [conmond, setCommond] = useState<Sidebar[]>([])
  const modules = useSelector((state: RootState) => state.modules)
  const expansions = useSelector((state: RootState) => state.expansions)
  const notification = useNotification()

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

  const { networkSpeed, connectionType } = useNetworkSpeed()

  const createIconURL = (viewItem: Sidebar) => {
    return `resource://-/${app.userDataTemplatePath}/node_modules/${viewItem.expansions_name}/${viewItem.icon}`
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
              placeholder="input command"
              className="border rounded-md min-w-72 px-2 py-1"
              aria-label="Command Input"
            />
            <div className="py-2 flex flex-col gap-2 scrollbar overflow-y-auto  max-h-[calc(100vh/5*2)]">
              {conmond.map((item, index) => (
                <PrimaryDiv
                  hover={true}
                  key={index}
                  onClick={() => {
                    if (!modules.nodeModulesStatus) return
                    // 只负责发送消息
                    window.expansions.postMessage({
                      type: 'command',
                      data: item.commond
                    })
                    // 关闭下拉菜单
                    setIsDropdownOpen(false)
                  }}
                  className={classNames(
                    'flex justify-between px-2 py-1 cursor-pointer duration-700 transition-all   rounded-md'
                  )}
                >
                  <div className="flex gap-2">
                    <div className="flex items-center justify-center ">
                      {item.icon ? (
                        <img className="size-4 rounded-md" src={createIconURL(item)}></img>
                      ) : (
                        <AlignTextCenter width={16} height={16} />
                      )}
                    </div>
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
                <Close />
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
                    className="steps-2 "
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
              <div className="drag-area flex-1 "></div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
