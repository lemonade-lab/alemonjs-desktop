import { join } from 'path'
import fs from 'fs'
import { createRequire } from 'module'
import { getConfigValue, getConfig } from 'alemonjs'
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
    if (/^file:\/\//.test(dir)) return `resource://${dir}`
    return `resource://file://${dir}`
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

const addModules = (name, callback) => {
  try {
    const pkg = require(`${name}/package`)
    if (!pkg) return
    modules.push(pkg)
    const createDesktop = async () => {
      if (!pkg.exports) return
      // 如果没有 desktop 模块，直接返回。
      if (!pkg.exports['./desktop']) {
        // 执行回调函数
        callback && callback()
        return
      }
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
        // 执行回调函数
        callback && callback()
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
  const initapps = []
  for (const d of dirs) {
    const stat = fs.statSync(join(dir, d))
    if (stat.isDirectory()) {
      initapps.push(`@alemonjs/${d}`)
    }
  }
  const value = getConfigValue()
  if (Array.isArray(value.apps)) {
    for (const app of value.apps) {
      initapps.push(app)
    }
  }
  // 去重
  const apps = Array.from(new Set(initapps))
  for (const app of apps) {
    addModules(app)
  }
}

export const events = {
  // 加载指令
  'add-expansions': name => {
    console.log('add-expansions', name)
    // 添加模块
    addModules(name, () => {
      // 更新模块列表
      process.send({
        type: 'get-expansions',
        data: modules
      })
      try {
        const pkg = modules.find(m => m.name == name)
        const isPlatform = pkg?.alemonjs?.desktop?.platform
        // 平台不添加至配置文件
        if (isPlatform) return
        const config = getConfig()
        const value = config.value ?? {}
        if (!Array.isArray(value.apps)) value.apps = []
        value.apps.push(name)
        value.apps = Array.from(new Set(value.apps))
        config.saveValue(value)
      } catch (e) {
        //
      }
    })
  },
  // 更新模块
  'update-expansions': () => {
    // 清空模块列表
    modules = []
    desktops = []
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
