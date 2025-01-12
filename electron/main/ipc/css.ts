import { ipcMain } from 'electron'
import { readResourcesFileSync } from '../../core/files'
ipcMain.handle('css-variables', event => {
  const data = readResourcesFileSync(['storage', 'them.json'])
  try {
    const d = JSON.parse(data.toString())
    event.sender.send('on-css-variables', d)
  } catch (e) {
    console.error(e)
  }
})
