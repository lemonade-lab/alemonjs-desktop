import _ from 'lodash'
import { useEffect, useState } from 'react'
import { useBotController } from '@src/hook/bot'
/**
 * @description 机器人控制器
 */
export default function BotLog() {
  const { onClickStart, onClickClose, onClickYarnInstall, bot, state, platforms } =
    useBotController()
  const [message, setMessage] = useState<string[]>([])
  const [platform, setPlatform] = state
  useEffect(() => {
    window.app.onBotStdout((message: string) => {
      setMessage(prev => {
        if (prev.length > 10) {
          return prev.slice(1).concat(message)
        }
        return prev.concat(message)
      })
    })
  }, [])
  return (
    <main className="flex-1 flex flex-col ">
      <div className="flex-1 flex flex-col">
        <section className="bg-[#ffffff6b] rounded-xl shadow-content p-2 ">
          <div className="m-auto flex gap-4 py-1 items-center ">
            <div className="flex-1 flex gap-2 items-center  rounded-md">
              <div>
                <select
                  defaultValue={platform}
                  onChange={e => setPlatform(e.target.value as any)}
                  className="bg-transparent"
                >
                  {platforms.map((item, index) => (
                    <option key={index}>{item}</option>
                  ))}
                </select>
              </div>
              <div>{bot.runStatus ? '已启动' : '未启动'}</div>
            </div>

            {bot.nodeModulesStatus ? (
              bot.runStatus ? (
                <button
                  className="border px-2 rounded-md  hover:bg-blue-200"
                  onClick={onClickClose}
                >
                  <span>关闭</span>
                </button>
              ) : (
                <button
                  className="border px-2 rounded-md  hover:bg-blue-200"
                  onClick={onClickStart}
                >
                  <span>启动</span>
                </button>
              )
            ) : (
              <button
                className="border px-2 rounded-md  hover:bg-blue-200"
                onClick={onClickYarnInstall}
              >
                <span>加载</span>
              </button>
            )}
          </div>
          <div className="border-t px-2 flex-1 w-full  py-1 overflow-auto h-full">
            {message.length > 0 ? (
              message.map((item, index) => <p key={index}>{item}</p>)
            ) : (
              <p>没有消息</p>
            )}
          </div>
        </section>
      </div>
    </main>
  )
}
