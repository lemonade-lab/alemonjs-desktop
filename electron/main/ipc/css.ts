import { ipcMain } from 'electron'
import { readResourcesFileSync, writeResourcesFileSync } from '../../core/files'
import Logger from 'electron-log'

/**
 *
 */
ipcMain.on('css-variables', event => {
  const data = readResourcesFileSync(['storage', 'them.json'])
  try {
    const d = JSON.parse(data.toString())
    // 发送数据
    event.sender.send('on-css-variables', d)
  } catch (e) {
    Logger.error(e)
  }
})

ipcMain.on('save-css-variables', (event, data) => {
  writeResourcesFileSync(['storage', 'them.json'], JSON.stringify(data))
})
