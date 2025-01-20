import { app } from 'electron'
import { mkdirSync } from 'node:fs'
import { join } from 'node:path'
/**
 * @description 静态资源路径
 */
export const resourcesPath = join(app.getAppPath(), app.isPackaged ? '../' : 'resources')
export const templatePath = join(resourcesPath, 'template')
export const nodeModulesPath = join(templatePath, 'node_modules')
export const corePath = join(nodeModulesPath, 'alemonjs', 'package.json')
export const lemoncPath = join(templatePath, 'bin', 'yarn.cjs')

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
export const userDataResourcesPath = join(app.getPath('userData'), 'resources')
mkdirSync(userDataResourcesPath, { recursive: true })
