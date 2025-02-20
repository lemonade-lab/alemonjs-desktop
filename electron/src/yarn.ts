import { fork } from 'child_process'
import { join } from 'node:path'
import logger from 'electron-log'
import { userDataPackagePath, userDataTemplatePath } from './static'
import { dialog, webContents } from 'electron'
import { existsSync } from 'node:fs'
import { initTemplate } from './init'

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
  // 如果是
  if (!existsSync(userDataPackagePath)) {
    // 确认是否初始化模板
    const response = await dialog.showMessageBox({
      type: 'question',
      buttons: ['确定', '取消'],
      title: '确认',
      message: '该目录不存在机器人，是否要删除该目录数据，并初始化模板？'
    })
    if (response.response === 0) {
      // 用户选择了 "确定"
      initTemplate()
    } else {
      webContent.send('on-notification', '已取消初始化模板')
      return
    }
  }

  const MyJS = join(userDataTemplatePath, 'alemonjs', 'bin', 'yarn.cjs')

  // 判断是否存在 yarn.cjs
  if (!existsSync(MyJS)) {
    // 确认是否初始化模板
    webContent.send('on-notification', '该机器人不存在包管理脚本，请检查')
    return
  }

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
