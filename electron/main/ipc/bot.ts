import { ipcMain } from 'electron'
import { botClose, botRun, botStatus } from '../../src/bot'
import Logger from 'electron-log'

// bot 状态
ipcMain.handle('bot-status', () => botStatus())

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
