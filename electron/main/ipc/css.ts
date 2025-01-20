import { ipcMain } from 'electron'
import Logger from 'electron-log'
import { join } from 'node:path'
import { userDataStoragePath, storagePath } from '../../core/static'
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'

const localThemePath = join(userDataStoragePath, 'them.json')

ipcMain.on('css-variables', event => {
  const initDir = join(storagePath, 'them.init.json')
  if (!existsSync(localThemePath)) {
    mkdirSync(join(userDataStoragePath), { recursive: true })
    copyFileSync(initDir, localThemePath)
  }
  const data = readFileSync(localThemePath, 'utf-8')
  try {
    const d = JSON.parse(data.toString())
    // 发送数据
    event.sender.send('on-css-variables', d)
  } catch (e) {
    Logger.error(e)
  }
})

ipcMain.on('init-css-variables', event => {
  const initDir = join(storagePath, 'them.init.json')
  mkdirSync(join(userDataStoragePath), { recursive: true })
  copyFileSync(initDir, localThemePath)
  const data = readFileSync(localThemePath, 'utf-8')
  try {
    const d = JSON.parse(data.toString())
    // 发送数据
    event.sender.send('on-css-variables', d)
  } catch (e) {
    Logger.error(e)
  }
})

ipcMain.on('save-css-variables', (event, data) => {
  writeFileSync(localThemePath, JSON.stringify(data), 'utf-8')
})
