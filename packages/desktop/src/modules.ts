import { join } from 'path'
import fs from 'fs'
import { createRequire } from 'module'
import { getConfigValue } from 'alemonjs'
import { actions, desktops, modules, views } from './storage.js'
import { Actions } from './actions.js'
import { webView } from './webview.js'
import { context } from './context.js'
const require = createRequire(import.meta.url)
const dir = join(process.cwd(), 'node_modules', '@alemonjs')

/**
 *
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
 *
 */
export const updateModules = () => {
  const dirs = fs.readdirSync(dir)
  const initapps: string[] = []
  for (const d of dirs) {
    const stat = fs.statSync(join(dir, d))
    if (stat.isDirectory()) {
      initapps.push(`@alemonjs/${d}`)
    }
  }
  const value = getConfigValue()
  if (value && Array.isArray(value.apps)) {
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
