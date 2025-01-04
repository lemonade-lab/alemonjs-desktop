import { BrowserWindow, ipcMain } from 'electron'
import { resourcesPath } from 'process'
import { corePath, templatePath } from '../core/static'
import {
  existsSync,
  readdirSync,
  readFileSync,
  rmdirSync,
  statSync,
  unlinkSync,
  writeFileSync
} from 'fs'
import { yarnInstall } from './yarn'
import { botClose, botRun, isBotRunning } from './bot'
import { readResourcesFileSync, writeResourcesFileSync } from '../core/files'
import { join } from 'path'
import JSON5 from 'json5'
import logger from 'electron-log'
import YAML from 'yaml'
import { autoUpdateApp } from '../core/update'

// 得到资源目录
ipcMain.handle('get-app-path', () => {
  return resourcesPath
})

// 询问 模版依赖状况
ipcMain.handle('get-template-exists', () => {
  return existsSync(corePath)
})

// 加载依赖
ipcMain.handle('yarn-install', () => yarnInstall())
ipcMain.handle('yarn-add', () => {})

// bot
ipcMain.handle('bot-run', () => {
  botRun()
})
ipcMain.handle('bot-close', () => {
  botClose()
})
ipcMain.handle('bot-is-running', () => isBotRunning())

// tools
ipcMain.on('OPEN-DEV-TOOLS', event => {
  const window = BrowserWindow.fromWebContents(event.sender)
  // 打开开发者工具
  window?.webContents?.openDevTools()
})

// 监听最小化、最大化和关闭事件
ipcMain.on('minimize-window', event => {
  const win = BrowserWindow.fromWebContents(event.sender)
  if (win) {
    win.minimize()
  }
})
ipcMain.on('maximize-window', event => {
  const win = BrowserWindow.fromWebContents(event.sender)
  if (win) {
    if (win.isMaximized()) {
      win.unmaximize()
    } else {
      win.maximize()
    }
  }
})

ipcMain.on('close-window', event => {
  const win = BrowserWindow.fromWebContents(event.sender)
  if (win) {
    win.close()
  }
})

// version
ipcMain.on('update-version', (event, __) => {
  const window = BrowserWindow.fromWebContents(event.sender)
  window && autoUpdateApp(window, true)
})

/**
 *
 * @param path
 * @returns
 */
export const rmTemplateFile = (path: string[]) => {
  const dir = join(templatePath, ...path)
  return unlinkSync(dir)
}

/**
 *
 * @param path
 */
const rmTemplateDir = (path: string[]) => {
  // 深度便利得到该文件夹的所有子文件。删除
  const dirPath = join(templatePath, path.join('/'))
  const files = readdirSync(dirPath)
  files.forEach(file => {
    const filePath = join(dirPath, file)
    const stats = statSync(filePath)
    if (stats.isDirectory()) {
      // 若是文件夹，则继续深度便利
      rmTemplateDir([...path, file])
    } else {
      // 若是文件，则删除
      rmTemplateFile([...path, file])
    }
  })
  // 删除该文件夹
  rmdirSync(dirPath)
}

// 删除所有图片
ipcMain.handle('rm-template-files-dir', () => {
  return rmTemplateDir(['public', 'file'])
})
