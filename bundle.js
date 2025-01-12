const spawnSync = require('child_process').spawnSync

const cmds = [
  ['lerna', 'run', 'build'],
  ['electron-icon-builder', '--input=./src/assets/logo.jpg', '--output=./', '--flatten']
]

for (const cmd of cmds) {
  const msg = spawnSync('npx', cmd, {
    stdio: 'inherit',
    // env: Object.assign({}, process.env, {
    //   NODE_OPTIONS: '--import tsx'
    // }),
    shell: process.platform === 'win32'
  })
  if (msg.error) {
    console.error(msg.error)
    process.exit()
  }
}

const { cpSync, rmSync } = require('fs')
const { join } = require('path')
const input = join(process.cwd(), 'packages/redis/dist')
const output = './resources/template/packages/redis/dist'
rmSync(output, { recursive: true, force: true })
cpSync(input, output, { recursive: true })
