import { ipcMain } from 'electron'

// 这里的前提是，依赖完成后，才能加载扩展。

ipcMain.handle('expansions-load', () => {
  // 加载扩展。
  return
})
