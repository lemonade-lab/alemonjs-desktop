import { ipcMain } from 'electron'
import { yarnAdd, yarnInstall, yarnLink, yarnStatus, yarnUnLink } from '../../core/yarn'
// 加载依赖
ipcMain.handle('yarn-install', event => {
  yarnInstall(event.sender)
})
ipcMain.handle('yarn-add', (event, value) => yarnAdd(event.sender, value))
ipcMain.handle('yarn-status', (event, value: 'yarnInstall' | 'yarnAdd' | 'yarnLink') =>
  yarnStatus(value)
)
ipcMain.handle('yarn-link', (event, value) => yarnLink(event.sender, value))
ipcMain.handle('yarn-unlink', (event, value) => yarnUnLink(event.sender, value))
