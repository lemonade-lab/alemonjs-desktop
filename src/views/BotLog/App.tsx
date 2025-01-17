import _ from 'lodash'
import { useEffect } from 'react'
import { useBotController } from '@src/hook/bot'
import { RootState } from '@src/store'
import { useDispatch, useSelector } from 'react-redux'
import { useTerminal } from '@src/hook/terminal'
/**
 * @description 机器人控制器
 */
export default function BotLog() {
  const { onClickStart, onClickClose, onClickYarnInstall, bot, state, platforms } =
    useBotController()
  const log = useSelector((state: RootState) => state.log)
  const modules = useSelector((state: RootState) => state.modules)
  const dispatch = useDispatch()
  const [platform, setPlatform] = state

  const [terminalRef, terminalInstance] = useTerminal()

  useEffect(() => {
    for (let i = 0; i < log.message.length - 1; i++) {
      terminalInstance.current?.write(log.message[i])
    }
  }, [])

  useEffect(() => {
    const value = log.message[log.message.length - 1]
    if (value) {
      terminalInstance.current?.write(value)
    }
  }, [log.message])

  return (
    <section className="animate__animated animate__fadeIn flex flex-col flex-1 bg-[var(--primary-bg-front)] shadow-md">
      <div className="flex flex-col p-1  bg-[#002b36] text-white rounded-t-md border-[#586e75] border-b ">
        <div className="flex gap-4  items-center ">
          <div className="flex-1 flex gap-2 items-center  rounded-md">
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
      <div className="flex-1 flex flex-col">
        <div ref={terminalRef} className="flex p-4 flex-col bg-[#002b36] h-[calc(100vh-3.8rem)]" />
      </div>
    </section>
  )
}
