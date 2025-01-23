import classNames from 'classnames'
import { createContext, useState, ReactNode } from 'react'
// 创建上下文类型
type ModalContextType = {
  set: (val: ReactNode, open?: boolean) => void
  isActive: () => boolean // 获取 是否激活状态
  close: () => void // 关闭
}
// 创建上下文并提供默认值
const ModalContext = createContext<ModalContextType | undefined>(undefined)
export { ModalContext }
export default function ModalProvider({ children }: { children: ReactNode }) {
  const [component, setComponent] = useState<ReactNode | null>(null)
  const [show, setShow] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(true)
  // 是否激活
  const isActive = () => show
  // 关闭 modal
  const close = () => setShow(false)
  //
  const set = (com: ReactNode, open = false) => {
    if (show) return
    if (open) {
      // 强制更新
      setOpen(false)
      setTimeout(() => setOpen(true))
    }
    setShow(true)
    setComponent(com)
  }
  return (
    <ModalContext.Provider value={{ set: set, isActive, close }}>
      {isActive() && <div className="z-10 flex-1 h-full w-full fixed bg-black bg-opacity-30"></div>}
      {open && (
        <div
          className={classNames(
            'z-50 fixed top-1/2 space-y-2 left-1/2 transform -translate-x-1/2  -translate-y-1/2',
            { hidden: !isActive() }
          )}
        >
          <div className="flex flex-col gap-1 md:gap-2 justify-center items-center">
            <div className="w-full flex flex-col border shadow-sm rounded-xl pointer-events-auto dark:bg-slate-800 dark:border-slate-400 dark:shadow-slate-700/70">
              {component}
            </div>
          </div>
        </div>
      )}
      <div className="z-0 flex-1 h-full w-full ">{children}</div>
    </ModalContext.Provider>
  )
}
