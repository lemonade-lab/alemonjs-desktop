import { userDataTemplatePath } from './static'
import { join } from 'path'
import { ChildProcess, fork } from 'child_process'
import logger from 'electron-log'
import { webContents } from 'electron'

/**
 * @description 扩展器管理
 */

/**
 * 扩展器关闭
 * @returns
 */
export const expansionsClose = () => {
  if (child && child.connected) {
    child.kill()
  }
}

let child: ChildProcess | null = null

// 缓存webview窗口
// 用来在扩展器中发送消息给对应的webview
const webviewWindows = new Map<string, Electron.WebContents>()

/**
 * 扩展器运行
 * 如果已经运行，则发送消息给渲染进程
 * @returns
 */
export const expansionsRun = async (webContent: Electron.WebContents, args: string[]) => {
  if (child && child.connected) {
    logger.info('expansions is running')
    webContent.send('expansions-status', 1)
    return
  }
  if (webContent.isDestroyed()) return

  const MyJS = join(userDataTemplatePath, 'desktop.js')

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

    logger.info(`expansions output: ${data.toString()}`)
  })

  // 监听子进程的错误输出
  child.stderr?.on('data', data => {
    const allWebContents = webContents.getAllWebContents()
    allWebContents.forEach(contents => {
      if (contents.isDestroyed()) return
      contents.send('on-terminal', data.toString())
    })

    logger.error(`expansions error: ${data.toString()}`)
  })

  // 监听子进程退出
  child.on('exit', code => {
    if (webContent.isDestroyed()) return
    // 退出了。
    webContent.send('expansions-status', 0)
    logger.info(`expansions exit ${code}`)
  })

  const map: {
    [key: string]: string
  } = {
    'webview-on-message': 'webview-on-message',
    'webview-on-expansions-message': 'webview-on-expansions-message'
  }

  // 监听子进程返回的消息
  child.on('message', (message: any) => {
    if (webContent.isDestroyed()) return
    try {
      if (/^webview/.test(message.type) && map[message.type]) {
        const __name = message.data.name
        // 是 webview的消息 要 发送给对应的 webview
        if (webviewWindows.has(__name)) {
          const content = webviewWindows.get(__name)
          if (!content) return
          content?.send(map[message.type], message.data)
          return
        }
      } else {
        webContent.send('expansions-message', message)
      }
    } catch (e) {
      logger.error(e)
    }
  })

  // 运行成功
  webContent.send('expansions-status', 1)
}

/**
 * 扩展器状态
 * @returns
 */
export const expansionsStatus = () => {
  if (child && child.connected) return true
  return false
}

/**
 * 扩展器发送消息
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
 * 扩展器关闭
 */
process.on('exit', () => {
  expansionsClose()
})
