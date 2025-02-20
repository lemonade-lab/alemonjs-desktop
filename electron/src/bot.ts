import { userDataTemplatePath } from './static'
import { join } from 'path'
import { ChildProcess, fork } from 'child_process'
import logger from 'electron-log'
import { webContents } from 'electron'

/**
 * @description bot 管理
 */

/**
 * bot关闭
 * @returns
 */
export const botClose = () => {
  if (child && child.connected) {
    child.kill()
    return
  }
  return
}

let child: ChildProcess | null = null

/**
 * bot运行
 * 如果已经运行，则发送消息给渲染进程
 * @returns
 */
export const botRun = async (webContent: Electron.WebContents, args: string[]) => {
  if (child && child.connected) {
    logger.info('Bot is running')
    // 运行中
    webContent.send('bot-status', 1)
    return
  }

  if (webContent.isDestroyed()) return

  const MyJS = join(userDataTemplatePath, 'alemonjs', 'index.js')
  child = fork(MyJS, args, {
    cwd: userDataTemplatePath,
    stdio: 'pipe' // 确保使用管道来捕获输出
  })

  // 监听子进程的标准输出
  child.stdout?.on('data', data => {
    const allWebContents = webContents.getAllWebContents()
    allWebContents.forEach(contents => {
      if (contents.isDestroyed()) return
      contents.send('on-terminal', data.toString())
    })

    logger.info(`bot output: ${data.toString()}`)
  })

  // 监听子进程的错误输出
  child.stderr?.on('data', data => {
    const allWebContents = webContents.getAllWebContents()
    allWebContents.forEach(contents => {
      if (contents.isDestroyed()) return
      contents.send('on-terminal', data.toString())
    })

    logger.error(`bot error: ${data.toString()}`)
  })

  // 监听子进程退出
  child.on('exit', code => {
    if (webContent.isDestroyed()) return
    // 退出了。
    webContent.send('bot-status', 0)
    logger.info(`bot exit ${code}`)
  })

  // 运行成功
  webContent.send('bot-status', 1)
}

/**
 * bot状态
 * @returns
 */
export const botStatus = () => {
  if (child && child.connected) {
    logger.info('Bot is running')
    return true
  }
  return false
}

// 监听主进程退出
// 确保 bot 退出
process.on('exit', () => {
  botClose()
})
