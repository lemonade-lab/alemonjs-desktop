import { fork } from 'child_process'
import { join } from 'node:path'
import logger from 'electron-log'
import {
  cjsYarnPath,
  isInitTemplatePath,
  userDataPackagePath,
  userDataTemplatePath
} from './static'
import { dialog, webContents } from 'electron'
import { existsSync } from 'node:fs'
import { initTemplate } from './init'

let isLoading = false

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
  if (isLoading) {
    webContent.send('on-notification', '正在执行，请稍等')
    return
  }

  // 不存在 package.json
  if (!existsSync(userDataPackagePath)) {
    // 非默认路径
    if (!isInitTemplatePath) {
      //
      webContent.send('on-modal', {
        open: true,
        title: '是否初始化模板',
        description: '该目录不存在机器人，是否要删除该目录数据，并初始化模板？',
        buttonText: '确定',
        data: data,
        code: 2010
      })
      return
    }
    // 初始化模板
    initTemplate()
  }

  const MyJS = cjsYarnPath

  // 判断是否存在 yarn.cjs
  if (!existsSync(MyJS)) {
    // 确认是否初始化模板
    webContent.send('on-notification', '该机器人不存在包管理脚本，请检查')
    return
  }

  const isInstall = data.value.includes('install')

  if (isInstall) {
    webContent.send('on-notification', '开始加载依赖，请稍等')
    isLoading = true
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
    if (isInstall) {
      isLoading = false
    }
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
