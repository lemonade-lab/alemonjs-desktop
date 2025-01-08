import { ipcMain } from 'electron'
import { yarnAdd, yarnInstall, yarnStatus } from '../../core/yarn'
// 加载依赖
ipcMain.handle('yarn-install', event => yarnInstall(event.sender))
ipcMain.handle('yarn-add', (event, value) => yarnAdd(event.sender, value))
ipcMain.handle('yarn-status', (event, value: 'yarnInstall' | 'yarnAdd') => yarnStatus(value))
