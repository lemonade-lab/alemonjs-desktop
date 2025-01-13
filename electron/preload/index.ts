import { ipcRenderer } from 'electron'
import './app'
import './bot'
import './controller'
import './expansions'
import './versions'
import './yarn'

// 开发工具
ipcRenderer.on('open-dev-tools', () => {
  ipcRenderer.send('OPEN-DEV-TOOLS')
})

// 刷新页面
ipcRenderer.on('reload-page', () => {
  window?.location?.reload()
})
