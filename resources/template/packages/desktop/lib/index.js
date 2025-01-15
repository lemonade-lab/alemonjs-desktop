import { getConfig } from 'alemonjs'
import { commands, modules, views } from './storage.js'
import { addModules, updateModules } from './modules.js'
import simpleGit from 'simple-git'
/**
 *
 * @param {*} repoUrl
 */
async function cloneRepo(repoUrl) {
  // 得到仓库名
  const repoName = repoUrl.split('/').pop().replace('.git', '')

  const git = simpleGit()
  const localPath = './packages/' + repoName
  try {
    await git.clone(repoUrl, localPath, ['--depth', '1'])
    process.send({
      type: 'git-clone',
      data: 1
    })
  } catch (err) {
    process.send({
      type: 'git-clone',
      data: 0
    })
    console.error('克隆仓库时出错:', err.message)
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
  },
  'git-clone': data => {
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
