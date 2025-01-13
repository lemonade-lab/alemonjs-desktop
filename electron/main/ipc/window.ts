import { BrowserWindow, ipcMain } from 'electron'

// 监听最小化、最大化和关闭事件
ipcMain.on('minimize-window', event => {
  const win = BrowserWindow.fromWebContents(event.sender)
  if (!win) return
  // 窗口已经被销毁
  if (win.isDestroyed()) return
  // 最小化窗口
  win.minimize()
})

ipcMain.on('maximize-window', event => {
  const win = BrowserWindow.fromWebContents(event.sender)
  if (!win) return
  if (win.isDestroyed()) return
  if (win.isMaximized()) {
    win.unmaximize()
  } else {
    win.maximize()
  }
})

ipcMain.on('close-window', event => {
  const win = BrowserWindow.fromWebContents(event.sender)
  if (!win) return
  // 窗口已经被销毁
  if (win.isDestroyed()) return
  // 判断平台
  if (process.platform === 'darwin') {
    // 隐藏窗口
    win.hide()
  } else {
    // 关闭窗口
    win.close()
  }
})
