import { contextBridge, ipcRenderer } from 'electron'

// 控制 electron
contextBridge.exposeInMainWorld('controller', {
  /**
   *
   */
  minimize: () => {
    ipcRenderer.send('minimize-window')
  },
  /**
   *
   */
  maximize: () => {
    ipcRenderer.send('maximize-window')
  },
  /**
   *
   */
  close: () => {
    ipcRenderer.send('close-window')
  },
  /**
   *
   */
  updateVersion: () => {
    ipcRenderer.send('update-version')
  },
  /**
   *
   * @param callback
   */
  onDownloadProgress: (callback: (val: any) => void) => {
    ipcRenderer.on('on-download-progress', (_event, value) => callback(value))
  },
  /**
   *
   * @param enable
   * @returns
   */
  setAutoLaunch: (enable: boolean) => ipcRenderer.invoke('set-auto-launch', enable),
  /**
   *
   * @returns
   */
  autoLaunchStutas: () => ipcRenderer.invoke('get-auto-launch-status'),
  /**
   *
   * @param callback
   */
  onNotification: (callback: (val: any) => void) => {
    ipcRenderer.on('on-notification', (_event, value) => callback(value))
  },
  onModal: (callback: (val: any) => void) => {
    ipcRenderer.on('on-modal', (_event, value) => callback(value))
  },
  onClick: (code: number, data: any) => ipcRenderer.invoke('on-clicked', code, data)
})
