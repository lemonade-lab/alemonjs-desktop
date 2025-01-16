import { join } from 'path'
import fs from 'fs'
import { createRequire } from 'module'
import { actions, desktops, modules, views } from './storage.js'
import { Actions } from './actions.js'
import { webView } from './webview.js'
import { context } from './context.js'
const require = createRequire(import.meta.url)
const nodeModulesDir = join(process.cwd(), 'node_modules')
const pkgModulesDir = join(process.cwd(), 'packages')

/**
 * @param name
 * @param callback
 * @returns
 */
export const addModules = (name: string, callback?: Function) => {
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
          // 注册webview
          views.push({
            name: _name,
            value: view
          })
          return view
        }
        context.createAction = context => {
          const _name = context._name
          const action = new Actions(_name)
          // 注册行为
          actions.push({
            name: _name,
            value: action
          })
          return action
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

/**
 * 获取 alemonjs- 和 @alemonjs/ 下的模块
 * @returns
 */
export const updateModules = () => {
  if (!fs.existsSync(nodeModulesDir)) return
  const initapps: string[] = []
  // 正则条件
  const reg = /^alemonjs-/
  const nodeModules = fs.readdirSync(nodeModulesDir).filter(name => reg.test(name))
  for (const name of nodeModules) {
    const stat = fs.statSync(join(nodeModulesDir, name))
    if (stat.isDirectory()) {
      initapps.push(name)
    }
  }
  const mentionModuleDir = join(nodeModulesDir, '@alemonjs')
  const mentionModules = fs.readdirSync(mentionModuleDir)
  for (const name of mentionModules) {
    const stat = fs.statSync(join(mentionModuleDir, name))
    if (stat.isDirectory()) {
      initapps.push(`@alemonjs/${name}`)
    }
  }
  // 去重
  const apps = Array.from(new Set(initapps))
  for (const app of apps) {
    addModules(app)
  }
}

// 可能是pkg模块。

// 删除
export const delModules = (name: string, callback?: Function) => {
  fs.rmdirSync(join(nodeModulesDir, name), { recursive: true })
  callback && callback()
}

// 禁用
export const disableModules = (name: string) => {
  const dir = join(nodeModulesDir, name)
  const cacheDir = join(nodeModulesDir, '.alemonjs', name)
  // cp
  fs.cpSync(dir, cacheDir, { recursive: true })
  // rm
  fs.rmdirSync(join(nodeModulesDir, name), { recursive: true })
}

// 恢复
export const cloneModules = (name: string, callback?: Function) => {
  const dir = join(nodeModulesDir, name)
  const cacheDir = join(nodeModulesDir, '.alemonjs', name)
  // cp
  fs.cpSync(cacheDir, dir, { recursive: true })
  callback && callback()
}
