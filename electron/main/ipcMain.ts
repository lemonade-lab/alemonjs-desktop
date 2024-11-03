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

ipcMain.handle('bot-run', () => {
  botRun()
})

ipcMain.handle('bot-close', () => {
  botClose()
})

ipcMain.handle('bot-is-running', () => isBotRunning())

ipcMain.on('OPEN-DEV-TOOLS', event => {
  const window = BrowserWindow.fromWebContents(event.sender)
  // 打开开发者工具
  window?.webContents?.openDevTools()
})

ipcMain.handle('read-resources-files-alemon-config-json', () => {
  return readResourcesFileSync(['files', 'alemon.config.json'])
})

ipcMain.handle('write-resources-files-alemon-config-json', (event, res) => {
  try {
    logger.log('res', res)
    const data = JSON5.parse(res)
    const dependencies = data?.pkg
    logger.log('dependencies', dependencies)
    if (dependencies) {
      const pkgPath = join(templatePath, 'package.json')
      const pkgJson = JSON.parse(readFileSync(pkgPath, 'utf-8'))
      logger.log('pkgJson', pkgJson)
      // 对比是否有修改
      let t = false
      for (const key in dependencies) {
        if (pkgJson?.dependencies[key] != dependencies[key]) {
          t = true
          break
        }
      }
      pkgJson.dependencies = dependencies
      // 保存
      writeFileSync(pkgPath, JSON.stringify(pkgJson, null, 2))
      // 执行 yarn install
      if (t) {
        logger.log('yarn install')
        yarnInstall()
      }
    }
    writeResourcesFileSync(['files', 'alemon.config.json'], res)
    // save yaml

    writeResourcesFileSync(['template', 'alemon.config.yaml'], YAML.stringify(data))
    return true
  } catch (err) {
    logger.error('write resources error:', err)
    return false
  }
})

ipcMain.handle('read-resources-tm-src-hello-res-ts', () => {
  return readResourcesFileSync(['template', 'src', 'apps', 'hello', 'res.ts'])
})

ipcMain.handle('write-resources-tm-src-hello-res-ts', (_, res) => {
  try {
    writeResourcesFileSync(['template', 'src', 'apps', 'hello', 'res.ts'], res)
    return true
  } catch (err) {
    logger.error('write resources error:', err)
    return false
  }
})

ipcMain.handle('read-resources-files-test-message-json', () => {
  return readResourcesFileSync(['files', 'test.message.json'])
})

ipcMain.handle('write-resources-files-test-message-json', (_, res) => {
  try {
    // 确保格式正确
    JSON5.parse(res)
    writeResourcesFileSync(['files', 'test.message.json'], res)
    return true
  } catch (err) {
    logger.error('write resources error:', err)
    return false
  }
})

ipcMain.handle('read-resources-files-gui-config-json', () => {
  return readResourcesFileSync(['files', 'gui.config.json'])
})

ipcMain.handle('write-resources-files-gui-config-json', (_, res) => {
  try {
    // 确保格式正确
    JSON5.parse(res)
    writeResourcesFileSync(['files', 'gui.config.json'], res)
    return true
  } catch (err) {
    logger.error('write resources error:', err)
    return false
  }
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
