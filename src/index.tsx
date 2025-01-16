import { WindowApp } from './typing/app'
import { WindowExpansions } from './typing/expansions'
import { WindowBot } from './typing/bot'
import { WindowVersions } from './typing/versions'
import { WindowYarn } from './typing/yarn'
import { WindowController } from './typing/controller'

declare global {
  interface Window {
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

/**
 *
 * command: list
 * bar: left | right
 * menu: center | button
 *
 * {
 *   "menu/center":[],
 *   "menu/button":[],
 *   "command":[
 *      {
 *        name:"",
 *        title:"",
 *      }
 *   ],
 *   "bar/left":[],
 *   "bar/right":[]
 * }
 *
 *
 * 需要明确。是哪一个。menu。
 * // menu应该是固定的。
 *
 * // home:card
 *
 * // expasion:webview
 *
 * //setting:
 *
 */
