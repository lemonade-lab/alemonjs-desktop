import { useSelector } from 'react-redux'
import { RootState } from '@/store/index'
import _ from 'lodash'
import { useState } from 'react'
import { useNotification } from '@/context/Notification'

const getPlatform = (packages: any[]) => {
  const data: {
    name: string
    value: string
  }[] = []
  for (const item of packages) {
    let platforms = []
    const p = item?.alemonjs?.desktop?.platform
    if (Array.isArray(p)) {
      platforms = p
    }
    for (const platform of platforms) {
      data.push({
        name: platform.name,
        value: platform?.value ?? item.name
      })
    }
  }
  return data
}

export const useBotController = () => {
  const bot = useSelector((state: RootState) => state.bot)
  const modules = useSelector((state: RootState) => state.modules)
  const notification = useNotification()
  const expansions = useSelector((state: RootState) => state.expansions)
  const platforms = getPlatform(expansions.package)

  //
  const state = useState({
    name: 'gui',
    value: '@alemonjs/gui'
  })

  //
  /**
   * @returns
   */
  const onClickStart = _.throttle(() => {
    if (!modules.nodeModulesStatus) return
    if (!bot.runStatus) {
      notification('开始运行机器人...')
      if (/@alemonjs\//.test(state[0].value)) {
        const login = state[0].value.replace('@alemonjs/', '')
        window.bot.run(['--login', login])
      } else {
        window.bot.run(['--platform', state[0].value])
      }
      return
    } else {
      notification('机器人已经启动')
    }
  }, 500)
  /**
   * @returns
   */
  const onClickClose = _.throttle(() => {
    if (!bot.runStatus) return
    notification('机器人已停止', 'warning')
    window.bot.close()
  }, 500)

  return { onClickStart, onClickClose, bot, modules, state, platforms }
}
