import { ipcMain } from 'electron'
import { userDataWarehousePath } from '../../src/static'
import simpleGit from 'simple-git'
import fs from 'fs'
import path from 'path'
import { webContents } from 'electron'

const init = () => {
  if (!fs.existsSync(userDataWarehousePath)) {
    fs.mkdirSync(userDataWarehousePath, {
      recursive: true
    })
  }
}

// 丢出错误
const sendError = (e: any) => {
  console.error(e)
  if (e && e.message) {
    const allWebContents = webContents.getAllWebContents()
    allWebContents.forEach(contents => {
      if (contents.isDestroyed()) return
      contents.send('on-terminal', e.message)
    })
    global.mainWindow?.webContents.send('on-notification', e.message)
  }
}

// 获取指定目录下的所有仓库
ipcMain.handle('git-repos', async () => {
  try {
    init()
    const dirs = fs.readdirSync(userDataWarehousePath, { withFileTypes: true })
    const repos = dirs.filter(dirent => dirent.isDirectory()).map(dirent => dirent.name)
    return repos
  } catch (e) {
    sendError(e)
    // 丢出错误
    throw e
  }
})

// 打开指定仓库
ipcMain.handle('git-open-repo', async (event, repoName: string) => {
  try {
    init()
    const repoPath = path.join(userDataWarehousePath, repoName)
    const repoGit = simpleGit(repoPath)
    return repoGit
  } catch (e) {
    sendError(e)
    // 丢出错误
    throw e
  }
})

// git clone
ipcMain.handle('git-clone', async (event, repoUrl: string) => {
  try {
    init()
    const repoGit = simpleGit(userDataWarehousePath)
    const data = await repoGit.clone(repoUrl)
    return data
  } catch (e) {
    sendError(e)
    // 丢出错误
    throw e
  }
})

// 当前分支
ipcMain.handle('git-current-branch', async (event, repoName: string) => {
  try {
    init()
    const repoPath = path.join(userDataWarehousePath, repoName)
    const repoGit = simpleGit(repoPath)
    const data = await repoGit.branch()
    return data
  } catch (e) {
    sendError(e)
    // 丢出错误
    throw e
  }
})

// 所有分支
ipcMain.handle('git-branch', async (event, repoName: string) => {
  try {
    init()
    const repoPath = path.join(userDataWarehousePath, repoName)
    const repoGit = simpleGit(repoPath)
    const data = await repoGit.branch(['-r'])
    return data
  } catch (e) {
    sendError(e)
    // 丢出错误
    throw e
  }
})

// 切换分支
ipcMain.handle('git-checkout', async (event, repoName: string, branch: string) => {
  try {
    init()
    const repoPath = path.join(userDataWarehousePath, repoName)
    const repoGit = simpleGit(repoPath)
    const data = await repoGit.checkout(branch)
    return data
  } catch (e) {
    sendError(e)
    // 丢出错误
    throw e
  }
})

// 所有tags
ipcMain.handle('git-tags', async (event, repoName: string) => {
  try {
    init()
    const repoPath = path.join(userDataWarehousePath, repoName)
    const repoGit = simpleGit(repoPath)
    const data = await repoGit.tags()
    return data
  } catch (e) {
    sendError(e)
    // 丢出错误
    throw e
  }
})

// 当前分支下的所有提交
ipcMain.handle('git-log', async (event, repoName: string, branch: string) => {
  try {
    init()
    const repoPath = path.join(userDataWarehousePath, repoName)
    console.log(repoPath)
    const repoGit = simpleGit(repoPath)
    if (branch === 'origin/main') {
      const data = await repoGit.log({ maxCount: 99 })
      return data
    }
    const data = await repoGit.log({ from: branch, maxCount: 99 })
    return data
  } catch (e) {
    sendError(e)
    // 丢出错误
    throw e
  }
})

// 删除仓库
ipcMain.handle('git-delete', async (event, repoName: string) => {
  try {
    init()
    const repoPath = path.join(userDataWarehousePath, repoName)
    fs.rmdirSync(repoPath, { recursive: true })
  } catch (e) {
    sendError(e)
    // 丢出错误
    throw e
  }
})

// 指定 hash 的 README.md
ipcMain.handle('git-show', async (event, repoName: string, hash: string) => {
  try {
    init()
    const repoPath = path.join(userDataWarehousePath, repoName)
    const repoGit = simpleGit(repoPath)
    const data = await repoGit.show([`${hash}:README.md`])
    return data
  } catch (e) {
    sendError(e)
    // 丢出错误
    throw e
  }
})

// 指定 tags 的
ipcMain.handle('git-show-tags', async (event, repoName: string, tag: string) => {
  try {
    init()
    const repoPath = path.join(userDataWarehousePath, repoName)
    const repoGit = simpleGit(repoPath)
    const data = await repoGit.show([`${tag}:README.md`])
    return data
  } catch (e) {
    sendError(e)
    throw e
  }
})
