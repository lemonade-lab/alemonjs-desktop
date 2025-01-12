import { WindowApp } from './typing/app'
import { WindowExpansions } from './typing/expansions'
import { WindowBot } from './typing/bot'
import { WindowVersions } from './typing/versions'
import { WindowYarn } from './typing/yarn'
import { WindowController } from './typing/controller'
declare global {
  interface Window {
    /**
     * 应用程序
     */
    app: WindowApp
    /**
     * 扩展
     */
    expansions: WindowExpansions
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
