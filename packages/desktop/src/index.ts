import { commands, modules, views } from './storage.js'
import { addModules, delModules, disableModules, updateModules } from './modules.js'
import { cloneRepo } from './git.js'
import { processSend } from './send.js'

export const events = {
  /**
   * 恢复扩展
   */
  'restore-expansions': () => {
    updateModules()
  },
  /**
   * 禁用扩展
   * @param name
   */
  'disable-expansions': (name: string) => {
    disableModules(name)
  },
  /**
   * 删除扩展
   * @param name
   */
  'del-expansions': (name: string) => {
    delModules(name, () => {
      // 更新模块列表
      processSend({
        type: 'get-expansions',
        data: modules
      })
    })
  },
  /**
   * 立即加载扩展
   * @param name
   */
  'add-expansions': (name: string) => {
    // 添加模块
    addModules(name, () => {
      // 加载完毕后，更新扩展列表
      processSend({
        type: 'get-expansions',
        data: modules
      })
    })
  },
  /**
   * 主动获取扩展列表
   */
  'get-expansions': () => {
    // 从未加载过模块
    if (modules.length === 0) {
      // 更新模块脚本
      updateModules()
    }
    // 更新模块列表
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
