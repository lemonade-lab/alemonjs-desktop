export const storage = {
  autoUpdate: false
}

import Store from 'electron-store'

// 创建一个 Store 实例用于存储跳过的版本
export const localStorage = new Store()

import { join } from 'node:path'
import { existsSync } from 'node:fs'
import { app } from 'electron'

const KEY = 'ALEMONDEJS_BOT_PATH'
const PATH = localStorage.get(KEY, '')

/**
 *
 * @param path
 * @returns
 */
export const setUserDataTemplatePath = (path: string) => {
  // 该目录存在 pkg.json 文件
  if (existsSync(join(path, 'package.json'))) {
    localStorage.set('ALEMONDEJS_BOT_PATH', path)
    return
  }
  // 不存在时，新建 template 目录
  localStorage.set('ALEMONDEJS_BOT_PATH', join(path, 'template'))
}

export const getUserDataTemplatePath = () => (typeof PATH === 'string' ? PATH : undefined)

/**
 * @returns
 */
export const createLogMainPath = () => {
  if (process.platform === 'darwin') {
    // ~/Library/Logs/{app name}/main.log
    return join(app.getPath('home'), 'Library', 'Logs', app.getName(), 'main.log')
  } else {
    // %USERPROFILE%\AppData\Roaming\{app name}\logs\main.log
    // ~/.config/{app name}/logs/main.log
    return join(app.getPath('userData'), 'logs', 'main.log')
  }
}
