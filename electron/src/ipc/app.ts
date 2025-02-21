import { app, dialog, ipcMain } from 'electron'
import { copyFileSync, existsSync, readFileSync, rmSync, writeFileSync } from 'fs'
import * as appsPath from '../../src/data/static'
import { basename, join } from 'path'
import Logger from 'electron-log'
import { initTemplate } from '../core/init'
import { setUserDataTemplatePath } from '../../src/data/storage'

// 得到应用目录
ipcMain.handle('get-apps-path', () => appsPath)

// 删除指定目录下的所有目录及文件
ipcMain.handle('rm-template-files', () => {
  rmSync(join(appsPath.userDataTemplatePath, 'public', 'file'), { recursive: true, force: true })
})

// 读取文件
ipcMain.handle('read-files', (event, dir: string) => readFileSync(dir, 'utf-8'))

// 写入文件
ipcMain.handle('write-files', async (event, dir: string, data: string) => {
  // 返回是否写入成功
  try {
    writeFileSync(dir, data, 'utf-8')
    return true
  } catch (e) {
    Logger.error(e)
    return false
  }
})

// fecch 请求
ipcMain.handle('fetch', async (event, url: string, options: any) => {
  const data = await fetch(url, options)
  const res = {
    body: data.body,
    bodyUsed: data.bodyUsed,
    ok: data.ok,
    redirected: data.redirected,
    type: data.type,
    url: data.url
  }
  return res
})

// 询问文件是否存在
ipcMain.handle('exists-files', (event, dir: string) => existsSync(dir))

// 选择文件
ipcMain.handle('select-directory', async () => {
  const result = await dialog.showOpenDialog({
    properties: ['openDirectory']
  })
  // 返回选择的目录 Array<string>
  return result.filePaths
})

// 下载文件
ipcMain.on('download-files', async (event, filePath: string) => {
  try {
    if (!existsSync(filePath)) return
    const { filePath: savePath } = await dialog.showSaveDialog({
      title: '保存文件',
      defaultPath: basename(filePath), // 默认文件名
      filters: [{ name: 'Text Files', extensions: ['txt', 'log', 'lock'] }]
    })
    if (!savePath || savePath == '') return
    copyFileSync(filePath, savePath)
    return
  } catch (e) {
    Logger.error(e)
    return
  }
})

// 设置以指定目录打开，并重启应用
ipcMain.on('restart-app', (event, dirPath: string) => {
  if (appsPath.userDataTemplatePath === dirPath) {
    event.sender.send('on-notification', '选择目录和当前启动目录相同，请重新选择...')
    return
  }
  // 保存dir
  setUserDataTemplatePath(dirPath)
  event.sender.send('on-notification', '2s后重启应用...')
  setTimeout(() => {
    app.relaunch() // 重新启动应用
    app.exit() // 退出当前进程
  }, 2000)
})

// 重置模板
ipcMain.on('reset-template', () => {
  try {
    initTemplate()
    Logger.log('重置模板成功，2s后重启...')
    // 重启应用
    setTimeout(() => {
      app.relaunch() // 重新启动应用
      app.exit() // 退出当前进程
    }, 2000)
  } catch (e) {
    Logger.error(e)
  }
})
