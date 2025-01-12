import { useSelector } from 'react-redux'
import { RootState } from '@src/store/index'
import _ from 'lodash'
import { useState } from 'react'
import { useNotification } from '@src/context/Notification'
export const useBotController = () => {
  const bot = useSelector((state: RootState) => state.bot)
  const { showNotification } = useNotification()
  const platforms = [
    'gui',
    'qq-bot',
    'kook',
    'discord',
    'wechat',
    'telegram',
    'onebot',
    'qq'
  ] as const
  const state = useState<(typeof platforms)[number]>('gui')
  /**
   * @returns
   */
  const onClickStart = _.throttle(() => {
    if (!bot.nodeModulesStatus) return
    if (!bot.runStatus) {
      showNotification('开始运行机器人...')
      window.bot.run(JSON.stringify(['--login', state[0]]))
      return
    } else {
      showNotification('机器人已经启动')
    }
  }, 500)
  /**
   * @returns
   */
  const onClickClose = _.throttle(() => {
    if (!bot.runStatus) return
    window.bot.close()
  }, 500)
  /**
   * @returns
   */
  const onClickYarnInstall = _.throttle(async () => {
    // 执行控制
    const status = await window.yarn.status('yarnInstall')
    if (status) {
      // 执行中 。。。
      showNotification('加载中...')
      return
    }
    if (bot.nodeModulesStatus) return
    showNotification('开始加载依赖...')
    window.yarn.install()
  }, 500)
  return { onClickStart, onClickClose, onClickYarnInstall, bot, state, platforms }
}
