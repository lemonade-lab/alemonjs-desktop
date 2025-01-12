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
   *
   * @param {*} html
   */
  loadWebView(html) {
    // 插入脚本
    const str = `<script>  
        const createDesktopAPI = ()=> {
          const expansions_name = '${this.#name}'
          return window.appDesktopAPI.create(expansions_name)
        }
        window.createDesktopAPI = createDesktopAPI
      </script>`
    const data = html.replace('<head>', `<head> ${str}`)
    process.send({
      type: 'load-sidebar-webview',
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
  // 上下文。
  onCommand: (command, callback) => {
    // 将命令和回调函数存储起来。
    commands.push({
      command: command,
      callback
    })
  }
}

/**
 *
 */
const updateModules = () => {
  const dirs = fs.readdirSync(dir)
  for (const d of dirs) {
    const stat = fs.statSync(join(dir, d))
    if (stat.isDirectory()) {
      try {
        const pkg = require(`@alemonjs/${d}/package`)
        modules.push(pkg)
        const createDesktop = async () => {
          try {
            const desktop = await import(`@alemonjs/${d}/desktop`)
            // 模块名称
            desktops.push({
              // 模块名称
              name: pkg.name,
              // 模块描述
              value: desktop
            })
            // 传入上下文
            context._name = pkg.name
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
            if (desktop.activate) {
              await desktop.activate(context)
            }
          } catch (e) {
            // console.error(e)
          }
        }
        createDesktop()
      } catch (e) {
        // console.error(e)
      }
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
