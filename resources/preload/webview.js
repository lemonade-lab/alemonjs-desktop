const { ipcRenderer, contextBridge } = require('electron')

const invoke = 'expansions-post-message'

const select = {
  // 消息
  postMessage: 'webview-post-message',
  onMessage: 'webview-on-message',
  // 主题变量
  cssVariables: 'webview-css-variables',
  onCSSCariables: 'webview-on-css-variables',
  // 扩展
  getExpansions: 'webview-get-expansions',
  onExpansionsMessage: 'webview-on-expansions-message'
}

const createOn = (callback, select, name) => {
  ipcRenderer.on(select.onMessage, (_event, data) => {
    if (data.name == name) {
      callback && callback(data.value)
    }
  })
}

const createValue = (data, name, typing) => {
  ipcRenderer.invoke(invoke, {
    type: typing,
    data: {
      name: name,
      value: data
    }
  })
}

contextBridge.exposeInMainWorld('appDesktopHideAPI', {
  themeVariables: name => createValue({}, name, select.cssVariables),
  themeOn: (name, callback) => createOn(callback, select.onCSSCariables, name)
})

// electron 桌面 接口
contextBridge.exposeInMainWorld('appDesktopAPI', {
  // 为 webview 创建 API
  create: name => ({
    // 发送消息
    postMessage: data => createValue(data, name, select.postMessage),
    // 监听消息
    onMessage: callback => createOn(callback, select.onMessage, name),
    // 扩展
    expansion: {
      // 获取扩展列表
      getList: () => createValue({}, name, select.getExpansions),
      // 监听发来的 message
      on: callback => createOn(callback, select.onExpansionsMessage, name)
    }
  })
})
