import { ipcMain } from 'electron'
import { yarn } from '../../src/script/yarn'

// 执行yarn指令
ipcMain.on('yarn', (event, value) => {
  yarn(event.sender, value)
})
