import { ipcRenderer } from 'electron'
import './app'
import './bot'
import './controller'
import './expansions'
import './versions'
import './yarn'
import './theme'
import './terminal'

// 开发工具
ipcRenderer.on('open-dev-tools', () => {
  ipcRenderer.send('open-dev-tools')
})

// 刷新页面
ipcRenderer.on('reload-page', () => {
  window?.location?.reload()
})
