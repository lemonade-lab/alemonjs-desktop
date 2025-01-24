export const storage = {
  autoUpdate: false
}

import Store from 'electron-store'

// 创建一个 Store 实例用于存储跳过的版本
export const localStorage = new Store()
