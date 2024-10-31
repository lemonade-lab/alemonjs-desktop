const fs = require('fs')
const yaml = require('yaml')
const data = fs.readFileSync('./alemon.config.yaml', 'utf8')
const config = yaml.parse(data)
const app = config?.pm2 ?? {}
fs.mkdirSync('./logs', { recursive: true })
const name = 'alemonb-desktop'
/**
 * @type {{ apps: import("pm2").StartOptions[] }}
 */
module.exports = {
  apps: [
    {
      name: name,
      // 超时时间内进程仍未终止，则 PM2 将强制终止该进程
      kill_timeout: 5000,
      // 发送意外重启
      autorestart: true,
      // 进程到达指定内存时重启
      max_memory_restart: '2G',
      // 进程重启之间的延迟时间
      restart_delay: 5000,
      // fork
      exec_mode: 'fork',
      // 进程重启之间的最大延迟时间
      restart_delay_max: 10000,
      // 将 PM2 进程列表自动保存到文件中
      autodump: true,
      // 不监听文件变化
      watch: false,
      // logs 文件夹下的日志文件
      out_file: `logs/${app?.name ?? name}/output.log`,
      error_file: `logs/${app?.name ?? name}/error.log`,
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      ...app,
      env: {
        NODE_ENV: 'production',
        ...(app?.env ?? {})
      }
    }
  ]
}
