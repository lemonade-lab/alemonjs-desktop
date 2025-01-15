import { processSend } from './send.js'
import { commands } from './storage.js'
export const context = {
  /**
   * 创建扩展路径
   * @param {*} dir
   * @returns
   */
  createExtensionDir: dir => {
    return `resource://-/${dir.replace(/^file:\/\//, '')}`
  },
  notification: message => {
    processSend({
      type: 'notification',
      data: message
    })
  },
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
