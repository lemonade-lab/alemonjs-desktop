import { PropsWithChildren, ReactNode } from 'react'
import { CloseIcon, MaximizeIcon, MinimizeIcon } from './Icons'

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
export default function Header({ children, RightSlot, LeftSlot }: HeaderProps) {
  return (
    <>
      {window.versions.platform == 'win32' && (
        <section className="h-9 flex bg-[#FEF6EA] border-b-2  border-white">
          {LeftSlot}
          {children}
          <div className="flex px-2 h-full  gap-3 justify-center items-center">
            <span
              className="cursor-pointer hover:bg-slate-100  rounded-md p-1 text-[#606266] hover:text-gray-900 transition-all duration-300"
              onClick={() => window.controller.minimize()}
            >
              <MinimizeIcon />
            </span>

            <span
              className="cursor-pointer hover:bg-slate-100  rounded-md p-1 text-[#606266] hover:text-gray-900 transition-all duration-300"
              onClick={() => window.controller.maximize()}
            >
              <MaximizeIcon />
            </span>

            <span
              className="cursor-pointer hover:bg-red-600 hover:text-white  rounded-md p-1 text-[#606266] hover:text-gray-900 transition-all duration-300"
              onClick={() => window.controller.close()}
            >
              <CloseIcon />
            </span>
          </div>
        </section>
      )}

      {window.versions.platform != 'win32' && (
        <section className="h-6 flex bg-[#FEF6EA] border-b-2  border-white">
          {children}
          {RightSlot ?? <></>}
        </section>
      )}
    </>
  )
}
