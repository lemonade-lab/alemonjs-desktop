import { ipcMain } from 'electron'
import { botClose, botRun, botStatus } from '../../core/bot'

// bot 状态
ipcMain.handle('bot-status', () => botStatus())

// bot
ipcMain.on('bot-run', (event, data) => {
  try {
    botRun(event.sender, data ?? [])
  } catch (e) {
    console.error(e)
  }
})

// 关闭 bot
ipcMain.on('bot-close', event => {
  botClose()
})
