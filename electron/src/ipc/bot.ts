import { ipcMain } from 'electron'
import { botClose, botRun, botStatus } from '../../src/script/bot'

// 得到 bot 状态
ipcMain.handle('bot-status', () => botStatus())

// 运行 bot
ipcMain.on('bot-run', (event, data) => {
  botRun(event.sender, data ?? [])
})

// 关闭 bot
ipcMain.on('bot-close', () => {
  botClose()
})
