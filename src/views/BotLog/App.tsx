import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@src/store/index'
import { showNotification } from '@src/store/notificationSlice'

import _ from 'lodash'
import { useEffect, useState } from 'react'

/**
 * @description 机器人控制器
 */
export default function BotLog() {
  const bot = useSelector((state: RootState) => state.bot)
  const dispatch = useDispatch()
  const [message, setMessage] = useState<string[]>([])

  /**
   * @returns
   */
  const onClickStart = _.throttle(() => {
    if (!bot.nodeModulesStatus) return
    if (!bot.runStatus) {
      dispatch(showNotification('开始运行机器人...'))
      window.app.botRun()
      return
    } else {
      dispatch(showNotification('机器人已经启动'))
    }
  }, 500)

  /**
   * @returns
   */
  const onClickClose = _.throttle(() => {
    if (!bot.runStatus) return
    window.app.botClose()
  }, 500)

  /**
   * @returns
   */
  const onClickYarnInstall = _.throttle(() => {
    if (bot.nodeModulesStatus) return
    dispatch(showNotification('开始加载依赖...'))
    window.app.yarnInstall()
  }, 500)

  useEffect(() => {
    window.app.botStdout((message: string) => {
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
            <div className=" py-1 px-4 rounded-md">
              机器状态 : {bot.runStatus ? '已启动' : '未启动'}
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
