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
  const modules = useSelector((state: RootState) => state.modules)
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
    window.bot.onStdout((message: string) => {
      console.log('message', message)
      dispatch(postMessage(message))
    })
  }, [])
  return (
    <section className="flex flex-col flex-1 bg-[var(--primary-bg-front)] shadow-md">
      <div className="flex flex-col p-1  rounded-t-md border-b ">
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
      </div>
      <div className="flex-1 flex flex-col p-1 ">
        <div ref={logRef} className="flex flex-col h-[calc(100vh-6.5rem)] overflow-auto scrollbar">
          {log.message.length > 0 ? (
            log.message.map((item, index) => <p key={index}>{item}</p>)
          ) : (
            <div className="flex-1 flex justify-center items-center"></div>
          )}
        </div>
      </div>
    </section>
  )
}
