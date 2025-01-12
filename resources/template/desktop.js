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
    console.log('注册命令', command)
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

let count = -1

const updateModules = () => {
  const dirs = fs.readdirSync(dir)
  // dirs.length
  count = dirs.length
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
          // 处理完成
          count--
        }

        createDesktop()

        //
      } catch (e) {
        // 处理完成
        count--

        console.error(e)
        continue
      }
    }
  }
}

// 临时指令
const commandStorage = []

// 开始执行命令
const commandStart = () => {
  if (count != 0) {
    setTimeout(commandStart, 1000)
    return
  }
  // 执行命令
  commandStorage.forEach(command => {
    // 找到命令
    const value = commands.find(c => c.command == command)
    if (value) {
      // 执行命令
      value.callback()
    }
  })
}

setTimeout(commandStart, 1000)

const events = {
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
  // 侧边栏被点击
  'sidebar-click': data => {
    console.log('sidebar-click', data)
  },
  'command': command => {
    console.log('command', commands, command)
    // 未加载完成
    if (count != 0) {
      // 存储命令
      commandStorage.push(command)
    } else {
      // 插件加载没完成，就发起的命令
      // 需要存储起来，等插件加载完成后再执行。
      // 找到命令
      const value = commands.find(c => c.command == command)
      if (value) {
        // 执行命令
        value.callback()
      }
    }
  }
}

// 主进程的通信，获取所有的模块。
process.on('message', event => {
  if (events[event.type]) events[event.type](event.data)
})
