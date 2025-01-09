import { ipcMain } from 'electron'
import { readResourcesFileSync } from '../../core/files'

ipcMain.handle('css-variables', event => {
  const data = readResourcesFileSync(['stroe', 'them.json'])
  console.log(data.toString())
  event.sender.send('on-css-variables', data.toString())
})
