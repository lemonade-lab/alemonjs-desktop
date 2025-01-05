import { ipcMain } from 'electron'
import { yarnInstall } from '../../core/yarn'
// 加载依赖
ipcMain.handle('yarn-install', () => yarnInstall())
ipcMain.handle('yarn-add', () => {
  // 添加 依赖
})
