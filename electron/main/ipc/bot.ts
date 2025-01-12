import { ipcMain } from 'electron'
import { botClose, botRun, botStatus } from '../../core/bot'
// bot
ipcMain.handle('bot-run', (event, data) => {
  try {
    botRun(event.sender, data ?? [])
  } catch (e) {
    console.error(e)
  }
})
ipcMain.handle('bot-close', () => botClose())
ipcMain.handle('bot-status', () => botStatus())
