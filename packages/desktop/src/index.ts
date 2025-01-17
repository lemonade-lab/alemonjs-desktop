import { commands, storage } from './storage.js'
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
        data: Array.from(storage.values()).map(item => item.package)
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
        data: Array.from(storage.values()).map(item => item.package)
      })
    })
  },
  /**
   * 主动获取扩展列表
   */
  'get-expansions': () => {
    if (storage.size === 0) {
      updateModules()
    }
    // 更新模块列表
    processSend({
      type: 'get-expansions',
      data: Array.from(storage.values()).map(item => item.package)
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
    if (!storage.has(data.name)) return
    const pkg = storage.get(data.name)
    if (!pkg || !pkg.view) return
    // 执行回调函数。
    pkg.view.__messages.forEach(callback => {
      callback(data.value)
    })
    //
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
