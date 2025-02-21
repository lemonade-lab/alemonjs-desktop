import { app } from 'electron'
import { join } from 'node:path'
import { createLogMainPath, getUserDataTemplatePath } from './storage'
// log 路径
export const logMainPath = createLogMainPath()
// 本地资源路径
const resourcesPath = join(app.getAppPath(), app.isPackaged ? '../' : 'resources')
// 本地存储路径
export const storagePath = join(resourcesPath, 'storage')
// 本地预加载路径
export const preloadPath = join(resourcesPath, 'preload')
// 本地模板路径
export const templatePath = join(resourcesPath, 'template')
// 本地 bin
export const binPath = join(resourcesPath, 'bin')
// 用户资源路径
export const userDataResourcesPath = join(app.getPath('userData'), 'resources')
// 用户存储路径
export const userDataStoragePath = join(app.getPath('userData'), 'storage')
// 用户模板路径
export const userDataTemplatePath =
  getUserDataTemplatePath() ?? join(userDataResourcesPath, 'template')
// 用户依赖路径
export const userDataNodeModulesPath = join(userDataTemplatePath, 'node_modules')
// 用户包配置路径
export const userDataPackagePath = join(userDataTemplatePath, 'package.json')
// 是否是初始化模板路径
export const isInitTemplatePath = getUserDataTemplatePath() ? false : true
// cjs 路径
export const cjsYarnPath = join(binPath, 'yarn.cjs')
// cjs 路径
export const cjsDesktopPath = join(userDataTemplatePath, 'alemonjs', 'desktop.js')
// cjs 路径
export const cjsIndexPath = join(userDataTemplatePath, 'alemonjs', 'index.js')
