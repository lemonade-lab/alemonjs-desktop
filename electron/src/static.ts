import { app } from 'electron'
import { join } from 'node:path'
import { createLogMainPath, getUserDataTemplatePath } from './storage'
export const logMainPath = createLogMainPath()
/**
 * localData
 */
const resourcesPath = join(app.getAppPath(), app.isPackaged ? '../' : 'resources')
export const storagePath = join(resourcesPath, 'storage')
export const preloadPath = join(resourcesPath, 'preload')
// template
export const templatePath = join(resourcesPath, 'template')
export const nodeModulesPath = join(templatePath, 'node_modules')
export const packagePath = join(templatePath, 'package.json')
export const warehousePath = join(templatePath, 'packages')
/**
 * userData
 */
const userDataResourcesPath = join(app.getPath('userData'), 'resources')
console.info('userDataResourcesPath', userDataResourcesPath)
export const userDataStoragePath = join(app.getPath('userData'), 'storage')
// export const userDataPreloadPath = join(userDataResourcesPath, 'preload')
// export const userDataWarehousePath = join(userDataStoragePath, 'warehouse')
// template
export const userDataTemplatePath =
  getUserDataTemplatePath() ?? join(userDataResourcesPath, 'template')
export const userDataNodeModulesPath = join(userDataTemplatePath, 'node_modules')
export const userDataPackagePath = join(userDataTemplatePath, 'package.json')
export const userDataWarehousePath = join(userDataTemplatePath, 'packages')
