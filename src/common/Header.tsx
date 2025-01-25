import { memo, PropsWithChildren, ReactNode } from 'react'
import classNames from 'classnames'
import { HeaderDiv } from '@src/ui/HeaderDiv'
import { Close, Maximize, Minimize } from '@src/ui/Icons'

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
    <HeaderDiv className={classNames('h-[1.6rem] flex justify-between  border-b-2 ')}>
      <div className="drag-area flex-1"></div>
      {children ?? <div className="flex-[2]"></div>}
      {window.versions.platform == 'win32' ? (
        <div className="flex-1 flex ">
          <div className="flex-1 drag-area "></div>
          <div className="flex px-2   gap-2 justify-center items-center">
            <span
              className={classNames(
                'cursor-pointer hover:bg-slate-300  rounded-sm px-1  hover:text-gray-900 transition-all duration-300'
              )}
              onClick={() => window.controller.minimize()}
            >
              <Minimize />
            </span>
            <span
              className={classNames(
                'cursor-pointer hover:bg-slate-300  rounded-sm px-1  hover:text-gray-900 transition-all duration-300'
              )}
              onClick={() => window.controller.maximize()}
            >
              <Maximize />
            </span>
            <span
              className={classNames(
                'cursor-pointer hover:bg-red-600  hover:text-white  rounded-sm px-1   transition-all duration-300'
              )}
              onClick={() => window.controller.close()}
            >
              <Close />
            </span>
          </div>
        </div>
      ) : (
        <div className="drag-area flex-1"></div>
      )}
    </HeaderDiv>
  )
})
