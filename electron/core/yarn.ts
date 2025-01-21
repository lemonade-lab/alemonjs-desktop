import { fork } from 'child_process'
import { join } from 'node:path'
import logger from 'electron-log'
import { userDataTemplatePath } from './static'

/**
 * yarn 安装依赖
 * @param webContents
 * @returns
 */
export const yarn = async (
  webContents: Electron.WebContents,
  data: {
    type: string
    value: string[]
  }
) => {
  const MyJS = join(userDataTemplatePath, 'bin', 'yarn.cjs')
  logger.info(`Yarn command: ${data.value.join(' ')}`)
  const child = fork(MyJS, data.value, {
    cwd: userDataTemplatePath,
    stdio: 'pipe' // 确保使用管道来捕获输出
  })
  // 监听子进程的标准输出
  child.stdout?.on('data', data => {
    if (webContents.isDestroyed()) return
    // 发消息给渲染进程
    webContents.send('on-terminal', data.toString())
    logger.info(`Yarn output: ${data.toString()}`)
  })
  // 监听子进程的错误输出
  child.stderr?.on('data', data => {
    if (webContents.isDestroyed()) return
    webContents.send('on-terminal', data.toString())
    logger.error(`Yarn error: ${data.toString()}`)
  })
  // 监听子进程退出
  child.on('exit', code => {
    if (webContents.isDestroyed()) return
    // 确保安装成功
    if (code == 0) {
      webContents.send('yarn-status', {
        type: data.type,
        value: 1
      })
    } else {
      webContents.send('yarn-status', {
        type: data.type,
        value: 0
      })
    }
  })
}
