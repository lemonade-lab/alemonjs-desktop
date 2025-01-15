import { ipcMain } from 'electron'
import { corePath } from '../../core/static'
import { existsSync, readFileSync } from 'fs'
import { rmTemplateDir } from '../../core/files'
import * as appsPath from '../../core/static'

// 得到应用目录
ipcMain.handle('get-apps-path', () => appsPath)

// 询问模板是否存在
ipcMain.handle('get-template-exists', () => existsSync(corePath))

// 删除所有指定目录下的文件
ipcMain.handle('rm-template-files', () => rmTemplateDir(['public', 'file']))

// 读取文件
ipcMain.handle('read-files', async (event, dir: string) => {
  return readFileSync(dir, 'utf-8')
})
