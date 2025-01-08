import { ipcMain } from 'electron'
import { botClose, botRun, isBotRunning } from '../../core/bot'
// bot
ipcMain.handle('bot-run', event => {
  // 传入当前ipc发送者的窗口
  botRun(event.sender)
})
ipcMain.handle('bot-close', () => {
  botClose()
})
ipcMain.handle('bot-is-running', () => isBotRunning())
