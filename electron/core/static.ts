import { app } from 'electron'
import { join } from 'node:path'
/**
 * @description 静态资源路径
 */
export const resourcesPath = join(app.getAppPath(), app.isPackaged ? '../' : 'resources')
export const templatePath = join(resourcesPath, 'template')
export const nodeModulesPath = join(templatePath, 'node_modules')
export const corePath = join(nodeModulesPath, 'alemonjs', 'package.json')
export const lemoncPath = join(templatePath, 'bin', 'yarn.cjs')
const createLogMainPath = () => {
  const AppName = app.getName()
  if (process.platform === 'win32') {
    // %USERPROFILE%\AppData\Roaming\{app name}\logs\main.log
    return join(app.getPath('appData'), AppName, 'logs', 'main.log')
  } else if (process.platform === 'darwin') {
    // ~/Library/Logs/{app name}/main.log
    return join(app.getPath('home'), 'Library', 'Logs', AppName, 'main.log')
  } else {
    // ~/.config/{app name}/logs/main.log
    return join(app.getPath('home'), '.config', AppName, 'logs', 'main.log')
  }
}
export const logMainPath = createLogMainPath()
console.log('logMainPath', logMainPath)
