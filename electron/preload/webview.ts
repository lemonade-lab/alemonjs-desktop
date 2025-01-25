import { ipcRenderer, contextBridge } from 'electron'

const invoke = 'expansions-post-message'

const select = {
  // 消息
  postMessage: 'webview-post-message',
  onMessage: 'webview-on-message',
  // 主题变量
  cssVariables: 'webview-css-variables',
  onCSSVariables: 'webview-on-css-variables',
  // 扩展
  getExpansions: 'webview-get-expansions',
  onExpansionsMessage: 'webview-on-expansions-message'
}

interface MessageData {
  _name: string
  type: string
  data: Record<string, any>
}

const createOn = (callback: (value: any) => void, select: string, name: string): void => {
  ipcRenderer.on(
    select,
    (_event: Electron.IpcRendererEvent, data: { name: string; value: any }) => {
      if (data.name === name) {
        callback && callback(data.value)
      }
    }
  )
}

const createValue = (data: any, name: string, typing: string): void => {
  ipcRenderer.invoke(invoke, {
    type: typing,
    data: {
      name: name,
      value: data
    }
  })
}

contextBridge.exposeInMainWorld('appDesktopHideAPI', {
  create: (name: string) => {
    ipcRenderer.invoke('webview-hide-message-create', {
      _name: name
    })
    return {
      send: (data: Record<string, any>) => {
        ipcRenderer.send('webview-hide-message', {
          _name: name,
          type: data?.type || '',
          data: data?.data || {}
        })
      },
      on: (callback: (data: MessageData) => void) => {
        ipcRenderer.on(
          'webview-hide-message',
          (_event: Electron.IpcRendererEvent, data: MessageData) => {
            if (data._name === name && callback) {
              callback(data)
            }
          }
        )
      }
    }
  },
  themeVariables: (name: string) => createValue({}, name, select.cssVariables),
  themeOn: (name: string, callback: (value: any) => void) =>
    createOn(callback, select.onCSSVariables, name)
})

// electron 桌面 接口
contextBridge.exposeInMainWorld('appDesktopAPI', {
  create: (name: string) => {
    return {
      postMessage: (data: Record<string, any>) => createValue(data, name, select.postMessage),
      onMessage: (callback: (value: any) => void) => createOn(callback, select.onMessage, name),
      expansion: {
        getList: () => createValue({}, name, select.getExpansions),
        on: (callback: (value: any) => void) => createOn(callback, select.onExpansionsMessage, name)
      }
    }
  }
})
