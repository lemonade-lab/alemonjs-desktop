import { memo, PropsWithChildren, ReactNode } from 'react'
import { CloseIcon, MaximizeIcon, MinimizeIcon } from '@src/common/Icons'

type HeaderProps = PropsWithChildren<{
  LeftSlot?: ReactNode
  RightSlot?: ReactNode
}>

/**
 * 卡槽
 * win系统渲染 left
 * 其他系统渲染rgit
 * @param param0
 * @returns
 */
export default memo(function Header({ children }: HeaderProps) {
  return (
    <header className="h-[1.6rem] flex justify-between  bg-[var(--secondary-bg-front)] border-b-2  border-white">
      <div className="drag-area flex-1"></div>
      {children ?? <div></div>}
      {window.versions.platform == 'win32' ? (
        <div className="flex-1 flex justify-end items-center">
          <div className="flex px-2 py-[0.1rem] h-full gap-2 justify-center items-center">
            <span
              className="cursor-pointer hover:bg-slate-300  rounded-sm px-1 text-[var(--primary-text)] hover:text-gray-900 transition-all duration-300"
              onClick={() => window.controller.minimize()}
            >
              <MinimizeIcon />
            </span>
            <span
              className="cursor-pointer hover:bg-slate-300  rounded-sm px-1 text-[var(--primary-text)] hover:text-gray-900 transition-all duration-300"
              onClick={() => window.controller.maximize()}
            >
              <MaximizeIcon />
            </span>
            <span
              className="cursor-pointer hover:bg-red-600 hover:text-white  rounded-sm px-1 text-[var(--primary-text)]  transition-all duration-300"
              onClick={() => window.controller.close()}
            >
              <CloseIcon />
            </span>
          </div>
        </div>
      ) : (
        <div className="drag-area flex-1"></div>
      )}
    </header>
  )
})
