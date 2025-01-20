import { ipcMain } from 'electron'
import Logger from 'electron-log'
import { join } from 'node:path'
import { resourcesPath, userDataResourcesPath } from '../../core/static'
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'

ipcMain.on('css-variables', event => {
  const dir = join(userDataResourcesPath, 'storage', 'them.json')
  const initDir = join(resourcesPath, 'storage', 'them.init.json')
  if (!existsSync(dir)) {
    mkdirSync(join(userDataResourcesPath, 'storage'), { recursive: true })
    copyFileSync(initDir, dir)
  }
  const data = readFileSync(dir, 'utf-8')
  try {
    const d = JSON.parse(data.toString())
    // 发送数据
    event.sender.send('on-css-variables', d)
  } catch (e) {
    Logger.error(e)
  }
})

ipcMain.on('init-css-variables', event => {
  const dir = join(userDataResourcesPath, 'storage', 'them.json')
  const initDir = join(resourcesPath, 'storage', 'them.init.json')
  mkdirSync(join(userDataResourcesPath, 'storage'), { recursive: true })
  copyFileSync(initDir, dir)
  const data = readFileSync(dir, 'utf-8')
  try {
    const d = JSON.parse(data.toString())
    // 发送数据
    event.sender.send('on-css-variables', d)
  } catch (e) {
    Logger.error(e)
  }
})

/**
 *
 */
ipcMain.on('save-css-variables', (event, data) => {
  const dir = join(userDataResourcesPath, 'storage', 'them.json')
  writeFileSync(dir, JSON.stringify(data), 'utf-8')
})
