import { templatePath } from './static'
import { join } from 'path'
import { ChildProcess, fork } from 'child_process'
import logger from 'electron-log'
import { ipcMain } from 'electron'

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
export const botRun = async (webContents: Electron.WebContents) => {
  if (child && child.connected) {
    logger.info('Bot is running')
    return
  }
  const MyJS = join(templatePath, 'index.js')
  child = fork(MyJS, ['--login', 'gui'], {
    cwd: templatePath,
    stdio: 'pipe' // 确保使用管道来捕获输出
  })
  // 监听子进程的标准输出
  child.stdout?.on('data', data => {
    // 发消息给渲染进程
    webContents.send('bot-stdout', data.toString()),
      logger.info(`Yarn install output: ${data.toString()}`)
  })
  // 监听子进程的错误输出
  child.stderr?.on('data', data => {
    logger.error(`Yarn install error: ${data.toString()}`)
  })
  // 监听子进程退出
  child.on('exit', code => {
    logger.info(`Yarn add process exited with code ${code}`)
  })
}

/**
 *
 * @returns
 */
export const isBotRunning = () => {
  if (child && child.connected) {
    logger.info('Bot is running')
    return true
  }
  return false
}

process.on('exit', () => {
  botClose()
})
