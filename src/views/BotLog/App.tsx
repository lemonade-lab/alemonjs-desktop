import _ from 'lodash'
import { useEffect, useRef } from 'react'
import { useBotController } from '@src/hook/bot'
import { RootState } from '@src/store'
import { useDispatch, useSelector } from 'react-redux'
import { postMessage } from '@src/store/log'
/**
 * @description 机器人控制器
 */
export default function BotLog() {
  const { onClickStart, onClickClose, onClickYarnInstall, bot, state, platforms } =
    useBotController()
  const log = useSelector((state: RootState) => state.log)
  const dispatch = useDispatch()
  const [platform, setPlatform] = state

  const logRef = useRef<HTMLDivElement>(null)

  const goToBottom = _.debounce(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight
  }, 500)

  useEffect(() => {
    goToBottom()
  }, [log.message])

  useEffect(() => {
    window.app.onBotStdout((message: string) => {
      console.log('message', message)
      dispatch(postMessage(message))
    })
  }, [])
  return (
    <>
      <section className="flex flex-col px-4 bg-[var(--secondary-bg-front)]">
        <section className="flex flex-col  bg-[var(--primary-bg-front)] rounded-t-xl border-x border-y p-2 ">
          <div className="flex gap-4 py-1 items-center ">
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
                  type="button"
                  className="border px-2 rounded-md  hover:bg-blue-200"
                  onClick={onClickClose}
                >
                  <span>关闭</span>
                </button>
              ) : (
                <button
                  type="button"
                  className="border px-2 rounded-md  hover:bg-blue-200"
                  onClick={onClickStart}
                >
                  <span>启动</span>
                </button>
              )
            ) : (
              <button
                type="button"
                className="border px-2 rounded-md  hover:bg-blue-200"
                onClick={onClickYarnInstall}
              >
                <span>加载</span>
              </button>
            )}
          </div>
        </section>
      </section>
      <main
        ref={logRef}
        className="flex-1 flex flex-col px-4 overflow-auto scrollbar bg-[var(--secondary-bg-front)] "
      >
        <section className="flex flex-col bg-[var(--primary-bg-front)] px-2 h-full">
          <div className="flex-1 h-full flex flex-col overflow-hidden">
            <div className="flex flex-col">
              {log.message.length > 0 ? (
                log.message.map((item, index) => <p key={index}>{item}</p>)
              ) : (
                <p>没有消息</p>
              )}
            </div>
          </div>
        </section>
      </main>
      <section className="flex flex-col px-4 bg-[var(--secondary-bg-front)]">
        <section className="flex flex-col  bg-[var(--primary-bg-front)] rounded-b-xl border-x border-b py-1"></section>
      </section>
    </>
  )
}
