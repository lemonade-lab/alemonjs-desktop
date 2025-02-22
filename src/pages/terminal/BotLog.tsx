import _ from 'lodash'
import { useEffect, useState } from 'react'
import { RootState } from '@src/store'
import { useDispatch, useSelector } from 'react-redux'
import { useTerminal } from '@src/hook/useTerminal'
import { delMessate } from '@src/store/log'
import { useNotification } from '@src/context/Notification'
import { NavDiv } from '@src/component/NavDiv'
import { ChevronDown } from '@src/component/Icons'
import { SecondaryDiv } from '@src/component/SecondaryDiv'

const RenderResize = (props: React.HTMLAttributes<HTMLDivElement>) => {
  const [windowSize, setWindowSize] = useState(Date.now())
  useEffect(() => {
    const handleResize = _.debounce(() => {
      setWindowSize(Date.now())
    }, 300) // 300ms 防抖
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return <div {...props} key={`render-${windowSize}`} />
}

function Terminal() {
  const log = useSelector((state: RootState) => state.log)
  const dispatch = useDispatch()

  const [terminalRef, terminalInstance] = useTerminal()

  const notification = useNotification()

  useEffect(() => {
    for (let i = 0; i < log.message.length - 1; i++) {
      terminalInstance.current?.write(log.message[i])
    }
  }, [])

  useEffect(() => {
    if (log.rolu == 'del') return
    const value = log.message[log.message.length - 1]
    if (value) {
      terminalInstance.current?.write(value)
    }
  }, [log.message])

  const deleteLines = (numLines: number) => {
    if (!terminalInstance.current) return
    for (let i = 0; i < numLines; i++) {
      // 向上移动一行
      terminalInstance.current.write('\x1b[1A') // 向上移动一行
      // 清除当前行
      terminalInstance.current.write('\x1b[2K') // 清除当前行
    }
  }

  const onClickDeleteLog = (size = 10) => {
    if (log.message.length > 0) {
      const count = log.message.length > size || size == 99 ? size : log.message.length
      dispatch(delMessate(count))
      deleteLines(count)
    } else {
      notification('没有日志可删除', 'warning')
    }
  }

  return (
    <div className="flex flex-col">
      <NavDiv className="animate__animated animate__fadeIn flex flex-col border-b ">
        <div className="flex gap-4  justify-between items-center px-2">
          <div className=" flex gap-2 items-center "></div>
          <div className="flex gap-4 ">
            <div>Terminal</div>
            {[10, 20, 50, 99].map((item, index) => (
              <div
                key={index}
                className=" cursor-pointer"
                onClick={() => {
                  onClickDeleteLog(item)
                }}
              >
                -{item}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div
              className="cursor-pointer"
              onClick={() => {
                window.page.openWindowMain()
              }}
            >
              <ChevronDown width={16} height={16} />
            </div>
          </div>
        </div>
      </NavDiv>
      <SecondaryDiv className="flex-1 flex p-2    overflow-x-auto overflow-y-hidden">
        <div
          ref={terminalRef}
          className="flex-1  bg-dark-secondary-bg h-[calc(100vh-5rem)] w-[calc(100vw-1.1rem)]"
        />
      </SecondaryDiv>
    </div>
  )
}

/**
 * @description 机器人控制器
 */
export default function BotLog() {
  return <Terminal />
}
