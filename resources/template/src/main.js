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

const context = {
  // 上下文。
  onCommand: (command, callback) => {
    // 注册命令
    // console.log('注册命令', command)
    // 将命令和回调函数存储起来。
    commands.push({
      command: command,
      callback
    })
  },
  sidebar: {
    webView: {
      loadWebView: html => {
        // 发送消息给主进程，立即渲染该页面。
        process.send({
          type: 'load-sidebar-webview',
          data: html
        })
      }
    }
  }
}

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
            desktops.push({
              // 模块名称
              name: pkg.name,
              // 模块描述
              value: desktop
            })
            // 传入 上下文
            desktops.forEach(desktop => {
              desktop.value.activate(context)
            })
          } catch (e) {
            console.error(e)
          }
        }
        createDesktop()
      } catch (e) {
        console.error(e)
        continue
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
  'command': command => {
    // 找到命令
    const value = commands.find(c => c.command == command)
    if (value) {
      // 执行命令
      value.callback()
    }
  }
}
