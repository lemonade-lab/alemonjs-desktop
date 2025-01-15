import { processSend } from './send.js'
import { commands } from './storage.js'
export const context: {
  _name: any
  createExtensionDir: (dir: string) => string
  createSidebarWebView: (context: any) => void
  notification: (message: string) => void
  command: (command: string) => void
  onCommand: (command: string, callback: Function) => void
  createAction: (context: any) => void
} = {
  _name: null,
  /**
   * 创建扩展路径
   * @param {*} dir
   * @returns
   */
  createExtensionDir: dir => {
    return `resource://-/${dir.replace(/^file:\/\//, '')}`
  },
  /**
   *
   */
  createAction: context => {},
  /**
   *
   * @param context
   */
  createSidebarWebView: context => {},
  /**
   *
   * @param message
   */
  notification: message => {
    processSend({
      type: 'notification',
      data: message
    })
  },
  /**
   *
   * @param command
   */
  command: command => {
    processSend({
      type: 'command',
      data: command
    })
  },
  // 上下文。
  onCommand: (command, callback) => {
    // 将命令和回调函数存储起来。
    commands.push({
      command: command,
      callback
    })
  }
}
