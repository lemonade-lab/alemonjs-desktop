import { ipcMain } from 'electron'
import { botClose, botRun, botStatus } from '../../core/bot'
import Logger from 'electron-log'

import Store from 'electron-store'
// 创建一个 Store 实例用于存储跳过的版本
const store = new Store()

const KEY = 'bot-automatically'

// bot 状态
ipcMain.handle('bot-status', () => botStatus())
ipcMain.handle('bot-automatically', () => (store.get(KEY) == 1 ? true : false))

// bot
ipcMain.on('bot-run', (event, data) => {
  try {
    botRun(event.sender, data ?? [])
  } catch (e) {
    Logger.error(e)
  }
})

// 关闭 bot
ipcMain.on('bot-close', event => {
  botClose()
})

ipcMain.on('bot-automatically', (event, status) => {
  store.set(KEY, status ? 1 : 0)
})
