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
        <section className="h-9 flex bg-gradient-to-tl from-sky-900 to-indigo-900">
          {LeftSlot}
          {children}
          <div className="flex px-2 h-full">
            <div className="flex gap-4 justify-center items-center">
              <MinimizeIcon
                className="size-[1.5rem] text-white  cursor-pointer hover:bg-slate-100 hover:text-slate-700 rounded-md"
                onClick={() => window.controller.minimize()}
              />
              <MaximizeIcon
                className="size-[1.5rem] text-white cursor-pointer hover:bg-slate-100 hover:text-slate-700 rounded-md"
                onClick={() => window.controller.maximize()}
              />
              <CloseIcon
                className="size-[1.5rem] text-white cursor-pointer hover:bg-red-600 rounded-md"
                onClick={() => window.controller.close()}
              />
            </div>
          </div>
        </section>
      )}
      {window.versions.platform != 'win32' && (
        <section className="h-6 flex bg-gradient-to-tl from-sky-900 to-indigo-900">
          {children}
          {RightSlot ?? <></>}
        </section>
      )}
    </>
  )
}
