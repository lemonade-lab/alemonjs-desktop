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
// const fs = require('fs')
// const path = require('path')
// const input = path.join(process.cwd(), 'packages')
// const output = path.join(process.cwd(), 'resources/template/packages')
// const dirs = fs
//   .readdirSync(input, {
//     withFileTypes: true
//   })
//   .filter(d => d.isDirectory())
// dirs.forEach(d => {
//   const src = path.join(input, d.name)
//   const dest = path.join(output, d.name)
//   if (/frontend/.test(src)) {
//     // dist 目录 copy到
//     const name = d.name.split('-')[0]
//     fs.cpSync(path.join(src, 'dist'), path.join(output, name, 'dist'), { recursive: true })
//     return
//   }
//   fs.mkdirSync(dest, { recursive: true })
//   const files = ['README.md', 'package.json']
//   files.forEach(f => fs.copyFileSync(path.join(src, f), path.join(dest, f)))
//   const dirs = ['lib']
//   dirs.forEach(d => fs.cpSync(path.join(src, d), path.join(dest, d), { recursive: true }))
// })
