import { contextBridge, ipcRenderer } from 'electron'
//
contextBridge.exposeInMainWorld('app', {
  // 得到配置
  getConfig: (key: string | string[]) => ipcRenderer.invoke('get-config', key),
  // 设置配置
  setConfig: (key: string, value: any) => ipcRenderer.invoke('set-config', key, value),
  // 删除模板文件
  rmTemplateFiles: () => ipcRenderer.invoke('rm-template-files'),
  // 重置模板
  resetTemplate: () => ipcRenderer.send('reset-template'),
  // 读取文件
  readFiles: (data: string) => ipcRenderer.invoke('read-files', data),
  // 写入文件
  writeFiles: (dir: string, data: string) => ipcRenderer.invoke('write-files', dir, data),
  // 文件是否存在
  exists: (dir: string) => ipcRenderer.invoke('exists-files', dir),
  // 请求
  fetch: (url: string, options: any) => ipcRenderer.invoke('fetch', url, options),
  // 下载文件
  downloadFiles: (data: string) => ipcRenderer.send('download-files', data),
  // 选择目录
  selectDirectory: () => ipcRenderer.invoke('select-directory'),
  // 设置重启
  reStart: (dir: string) => ipcRenderer.send('restart-app', dir)
})

contextBridge.exposeInMainWorld('page', {
  // 打开终端
  openWindowTerminal: () => ipcRenderer.send('open-window-terminal'),
  // 打开主窗口
  openWindowMain: () => ipcRenderer.send('open-window-main')
})
