import { CloseIcon, Pause, Play } from '@src/common/Icons'
import useGoNavigate from '@src/hook/navigate'
import useNetworkSpeed from '@src/hook/useNetworkSpeed'
import { RootState } from '@src/store'
import { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'

export default function WordBox() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const dropdownRef = useRef<HTMLDivElement | null>(null)
  const [conmond, setCommond] = useState<
    { expansions_name: string; name: string; commond: string }[]
  >([])
  const modules = useSelector((state: RootState) => state.modules)
  const expansions = useSelector((state: RootState) => state.expansions)

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

  const navigate = useGoNavigate()

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

  return (
    <div className="flex-[6] flex gap-2 justify-between items-center">
      {isDropdownOpen ? (
        <div
          ref={dropdownRef}
          className=" absolute top-0 p-1 left-1/2 transform -translate-x-1/2 bg-[var(--alemonjs-primary-bg)] border-slate-300 bg-opacity-95 rounded-md  shadow-md z-10"
        >
          <input
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            placeholder="input command ..."
            className="border rounded-md min-w-72 px-2 py-1"
            aria-label="Command Input"
          />
          <div className="">
            <div className="py-1 flex flex-col gap-2  scrollbar overflow-auto  max-h-[calc(100vh/5*2)]">
              {conmond.map((item, index) => (
                <div
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
                  className="flex text-slate-600 justify-between px-2 py-1 cursor-pointer duration-700 transition-all  hover:bg-gray-300 hover:bg-opacity-80 rounded-md"
                >
                  <div>{item.name}</div>
                  <div className="text-slate-400">{item.commond}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end">
            <span
              onClick={onClose}
              className="text-[var(--alemonjs-notification-text)] duration-700 transition-all  hover:text-[--primary-color] cursor-pointer"
            >
              <CloseIcon />
            </span>
          </div>
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
              className="w-full relative text-sm text-slate-400 cursor-pointer border flex justify-center items-center   h-5 rounded-md bg-[var(--alemonjs-secondary-bg)]"
              onClick={() => setIsDropdownOpen(prev => !prev)}
              aria-expanded={isDropdownOpen}
              role="button"
            >
              <span className="">input command</span>
            </div>
          </div>
          <div className=" flex-1 flex items-center">
            {
              // 当依赖加载完毕后再显示操作按钮
            }
            <div className="flex flex-1">
              {modules.nodeModulesStatus && (
                <div className="cursor-pointer">
                  {expansions.runStatus ? (
                    <div
                      onClick={() => {
                        window.expansions.close()
                      }}
                    >
                      <Pause width={20} height={20} />
                    </div>
                  ) : (
                    <div
                      onClick={() => {
                        window.expansions.run([])
                      }}
                    >
                      <Play width={20} height={20} />
                    </div>
                  )}
                </div>
              )}
              <div className="drag-area flex-1"></div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
