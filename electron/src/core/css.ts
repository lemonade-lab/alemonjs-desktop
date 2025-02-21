import Logger from 'electron-log'
import { join } from 'node:path'
import { userDataStoragePath, storagePath } from '../data/static'
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'

export const localThemePath = join(userDataStoragePath, 'them.json')

export const getCSSVariables = () => {
  const initDir = join(storagePath, 'them.init.json')
  if (!existsSync(localThemePath)) {
    mkdirSync(join(userDataStoragePath), { recursive: true })
    copyFileSync(initDir, localThemePath)
  }
  const data = readFileSync(localThemePath, 'utf-8')
  try {
    const d = JSON.parse(data.toString())
    return d
  } catch (e) {
    Logger.error(e)
  }
}

export const getInitCSSVariables = () => {
  const initDir = join(storagePath, 'them.init.json')
  mkdirSync(join(userDataStoragePath), { recursive: true })
  copyFileSync(initDir, localThemePath)
  try {
    const data = readFileSync(localThemePath, 'utf-8')
    const d = JSON.parse(data.toString())
    return d
  } catch (e) {
    Logger.error(e)
  }
}

export const setCSSVariables = (data: Record<string, string>) => {
  writeFileSync(localThemePath, JSON.stringify(data), 'utf-8')
}
