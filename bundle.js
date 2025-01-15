const spawnSync = require('child_process').spawnSync

const cmds = [
  ['lerna', 'run', 'build'],
  ['electron-icon-builder', '--input=./src/assets/logo_white.png', '--output=./', '--flatten']
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

const fs = require('fs')
const path = require('path')

const input = path.join(process.cwd(), 'packages')

const dirs = fs
  .readdirSync(input, {
    withFileTypes: true
  })
  .filter(d => d.isDirectory())

dirs.forEach(d => {
  const src = path.join(input, d.name)
  const dest = path.join(process.cwd(), 'resources/template/packages', d.name)
  fs.mkdirSync(dest, { recursive: true })
  fs.copyFileSync(path.join(src, 'package.json'), path.join(dest, 'package.json'))
  fs.cpSync(path.join(src, 'lib'), path.join(dest, 'lib'), { recursive: true })
})
