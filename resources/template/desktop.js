/**
 * 这是和主进程交互的脚本
 * 这个脚本使用fork进行加载。
 */

import { join } from 'path'
import fs from 'fs'
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const dir = join(process.cwd(), 'node_modules', '@alemonjs')

// 得到该目录的所有模块。
let modules = []

const updateModules = () => {
  const dirs = fs.readdirSync(dir)
  for (const d of dirs) {
    const stat = fs.statSync(join(dir, d))
    if (stat.isDirectory()) {
      try {
        const pkg = require(`@alemonjs/${d}/package`)
        modules.push(pkg)
      } catch (e) {
        console.error(e)
        continue
      }
    }
  }
}

const events = {
  'update-modules': () => {
    modules = []
    updateModules()
  },
  'get-modules': () => {
    if (modules.length === 0) {
      // 重新加载模块
      updateModules()
    }
    // 发送模块列表
    process.send(modules)
  }
}

// 主进程的通信，获取所有的模块。
process.on('message', msg => {
  if (events[msg]) events[msg]()
})
