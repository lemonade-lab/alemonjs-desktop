import { ipcMain } from 'electron'
import { readResourcesFileSync } from '../../core/files'

ipcMain.handle('css-variables', event => {
  const data = readResourcesFileSync(['storage', 'them.json'])
  event.sender.send('on-css-variables', data.toString())
})
