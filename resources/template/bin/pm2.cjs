const pm2 = require('pm2')
const fs = require('fs')
const yaml = require('yaml')
try {
  const data = fs.readFileSync('./alemon.config.yaml', 'utf8')
  const config = yaml.parse(data)
  const app = config.pm2 || {}
  const processName = app.name || 'alemonb-desktop'
  if (Array.isArray(process.argv) && process.argv.includes('--pm2-status')) {
    pm2.connect(err => {
      if (err) {
        return process.send({ status: 'error', data: err.message })
      }
      pm2.list((err, list) => {
        if (err) {
          pm2.disconnect()
          return process.send({ status: 'error', data: err.message })
        }
        const processInfo = list.find(proc => proc.name === processName)
        const isRunning = processInfo && processInfo.pm2_env.status === 'online'
        process.send({ status: 'running', data: isRunning })
        pm2.disconnect()
      })
    })
  }
} catch (error) {
  process.send({ status: 'error', data: error.message })
}
