import { existsSync } from 'fs'
import { yarnRun } from './yarn'
import { corePath, templatePath } from './static'
import { join } from 'path'
import { fork } from 'child_process'
import logger from 'electron-log'

/**
 * @description bot 管理
 */

/**
 *
 * @returns
 */
export const botClose = () => {
  return new Promise(resolve => {
    yarnRun(['run', 'pm2', 'stop', 'pm2.config.cjs'])
    resolve(true)
    return
  })
}

/**
 *
 * @returns
 */
export const botRun = async () => {
  return new Promise(resolve => {
    yarnRun(['run', 'pm2', 'startOrRestart', 'pm2.config.cjs'])
    resolve(true)
    return
  })
}

/**
 *
 * @returns
 */
export const isBotRunning = () => {
  return new Promise(resolve => {
    if (!existsSync(corePath)) {
      logger.error('模版不存在')
      resolve(false)
      return
    }
    // logger.log('询问状态')
    //
    const MyJS = join(templatePath, 'bin', 'pm2.cjs')
    const child = fork(MyJS, ['--pm2-status'], {
      stdio: 'ignore', // 忽略子进程的标准输入输出
      cwd: templatePath
    })

    // 监听来自子进程的消息
    child.on('message', (message: any) => {
      // logger.log('来自子进程的消息:', message)
      // 根据子进程的消息决定是否解析
      if (message.status === 'running') {
        // logger.info('Bot running')
        resolve(message.data)
        return
      }
      resolve(false)
    })

    // 处理子进程错误
    child.on('error', err => {
      logger.error('子进程发生了错误:', err)
      resolve(false)
    })
    //

    // 监听子进程的退出事件
    child.on('exit', code => {
      if (code !== 0) {
        logger.error(`子进程退出，错误代码: ${code}`)
      } else {
        // logger.info('子进程正常结束')
      }
    })
  })
}

process.on('exit', () => {
  botClose()
})
