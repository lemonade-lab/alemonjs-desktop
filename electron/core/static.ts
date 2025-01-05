import { app } from 'electron'
import { join } from 'node:path'
/**
 * @description 静态资源路径
 */
export const resourcesPath = join(app.getAppPath(), app.isPackaged ? '../' : 'resources')
export const templatePath = join(resourcesPath, 'template')
export const corePath = join(templatePath, 'node_modules', 'alemonjs', 'package.json')
