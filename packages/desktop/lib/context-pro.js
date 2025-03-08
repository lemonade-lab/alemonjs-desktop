import { processSend } from './send.js'
import { commands } from './storage.js'

class Context {
  createExtensionDir(dir) {
    return `resource://-/${dir.replace(/^file:\/\//, '')}`
  }
  createAction(_context) {
    // @ts-ignore
    return
  }
  createSidebarWebView(_context) {
    // @ts-ignore
    return
  }
  /**
   * 发送通知
   * @param message
   */
  notification(message) {
    processSend({
      type: 'notification',
      data: message
    })
  }
  /**
   * 监听命令
   * @param command
   * @param callback
   */
  onCommand(command, callback) {
    commands.push({
      command: command,
      callback
    })
  }
}
class webView {
  /**
   *  插入脚本
   */
  get #htmlScript() {
    return `<script>  
            const createDesktopAPI = ()=> {
              const expansionsName = '${this._name}'
              return window.appDesktopAPI.create(expansionsName)
            }
            window.createDesktopAPI = createDesktopAPI
    </script>`
  }
  _name = null
  __messages = []
  constructor(_ctx, _name) {
    this._name = _name
  }
  /**
   *
   * @param {*} callback
   */
  onMessage(callback) {
    this.__messages.push(callback)
  }
  /**
   * 传入消息
   * @param {*} data
   */
  postMessage(data) {
    processSend({
      // 丢给 on message
      type: 'webview-on-message',
      // 传入数据
      data: {
        // 模块名称
        name: this._name,
        // 传入数据
        value: data
      }
    })
  }
  /**
   *
   * @param {*} html
   */
  loadWebView(html) {
    // 插入脚本
    const data = html.replace('<head>', `<head> ${this.#htmlScript} `)
    processSend({
      type: 'webview-sidebar-load',
      data: data
    })
  }
}
class Actions {
  // 一组行为，使用:分开
  #event = ''
  _name
  constructor(_ctx, _name) {
    this._name = _name
  }
  create() {
    // 创建 行为
    this.#event = 'action'
  }
  // 点击命令输入框
  onClickCommandInput() {
    // 点击命令输入框
    this.#event = `${this.#event}:click-CommandInput`
  }
  // 点击logo
  onClickLogo() {
    // 点击logo
    this.#event = `${this.#event}:click-Logo`
  }
  // 点击组件
  onClickComponent() {
    this.#event = `${this.#event}:click-Component`
  }
  // 点击扩展
  onClickExtension() {
    this.#event = `${this.#event}:click-Extension`
    return {
      loadWebView: html => {
        // const view = new webView('extension')
        // view.loadWebView(html)
        // return view
        console.log('loadWebView', html)
      }
    }
  }
  // 点击扩展商场
  onClickExtensionShoping() {
    this.#event = `${this.#event}:click-ExtensionShoping`
  }
  // 点击设置
  onClickSetting() {
    this.#event = `${this.#event}:click-Setting`
  }
}

export { Actions, Context, webView }
