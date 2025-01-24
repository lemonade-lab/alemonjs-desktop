import { WindowApp } from './typing/app'
import { WindowExpansions } from './typing/expansions'
import { WindowBot } from './typing/bot'
import { WindowVersions } from './typing/versions'
import { WindowYarn } from './typing/yarn'
import { WindowController } from './typing/controller'

type WindowTheme = {
  save: (data: Object) => void
  variables: () => void
  initVariables: () => void
  on: (callback: (val: any) => void) => void
  setMode: (mode: string) => void
  mode: () => Promise<string>
}

declare global {
  interface Window {
    /**
     *
     */
    terminal: {
      on: (callback: (message: string) => void) => void
    }
    /**
     * 应用程序
     */
    app: WindowApp
    /**
     * 扩展
     */
    expansions: WindowExpansions
    /**
     * 主题
     */
    theme: WindowTheme
    /**
     *  bot
     */
    bot: WindowBot
    /**
     *  yarn
     */
    yarn: WindowYarn
    /**
     *  控制窗口
     */
    controller: WindowController
    /**
     * 版本信息
     */
    versions: WindowVersions
  }
}
