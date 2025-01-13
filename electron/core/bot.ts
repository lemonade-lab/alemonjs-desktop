import { templatePath } from './static'
import { join } from 'path'
import { ChildProcess, fork } from 'child_process'
import logger from 'electron-log'
import { BrowserWindow } from 'electron'

/**
 * @description bot 管理
 */

/**
 *
 * @returns
 */
export const botClose = () => {
  if (child && child.connected) {
    child.kill()
    return true
  }
  return false
}

let child: ChildProcess | null = null

/**
 *
 * @returns
 */
export const botRun = async (webContents: Electron.WebContents, args: string[]) => {
  if (child && child.connected) {
    logger.info('Bot is running')
    return
  }

  if (webContents.isDestroyed()) return

  const MyJS = join(templatePath, 'index.js')
  child = fork(MyJS, args, {
    cwd: templatePath,
    stdio: 'pipe' // 确保使用管道来捕获输出
  })

  // 监听子进程的标准输出
  child.stdout?.on('data', data => {
    if (webContents.isDestroyed()) return

    // 发消息给渲染进程
    webContents.send('bot-stdout', data.toString())
    logger.info(`bot output: ${data.toString()}`)
  })

  // 监听子进程的错误输出
  child.stderr?.on('data', data => {
    if (webContents.isDestroyed()) return

    webContents.send('bot-stdout', data.toString())
    logger.error(`bot error: ${data.toString()}`)
  })

  // 监听子进程退出
  child.on('exit', code => {
    if (webContents.isDestroyed()) return

    // 退出了。
    webContents.send('bot-status', 0)
    logger.info(`bot exit ${code}`)
  })

  // 运行成功
  webContents.send('bot-status', 1)
}

/**
 *
 * @returns
 */
export const botStatus = () => {
  if (child && child.connected) {
    logger.info('Bot is running')
    return true
  }
  return false
}

process.on('exit', () => {
  botClose()
})
