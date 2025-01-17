import { readdirSync, readFileSync, rmdirSync, statSync, unlinkSync, writeFileSync } from 'fs'
import { join } from 'path'
import { resourcesPath, templatePath } from './static'
import Logger from 'electron-log'
/**
 *
 * @param path
 * @returns
 */
export const readResourcesFileSync = (path: string[]) => {
  const dir = join(resourcesPath, ...path)
  return readFileSync(dir, 'utf-8')
}
/**
 * @param path
 * @param data
 * @returns
 */
export const writeResourcesFileSync = (path: string[], data: any) => {
  const dir = join(resourcesPath, ...path)
  return writeFileSync(dir, data, 'utf-8')
}

/**
 *
 * @param path
 * @returns
 */
export const readTemplateFileSync = (path: string[]) => {
  const dir = join(templatePath, ...path)
  return readFileSync(dir, 'utf-8')
}
/**
 *
 * @param path
 * @param data
 * @returns
 */
export const writeTemplateFileSync = (path: string[], data: any) => {
  const dir = join(templatePath, ...path)
  return writeFileSync(dir, data, 'utf-8')
}

/**
 *
 * @param path
 * @returns
 */
const rmTemplateFile = (path: string[]) => {
  const dir = join(templatePath, ...path)
  return unlinkSync(dir)
}

/**
 *
 * @param path
 */
export const rmTemplateDir = (path: string[]) => {
  try {
    // 深度便利得到该文件夹的所有子文件。删除
    const dirPath = join(templatePath, path.join('/'))
    const files = readdirSync(dirPath)
    files.forEach(file => {
      const filePath = join(dirPath, file)
      const stats = statSync(filePath)
      if (stats.isDirectory()) {
        // 若是文件夹，则继续深度便利
        rmTemplateDir([...path, file])
      } else {
        // 若是文件，则删除
        rmTemplateFile([...path, file])
      }
    })
    // 删除该文件夹
    rmdirSync(dirPath)
    return true
  } catch (e) {
    Logger.error(e)
    return false
  }
}
