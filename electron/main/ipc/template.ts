import { dialog, ipcMain } from 'electron'
import { userDataPackagePath } from '../../core/static'
import { copyFileSync, existsSync, readFileSync, rmSync, writeFileSync } from 'fs'
import * as appsPath from '../../core/static'
import { basename, join } from 'path'
import Logger from 'electron-log'

// 得到应用目录
ipcMain.handle('get-apps-path', () => appsPath)

// 询问模板是否存在
ipcMain.handle('get-template-exists', () => existsSync(userDataPackagePath))

// 删除所有指定目录下的文件
ipcMain.handle('rm-template-files', () => {
  rmSync(join(appsPath.userDataTemplatePath, 'public', 'file'), { recursive: true, force: true })
})

// 读取文件
ipcMain.handle('read-files', async (event, dir: string) => {
  return readFileSync(dir, 'utf-8')
})

ipcMain.handle('write-files', async (event, dir: string, data: string) => {
  try {
    writeFileSync(dir, data, 'utf-8')
    return true
  } catch (e) {
    Logger.error(e)
    return false
  }
})

// 下载文件
ipcMain.on('download-files', async (event, dir: string) => {
  const filePath = dir
  try {
    if (!existsSync(filePath)) return
    const { filePath: savePath } = await dialog.showSaveDialog({
      title: '保存文件',
      defaultPath: basename(filePath), // 默认文件名
      filters: [{ name: 'Text Files', extensions: ['txt', 'log', 'lock'] }]
    })
    if (!savePath || savePath == '') return
    copyFileSync(filePath, savePath)
  } catch (e) {
    console.error(e)
  }
})
