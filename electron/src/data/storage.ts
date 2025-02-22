import Store from 'electron-store'
import { join } from 'node:path'
import { existsSync } from 'node:fs'
import { app } from 'electron'
import {
  ALEMONJS_AUTO_INSTALL,
  ALEMONJS_AUTO_RUN_EXTENSION,
  ALEMONJS_BOT_PATH,
  ALEMONJS_WORDSPACE_PATH
} from './conifg'

// 创建一个 Store 实例用于存储跳过的版本
export const localStorage = new Store()

// 临时变量
export const temporaryStorage = {
  autoUpdate: false
}

/**
 * 设置用户数据模板路径
 * @param path
 * @returns
 */
export const setUserDataTemplatePath = (path: string) => {
  // 该目录存在 pkg.json 文件
  if (existsSync(join(path, 'package.json'))) {
    localStorage.set(ALEMONJS_BOT_PATH, path)
    return
  }
  // 不存在时，新建 template 目录
  localStorage.set(ALEMONJS_BOT_PATH, join(path, 'template'))
}

/**
 * 获取用户数据模板路径
 * @returns
 */
export const getUserDataTemplatePath = () => {
  const PATH = localStorage.get(ALEMONJS_BOT_PATH)
  return typeof PATH === 'string' ? PATH : undefined
}

/**
 * 创建日志主路径
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
 * 获取工作区路径
 * @returns
 */
export const getWordSpacePath = () => {
  const PATH = localStorage.get(ALEMONJS_WORDSPACE_PATH)
  return typeof PATH === 'string' ? PATH : 'packages'
}

/**
 * 设置工作区路径
 * @param select
 */
export const setWordSpacePath = (select: string) => {
  localStorage.set(ALEMONJS_WORDSPACE_PATH, select)
}

/**
 * 设置自动安装状态
 * @param enable
 */
export const setAutoInstall = (enable: boolean) => {
  localStorage.set(ALEMONJS_AUTO_INSTALL, enable)
}

/**
 * 获取自动安装状态
 * @returns
 */
export const getAutoInstall = () => {
  return localStorage.get(ALEMONJS_AUTO_INSTALL) || false
}

/**
 * 设置自动运行扩展
 * @param enable
 */
export const setAutoRunExtension = (enable: boolean) => {
  localStorage.set(ALEMONJS_AUTO_RUN_EXTENSION, enable)
}

/**
 * 获取自动运行扩展
 * @returns
 */
export const getAutoRunExtension = () => {
  return localStorage.get(ALEMONJS_AUTO_RUN_EXTENSION) || false
}
