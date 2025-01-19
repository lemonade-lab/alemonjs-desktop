import { readFileSync, rmdirSync, writeFileSync } from 'fs'
import { join } from 'path'
import { resourcesPath, templatePath } from './static'
import Logger from 'electron-log'

/**
 * 读取资源文件
 * @param path
 * @returns
 */
export const readResourcesFileSync = (path: string[]) => {
  const dir = join(resourcesPath, ...path)
  return readFileSync(dir, 'utf-8')
}
/**
 * 写入资源文件
 * @param path
 * @param data
 * @returns
 */
export const writeResourcesFileSync = (path: string[], data: any) => {
  const dir = join(resourcesPath, ...path)
  return writeFileSync(dir, data, 'utf-8')
}

/**
 * 读取模板文件
 * @param path
 * @returns
 */
export const readTemplateFileSync = (path: string[]) => {
  const dir = join(templatePath, ...path)
  return readFileSync(dir, 'utf-8')
}

/**
 * 写入模板文件
 * @param path
 * @param data
 * @returns
 */
export const writeTemplateFileSync = (path: string[], data: any) => {
  const dir = join(templatePath, ...path)
  return writeFileSync(dir, data, 'utf-8')
}

/**
 * 删除模板文件夹
 * @param path
 */
export const rmTemplateDir = (path: string[]) => {
  try {
    rmdirSync(join(templatePath, path.join('/')), { recursive: true })
    return true
  } catch (e) {
    Logger.error(e)
    return false
  }
}
