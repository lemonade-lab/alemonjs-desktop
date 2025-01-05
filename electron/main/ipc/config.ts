import { ipcMain } from 'electron'
import { readTemplateFileSync, writeTemplateFileSync } from '../../core/files'
/**
 * alemon.config.yaml 配置管理
 */
ipcMain.handle('bot-config-read', () => {
  return readTemplateFileSync(['alemon.config.yaml'])
})
ipcMain.handle('bot-run-write', event => {
  // 新数据写入文件，并返回。
  try {
    console.log('xx', event)
    // const data = event
    // writeTemplateFileSync(['alemon.config.yaml'], data)
    // return true
  } catch (e) {
    console.log(e)
  }
  return false
})
