import { contextBridge, ipcRenderer } from 'electron'

type callback = (value: number) => void

contextBridge.exposeInMainWorld('yarn', {
  /**
   * 指令
   * @param data
   * @returns
   */
  cmds: (data: { type: string; value: string[] }) => ipcRenderer.send('yarn', data),
  /**
   * 监听
   * @param callback
   */
  on(callback: callback) {
    ipcRenderer.on('yarn-status', (_event, value) => callback(value))
  }
})
