import { templatePath } from './static'
import { join } from 'path'
import { ChildProcess, fork } from 'child_process'
import logger from 'electron-log'

/**
 * @description expansions 管理
 */

/**
 *
 * @returns
 */
export const expansionsClose = () => {
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
export const expansionsRun = async (webContents: Electron.WebContents, args: string[]) => {
  if (child && child.connected) {
    logger.info('expansions is running')
    return
  }

  const MyJS = join(templatePath, 'desktop.js')

  //
  child = fork(MyJS, args, {
    cwd: templatePath,
    stdio: 'pipe' // 确保使用管道来捕获输出
  })

  // 监听子进程的标准输出
  child.stdout?.on('data', data => {
    // 发消息给渲染进程
    webContents.send('expansions-stdout', data.toString())
    logger.info(`expansions output: ${data.toString()}`)
  })

  // 监听子进程的错误输出
  child.stderr?.on('data', data => {
    webContents.send('expansions-stdout', data.toString())
    logger.error(`expansions error: ${data.toString()}`)
  })

  // 监听子进程退出
  child.on('exit', code => {
    // 退出了。
    webContents.send('expansions-status', 0)
    logger.info(`expansions exit ${code}`)
  })

  // 监听子进程返回的消息
  child.on('message', message => {
    try {
      const data = JSON.stringify(message)
      webContents.send('expansions-message', data)
    } catch (e) {
      logger.error(e)
    }
  })

  // 运行成功
  webContents.send('expansions-status', 1)
}

/**
 *
 * @param data
 * @returns
 */
export const expansionsPostMessage = (data: { type: string; data: any }) => {
  if (child && child.connected) {
    child.send(data)
    return true
  }
  return false
}

/**
 *
 * @returns
 */
export const expansionsStatus = () => {
  if (child && child.connected) return true
  return false
}

process.on('exit', () => {
  expansionsClose()
})
