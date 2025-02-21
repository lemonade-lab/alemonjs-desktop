export const storage = {
  autoUpdate: false
}

import Store from 'electron-store'

// 创建一个 Store 实例用于存储跳过的版本
export const localStorage = new Store()

import { join } from 'node:path'
import { existsSync } from 'node:fs'
import { app } from 'electron'

const ALEMONDEJS_BOT_PATH = 'ALEMONDEJS_BOT_PATH'
const ALEMONDEJS_WORDSPACE_PATH = 'ALEMONDEJS_WORDSPACE_PATH'

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

/**
 *
 * @returns
 */
export const getUserDataTemplatePath = () => {
  const PATH = localStorage.get(ALEMONDEJS_BOT_PATH)
  return typeof PATH === 'string' ? PATH : undefined
}

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

/**
 *
 * @returns
 */
export const getWordSpacePath = () => {
  const PATH = localStorage.get(ALEMONDEJS_WORDSPACE_PATH)
  return typeof PATH === 'string' ? PATH : 'packages'
}

/**
 *
 * @param select
 */
export const setWordSpacePath = (select: string) => {
  localStorage.set(ALEMONDEJS_WORDSPACE_PATH, select)
}
