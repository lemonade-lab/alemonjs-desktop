import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@src/store/index'
import { showNotification } from '@src/store/notificationSlice'
import _ from 'lodash'
import { useState } from 'react'
import { number } from 'echarts'
export const useBotController = () => {
  const bot = useSelector((state: RootState) => state.bot)
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
  const dispatch = useDispatch()
  /**
   * @returns
   */
  const onClickStart = _.throttle(() => {
    if (!bot.nodeModulesStatus) return
    if (!bot.runStatus) {
      dispatch(showNotification('开始运行机器人...'))
      window.app.botRun(JSON.stringify(['--login', state[0]]))
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
  const onClickYarnInstall = _.throttle(async () => {
    // 执行控制
    const status = await window.yarn.status('yarnInstall')
    if (status) {
      // 执行中 。。。
      dispatch(showNotification('加载中...'))
      return
    }
    if (bot.nodeModulesStatus) return
    dispatch(showNotification('开始加载依赖...'))
    window.yarn.install()
  }, 500)
  return { onClickStart, onClickClose, onClickYarnInstall, bot, state, platforms }
}
