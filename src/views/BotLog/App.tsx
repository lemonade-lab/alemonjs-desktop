import _ from 'lodash'
import { useEffect, useState } from 'react'
import { useBotController } from '@src/hook/bot'
import { RootState } from '@src/store'
import { useDispatch, useSelector } from 'react-redux'
import { useTerminal } from '@src/hook/terminal'
import { delMessate } from '@src/store/log'
import { useNotification } from '@src/context/Notification'

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
  const { onClickStart, onClickClose, onClickYarnInstall, bot, state, platforms } =
    useBotController()
  const log = useSelector((state: RootState) => state.log)
  const modules = useSelector((state: RootState) => state.modules)
  const dispatch = useDispatch()
  const [platform, setPlatform] = state

  const [terminalRef, terminalInstance] = useTerminal()

  const { notification } = useNotification()

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
    <section className=" flex flex-col  bg-[var(--alemonjs-secondary-bg)] shadow-md">
      <div className="animate__animated animate__fadeIn flex flex-col p-1  bg-[#002b36] text-white rounded-t-md border-[#586e75] border-b ">
        <div className="flex gap-4  justify-between items-center ">
          <div className=" flex gap-2 items-center  rounded-md">
            <div>
              <select
                defaultValue={platform.name}
                onChange={e =>
                  setPlatform({
                    name: e.target.value,
                    value: platforms.find(item => item.name === e.target.value)?.value || ''
                  })
                }
                className="bg-transparent"
              >
                {platforms.map((item, index) => (
                  <option key={index}>{item.name}</option>
                ))}
              </select>
            </div>
            <div>{bot.runStatus ? '已启动' : '未启动'}</div>
          </div>

          <div className="flex gap-4 ">
            <div>Terminal</div>
            <div
              className=" cursor-pointer"
              onClick={() => {
                onClickDeleteLog()
              }}
            >
              -10
            </div>
            <div
              className=" cursor-pointer"
              onClick={() => {
                onClickDeleteLog(20)
              }}
            >
              -20
            </div>
            <div
              className=" cursor-pointer"
              onClick={() => {
                onClickDeleteLog(50)
              }}
            >
              -50
            </div>
            <div
              className=" cursor-pointer"
              onClick={() => {
                onClickDeleteLog(99)
              }}
            >
              -99
            </div>
          </div>

          <div>
            {modules.nodeModulesStatus ? (
              bot.runStatus ? (
                <button
                  type="button"
                  className="border border-[#586e75] px-2 rounded-md  duration-700 transition-all  hover:bg-gray-500"
                  onClick={onClickClose}
                >
                  <span>关闭</span>
                </button>
              ) : (
                <button
                  type="button"
                  className="border border-[#586e75] px-2 rounded-md  duration-700 transition-all  hover:bg-gray-500"
                  onClick={onClickStart}
                >
                  <span>启动</span>
                </button>
              )
            ) : (
              <button
                type="button"
                className="border px-2 rounded-md  duration-700 transition-all  hover:bg-gray-500"
                onClick={onClickYarnInstall}
              >
                <span>加载</span>
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="duration-3000 animate__animated animate__fadeIn flex-1 flex flex-col overflow-x-auto overflow-y-hidden max-w-screen">
        <div ref={terminalRef} className="flex p-4 flex-col bg-[#002b36] h-[calc(100vh-3.8rem)]" />
      </div>
    </section>
  )
}

/**
 * @description 机器人控制器
 */
export default function BotLog() {
  return (
    <RenderResize className="flex-1">
      <Terminal />
    </RenderResize>
  )
}
