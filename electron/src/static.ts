import { app } from 'electron'
import Logger from 'electron-log'
import { join } from 'node:path'
/**
 * @returns
 */
const createLogMainPath = () => {
  if (process.platform === 'darwin') {
    // ~/Library/Logs/{app name}/main.log
    return join(app.getPath('home'), 'Library', 'Logs', app.getName(), 'main.log')
  } else {
    // %USERPROFILE%\AppData\Roaming\{app name}\logs\main.log
    // ~/.config/{app name}/logs/main.log
    return join(app.getPath('userData'), 'logs', 'main.log')
  }
}
export const logMainPath = createLogMainPath()

/**
 * userData
 */
const resourcesPath = join(app.getAppPath(), app.isPackaged ? '../' : 'resources')
export const templatePath = join(resourcesPath, 'template')
export const storagePath = join(resourcesPath, 'storage')
export const nodeModulesPath = join(templatePath, 'node_modules')
export const packagePath = join(nodeModulesPath, 'alemonjs', 'package.json')
export const preloadPath = join(resourcesPath, 'preload')
const userDataResourcesPath = join(app.getPath('userData'), 'resources')
console.info('userDataResourcesPath', userDataResourcesPath)
export const userDataStoragePath = join(app.getPath('userData'), 'storage')
export const userDataTemplatePath = join(userDataResourcesPath, 'template')
export const userDataNodeModulesPath = join(userDataTemplatePath, 'node_modules')
export const userDataPackagePath = join(userDataNodeModulesPath, 'alemonjs', 'package.json')
export const userDataLemoncPath = join(userDataTemplatePath, 'bin', 'yarn.cjs')
export const userDataPreloadPath = join(userDataResourcesPath, 'preload')
