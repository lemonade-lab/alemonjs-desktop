import { fork } from 'child_process'
import { join, dirname } from 'path'
import { fileURLToPath } from 'node:url'
const args = [...process.argv.slice(2)]
const currentFilePath = fileURLToPath(import.meta.url)
const currentDirPath = dirname(currentFilePath)
// pkg
const pkgFilr = join(currentDirPath, '../node_modules/alemonjs/package.json')
// cwd
const cwd = dirname(join(currentDirPath, '../package.json'))
// optiosn tsx
const NODE_OPTIONS = ['--import', './node_modules/tsx/dist/loader.mjs']
  .concat(args.includes('--no-watch') ? [] : ['watch', '--clear-screen=false'])
  .join(' ')
// 启动模式
if (args.includes('build')) {
  const jsFile = join(currentDirPath, '../node_modules/lvyjs/lib/index.js')
  const argsx = args.filter(arg => arg !== 'build')
  const child = fork(jsFile, ['--lvy-build', ...argsx], {
    stdio: 'ignore', // 忽略子进程的标准输入输出
    env: Object.assign({}, process.env, {
      PKG_DIR: pkgFilr,
      NODE_OPTIONS: NODE_OPTIONS
    }),
    cwd: cwd
  })
  // 处理子进程错误
  child.on('error', err => {
    console.error('子进程发生了错误:', err)
  })
  // 监听子进程的退出事件
  child.on('exit', code => {
    if (code !== 0) {
      console.error(`lvyjs子进程退出，错误代码: ${code}`)
    } else {
      console.info('lvyjs子进程正常结束')
    }
  })
} else if (args.includes('dev')) {
  const jsFile = join(currentDirPath, '../node_modules/lvyjs/lib/index.js')
  const argsx = args.filter(arg => arg !== 'dev')
  const child = fork(jsFile, ['--lvy-dev', ...argsx], {
    stdio: 'ignore', // 忽略子进程的标准输入输出
    env: Object.assign({}, process.env, {
      PKG_DIR: pkgFilr,
      NODE_OPTIONS: NODE_OPTIONS
    }),
    cwd: cwd
  })
  // 处理子进程错误
  child.on('error', err => {
    console.error('子进程发生了错误:', err)
  })
  // 监听子进程的退出事件
  child.on('exit', code => {
    if (code !== 0) {
      console.error(`lvyjs子进程退出，错误代码: ${code}`)
    } else {
      console.info('lvyjs子进程正常结束')
    }
  })
}
