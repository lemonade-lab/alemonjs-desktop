import fs from 'fs'
import { join } from 'path'
import os from 'os'
import { userDataLemoncPath } from '../src/static'
import { dialog } from 'electron'
import Logger from 'electron-log'

// 检测写入权限
const checkWritePermission = (path: string) => {
  try {
    fs.accessSync(path, fs.constants.W_OK)
    return true
  } catch (err) {
    return false
  }
}

export const registerCommand = async () => {
  let binPath
  if (os.platform() === 'win32') {
    // Windows
    const batContent = `@echo off\nnode "${userDataLemoncPath}" %*\n`
    if (process.env.USERPROFILE) {
      fs.writeFileSync(join(process.env.USERPROFILE, 'lemonc.bat'), batContent)
      Logger.log('lemonc 命令已注册到 Windows 系统。')
    } else {
      Logger.error('USERPROFILE 环境变量未设置。')
    }
  } else {
    // macOS/Linux
    binPath = join('/usr/local/bin', 'lemonc')
    if (!checkWritePermission('/usr/local/bin')) {
      const response = await dialog.showMessageBox({
        type: 'warning',
        buttons: ['取消', '继续'],
        title: '需要权限',
        message: '该应用需要权限来配置环境。请确保您有管理权限？'
      })
      if (response.response === 1) {
        // 用户选择继续
        Logger.log('用户选择继续并使用 sudo 权限。')
        // 在这里可以添加调用 sudo 提升权限的逻辑
      } else {
        Logger.log('用户取消了安装。')
        return
      }
    }

    const bashContent = `#!/bin/bash\nnode "${userDataLemoncPath}" "$@"\n`
    fs.writeFileSync(binPath, bashContent)
    fs.chmodSync(binPath, '755') // 赋予执行权限
    Logger.log('lemonc 命令已注册到 macOS/Linux 系统。')
  }
}
