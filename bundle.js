const spawnSync = require('child_process').spawnSync

const cmds = [
  ['lerna', 'run', 'build'],
  ['electron-icon-builder', '--input=./src/assets/logo.jpg', '--output=./', '--flatten']
]

for (const cmd of cmds) {
  const msg = spawnSync('npx', cmd, {
    stdio: 'inherit',
    shell: process.platform === 'win32'
  })
  if (msg.error) {
    console.error(msg.error)
    process.exit()
  }
}
