import { ipcMain } from 'electron'
import { yarn } from '../../src/yarn'

// 执行yarn指令
ipcMain.on('yarn', (event, value) => {
  yarn(event.sender, value)
})
