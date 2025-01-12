import { events } from './src/main.js'
// 主进程的通信，获取所有的模块。
process.on('message', event => {
  if (events[event.type]) events[event.type](event.data)
})
