import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import { resourcesPath, templatePath } from './static'
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
 *
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
