import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import { resourcesPath } from './static'
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
