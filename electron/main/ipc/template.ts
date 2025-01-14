import { ipcMain } from 'electron'
import { corePath, resourcesPath } from '../../core/static'
import { existsSync, readFileSync } from 'fs'
import { rmTemplateDir } from '../../core/files'
import * as appsPath from '../../core/static'
ipcMain.handle('get-apps-path', () => appsPath)
// 得到资源目录
ipcMain.handle('get-app-path', () => resourcesPath)
// 询问模板是否存在
ipcMain.handle('get-template-exists', () => existsSync(corePath))
// 删除所有指定目录下的文件
ipcMain.handle('rm-template-files-dir', () => {
  return rmTemplateDir(['public', 'file'])
})

//
ipcMain.handle('read-files', async (event, dir: string) => {
  return readFileSync(dir, 'utf-8')
})
