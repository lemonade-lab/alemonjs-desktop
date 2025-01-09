import { ipcMain } from 'electron'
import { readTemplateFileSync, writeTemplateFileSync } from '../../core/files'
import YAML from 'yaml'
/**
 * alemon.config.yaml 配置管理
 */
ipcMain.handle('bot-config-read', () => {
  return readTemplateFileSync(['alemon.config.yaml'])
})

/**
 * alemon.config.yaml 配置管理
 */
ipcMain.handle('bot-config-write', (event, value) => {
  // 新数据写入文件，并返回。
  try {
    YAML.parse(value)
    try {
      const data = value
      writeTemplateFileSync(['alemon.config.yaml'], data)
      return true
    } catch (e) {
      console.log(e)
    }
  } catch (e) {
    console.log(e)
  }
  return false
})
