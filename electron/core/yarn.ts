import { fork } from 'child_process'
import { join } from 'node:path'
import logger from 'electron-log'
import { templatePath } from './static'

/**
 * @description yarn 管理
 */

const yarnMap = new Map()

const keys = {
  yarnInstall: 'yarnInstall',
  yarnAdd: 'yarnAdd',
  yarnLink: 'yarnLink'
}

/**
 * yarn 安装依赖
 * @param webContents
 * @returns
 */
export const yarnInstall = (webContents: Electron.WebContents) => {
  const KEY = keys.yarnInstall
  return new Promise(resolve => {
    if (yarnMap.has(KEY)) {
      // 执行中...
      resolve(false)
      return
    }
    logger.info('yarn install start', KEY)

    yarnMap.set(KEY, 1)

    const MyJS = join(templatePath, 'bin', 'yarn.cjs')
    const child = fork(MyJS, ['install', '--ignore-warnings'], {
      cwd: templatePath,
      stdio: 'pipe' // 确保使用管道来捕获输出
    })
    // 监听子进程的标准输出
    child.stdout?.on('data', data => {
      if (webContents.isDestroyed()) return

      // 发消息给渲染进程
      webContents.send('bot-stdout', data.toString())
      logger.info(`Yarn install output: ${data.toString()}`)
    })
    // 监听子进程的错误输出
    child.stderr?.on('data', data => {
      if (webContents.isDestroyed()) return

      webContents.send('bot-stdout', data.toString())
      logger.error(`Yarn install error: ${data.toString()}`)
    })
    // 监听子进程退出
    child.on('exit', code => {
      logger.info(`Yarn add process exited with code ${code}`)

      // 结束
      yarnMap.delete(KEY)

      if (webContents.isDestroyed()) return

      // 确保安装成功
      if (code == 0) {
        webContents.send('yarn-install-status', 1)
      } else {
        webContents.send('yarn-install-status', 0)
      }
      //
    })

    //
    resolve(true)
    return
  })
}

/**
 * yarn 安装 <包名>
 * @param dir 路径
 * @param packageName 包名
 * @returns 子进程实例
 */
export const yarnAdd = (webContents: Electron.WebContents, value: string) => {
  const KEY = keys.yarnAdd
  return new Promise(resolve => {
    if (yarnMap.has(KEY)) {
      // 执行中...
      resolve(false)
      return
    }
    logger.info('yarn add start', KEY)
    yarnMap.set(KEY, 1)

    const MyJS = join(templatePath, 'bin', 'yarn.cjs')
    const child = fork(MyJS, ['add', value, '-W'], {
      cwd: templatePath,
      stdio: 'pipe' // 确保使用管道来捕获输出
    })
    // 监听子进程的标准输出
    child.stdout?.on('data', data => {
      if (webContents.isDestroyed()) return

      // 发消息给渲染进程
      webContents.send('bot-stdout', data.toString())
      logger.info(`Yarn add output: ${data.toString()}`)
    })
    // 监听子进程的错误输出
    child.stderr?.on('data', data => {
      if (webContents.isDestroyed()) return

      webContents.send('bot-stdout', data.toString())
      logger.error(`Yarn add error: ${data.toString()}`)
    })
    // 监听子进程退出
    child.on('exit', code => {
      logger.info(`Yarn add process exited with code ${code}`)
      // 结束
      yarnMap.delete(KEY)

      if (webContents.isDestroyed()) return

      // 确保安装成功
      if (code == 0) {
        webContents.send('yarn-add-status', 1)
      } else {
        webContents.send('yarn-add-status', 0)
      }
      //
    })
    resolve(true)
    return
  })
}

/**
 * yarn 安装 <包名>
 * @param dir 路径
 * @param packageName 包名
 * @returns 子进程实例
 */
export const yarnLink = (webContents: Electron.WebContents, value: string) => {
  const KEY = keys.yarnLink
  return new Promise(resolve => {
    if (yarnMap.has(KEY)) {
      // 执行中...
      resolve(false)
      return
    }
    logger.info('yarn add link', KEY)
    yarnMap.set(KEY, 1)

    const MyJS = join(templatePath, 'bin', 'yarn.cjs')
    const child = fork(MyJS, ['link', value], {
      cwd: templatePath,
      stdio: 'pipe' // 确保使用管道来捕获输出
    })
    // 监听子进程的标准输出
    child.stdout?.on('data', data => {
      if (webContents.isDestroyed()) return
      // 发消息给渲染进程
      webContents.send('bot-stdout', data.toString())
      logger.info(`Yarn link output: ${data.toString()}`)
    })
    // 监听子进程的错误输出
    child.stderr?.on('data', data => {
      if (webContents.isDestroyed()) return

      webContents.send('bot-stdout', data.toString())
      logger.error(`Yarn link error: ${data.toString()}`)
    })
    // 监听子进程退出
    child.on('exit', code => {
      logger.info(`Yarn link process exited with code ${code}`)
      // 结束
      yarnMap.delete(KEY)

      if (webContents.isDestroyed()) return

      // 确保安装成功
      if (code == 0) {
        webContents.send('yarn-link-status', 1)
      } else {
        webContents.send('yarn-link-status', 0)
      }
      //
    })
    resolve(true)
    return
  })
}

/**
 *
 * @returns
 */
export const yarnStatus = (key: keyof typeof keys) => yarnMap.has(key)
