import { fork } from 'child_process'
import { join } from 'node:path'
import logger from 'electron-log'
import { userDataTemplatePath } from './static'
import { webContents } from 'electron'

/**
 * yarn 安装依赖
 * @param webContent
 * @returns
 */
export const yarn = async (
  webContent: Electron.WebContents,
  data: {
    type: string
    value: string[]
  }
) => {
  const MyJS = join(userDataTemplatePath, 'alemonjs', 'bin', 'yarn.cjs')
  logger.info(`Yarn command: ${data.value.join(' ')}`)
  const child = fork(MyJS, data.value, {
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
    logger.info(`Yarn output: ${data.toString()}`)
  })
  // 监听子进程的错误输出
  child.stderr?.on('data', data => {
    const allWebContents = webContents.getAllWebContents()
    allWebContents.forEach(contents => {
      if (contents.isDestroyed()) return
      contents.send('on-terminal', data.toString())
    })
    logger.error(`Yarn error: ${data.toString()}`)
  })
  // 监听子进程退出
  child.on('exit', code => {
    if (webContent.isDestroyed()) return
    // 确保安装成功
    if (code == 0) {
      webContent.send('yarn-status', {
        type: data.type,
        value: 1
      })
    } else {
      webContent.send('yarn-status', {
        type: data.type,
        value: 0
      })
    }
  })
}
