const { spawn } = require('child_process')
const isWindows = process.platform === 'win32'
const command = isWindows ? 'chcp 65001 &&  vite' : 'vite'
const child = spawn(command, {
  shell: isWindows,
  stdio: 'inherit'
})
child.on('exit', code => {
  console.log(`进程退出，退出码: ${code}`)
})
