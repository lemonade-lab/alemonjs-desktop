import { ipcMain } from 'electron'
import { readResourcesFileSync } from '../../core/files'

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
    console.error(e)
  }
})
