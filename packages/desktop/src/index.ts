import { getConfig } from 'alemonjs'
import { commands, modules, views } from './storage.js'
import { addModules, updateModules } from './modules.js'
import { cloneRepo } from './git.js'
import { processSend } from './send.js'

export const events = {
  'del-expansions': (name: string) => {
    // 删除模块。
    // 需要包模块移动到 新的目录。用来缓存。
    // .cache-packages
    // 找到对应的模块。
    // 先在 node_modules 中寻找。
    // 再去 packages 中寻找。
    // 如果没有。就推送通知。
  },
  // 加载指令
  'add-expansions': (name: string) => {
    // 增加模块的时候。
    // 可以先去看看 .cache-packages 是否有缓存。
    // 如果有。可以移动到 node_modules 中。

    // 移动之前，判断是否已经在 node_modules 中。
    // 如果在，则使用 yarn install。

    console.log('add-expansions', name)

    // 添加模块
    addModules(name, () => {
      // 更新模块列表
      processSend({
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
  // 获取模块列表
  'get-expansions': () => {
    if (modules.length === 0) {
      // 重新加载模块
      updateModules()
    }
    // 发送模块列表
    processSend({
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
  },
  'git-clone': (data: string) => {
    cloneRepo(data)
  },
  'git-pull': data => {
    //
  },
  'git-commit': data => {
    //
  },
  'git-branch': data => {
    //
  },
  'git-checkout': data => {
    //
  },
  'git-tag': data => {
    //
  }
}
