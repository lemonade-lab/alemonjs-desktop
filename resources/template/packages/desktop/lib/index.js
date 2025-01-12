import { join } from 'path'
import fs from 'fs'
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const dir = join(process.cwd(), 'node_modules', '@alemonjs')

// 得到该目录的所有模块。
let modules = []

// desktop
const desktops = []
const commands = []
const views = []

class webView {
  /**
   *  插入脚本
   */
  get #htmlScript() {
    return `<script>  
          const createDesktopAPI = ()=> {
            const expansions_name = '${this.#name}'
            return window.appDesktopAPI.create(expansions_name)
          }
          window.createDesktopAPI = createDesktopAPI
  </script>`
  }

  #name = null

  __messages = []

  constructor(name) {
    this.#name = name
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
    process.send({
      // 丢给 on message
      type: 'webview-on-message',
      // 传入数据
      data: {
        // 模块名称
        name: this.#name,
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
    const data = html.replace('<head>', `<head> ${this.#htmlScript}`)
    process.send({
      type: 'webview-sidebar-load',
      data: data
    })
  }
}

const context = {
  /**
   * 创建扩展路径
   * @param {*} dir
   * @returns
   */
  createExtensionDir: dir => {
    const path = dir
      .replace(/\\/g, '/')
      .replace(/file:\/\//, '')
      .replace(process.cwd(), '')
    // 使用 resource 协议
    return `resource://template/${path}`
  },
  notification: message => {
    process.send({
      type: 'notification',
      data: message
    })
  },
  command: command => {
    process.send({
      type: 'command',
      data: command
    })
  },
  // 上下文。
  onCommand: (command, callback) => {
    // 将命令和回调函数存储起来。
    commands.push({
      command: command,
      callback
    })
  }
}

const addModules = name => {
  try {
    const pkg = require(`${name}/package`)
    modules.push(pkg)
    const createDesktop = async () => {
      // 如果没有 desktop 模块，直接返回。
      if (!pkg.exports['./desktop']) return
      //
      try {
        const desktop = await import(`${name}/desktop`)
        const _name = pkg.name
        // 模块名称
        desktops.push({
          // 模块名称
          name: _name,
          // 模块描述
          value: desktop
        })
        // 传入上下文
        context._name = _name
        // 创建 webview
        context.createSidebarWebView = context => {
          const _name = context._name
          const view = new webView(_name)
          views.push({
            name: _name,
            value: view
          })
          return view
        }
        if (desktop.activate) await desktop.activate(context)
      } catch (e) {
        // console.error(e)
      }
    }
    createDesktop()
  } catch (e) {
    // console.error(e)
  }
}

const updateModules = () => {
  const dirs = fs.readdirSync(dir)
  for (const d of dirs) {
    const stat = fs.statSync(join(dir, d))
    if (stat.isDirectory()) {
      addModules(`@alemonjs/${d}`)
    }
  }
}

export const events = {
  // 加载指令
  'add-extension': name => {
    // 将结果发送回父进程
    process.send({
      type: 'add-extension',
      data: {
        name,
        success: true
      }
    })
  },
  // 更新模块
  'update-expansions': () => {
    // 清空模块列表
    modules = []
    desktops = []
    //
    updateModules()
    // 发送模块列表
    process.send({
      type: 'update-expansions',
      data: modules
    })
  },
  // 获取模块列表
  'get-expansions': () => {
    if (modules.length === 0) {
      // 重新加载模块
      updateModules()
    }
    // 发送模块列表
    process.send({
      type: 'get-expansions',
      data: modules
    })
  },
  // 执行命令
  'command': command => {
    // 找到命令
    const value = commands.find(c => c.command == command)
    if (value) {
      // 执行命令
      value.callback()
    }
  },
  'webview-post-message': data => {
    // 找到对应插件的webview实例。
    const view = views.find(item => item.name == data.name)
    if (view) {
      // 执行回调函数。
      view.value.__messages.forEach(callback => {
        callback(data.value)
      })
    }
  }
}
