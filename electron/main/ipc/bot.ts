import { ipcMain } from 'electron'
import { botClose, botRun, isBotRunning } from '../../core/bot'
// bot
ipcMain.handle('bot-run', () => {
  botRun()
})
ipcMain.handle('bot-close', () => {
  botClose()
})
ipcMain.handle('bot-is-running', () => isBotRunning())
