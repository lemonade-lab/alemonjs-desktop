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
  }
}

let child: ChildProcess | null = null

/**
 *
 * @returns
 */
export const expansionsRun = async (webContents: Electron.WebContents, args: string[]) => {
  if (child && child.connected) {
    logger.info('expansions is running')

    webContents.send('expansions-status', 1)
    return
  }

  if (webContents.isDestroyed()) return

  const MyJS = join(templatePath, 'desktop.js')

  //
  child = fork(MyJS, args, {
    cwd: templatePath,
    stdio: 'pipe' // 确保使用管道来捕获输出
  })

  // 监听子进程的标准输出
  child.stdout?.on('data', data => {
    if (webContents.isDestroyed()) return

    // 发消息给渲染进程
    webContents.send('on-terminal', data.toString())
    logger.info(`expansions output: ${data.toString()}`)
  })

  // 监听子进程的错误输出
  child.stderr?.on('data', data => {
    if (webContents.isDestroyed()) return

    webContents.send('on-terminal', data.toString())
    logger.error(`expansions error: ${data.toString()}`)
  })

  // 监听子进程退出
  child.on('exit', code => {
    if (webContents.isDestroyed()) return

    // 退出了。
    webContents.send('expansions-status', 0)
    logger.info(`expansions exit ${code}`)
  })

  // 监听子进程返回的消息
  child.on('message', (message: any) => {
    if (webContents.isDestroyed()) return

    try {
      if (/^webview/.test(message.type)) {
        const map: {
          [key: string]: string
        } = {
          'webview-on-message': 'webview-on-message',
          'webview-get-expansions': 'webview-expansions-message'
        }
        const __name = message.data.name
        // 是 webview的消息 要 发送给对应的 webview
        if (webviewWindows.has(__name)) {
          const content = webviewWindows.get(__name)
          if (!content) return
          content?.send(map[message.type], message.data)
          return
        }
      }
      if (message.type === 'webview-on-message') {
      } else if (message.type == 'webview-get-expansions') {
        const __name = message.data.name
        // 是 webview的消息 要 发送给对应的 webview
        if (webviewWindows.has(__name)) {
          const content = webviewWindows.get(__name)
          if (!content) return
          content?.send('webview-expansions-message', message.data)
          return
        }
      } else {
        webContents.send('expansions-message', message)
      }
    } catch (e) {
      logger.error(e)
    }
  })

  // 运行成功
  webContents.send('expansions-status', 1)
}

const webviewWindows = new Map<string, Electron.WebContents>()

/**
 *
 * @param data
 * @returns
 */
export const expansionsPostMessage = (
  webContents: Electron.WebContents,
  data: { type: string; data: any }
) => {
  if (child && child.connected) {
    if (/^webview/.test(data.type)) {
      // 是 webview的消息要保存窗口
      const __name = data.data.name
      webviewWindows.set(__name, webContents)
    }
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
