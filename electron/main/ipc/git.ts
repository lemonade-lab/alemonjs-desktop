import { ipcMain } from 'electron'
import { userDataWarehousePath } from '../../src/static'
import simpleGit from 'simple-git'
import fs from 'fs'
import path from 'path'

if (!fs.existsSync(userDataWarehousePath)) {
  fs.mkdirSync(userDataWarehousePath, {
    recursive: true
  })
}

const git = simpleGit(userDataWarehousePath)

// 获取指定目录下的所有仓库
ipcMain.handle('git-repos', async () => {
  const dirs = fs.readdirSync(userDataWarehousePath, { withFileTypes: true })
  const repos = dirs.filter(dirent => dirent.isDirectory()).map(dirent => dirent.name)
  return repos
})

// 打开指定仓库
ipcMain.handle('git-open-repo', async (event, repoName: string) => {
  const repoPath = path.join(userDataWarehousePath, repoName)
  const repoGit = simpleGit(repoPath)
  return repoGit
})

// git clone
ipcMain.handle('git-clone', (event, repoUrl: string) => git.clone(repoUrl))

// 当前分支
ipcMain.handle('git-current-branch', async (event, repoName: string) => {
  const repoPath = path.join(userDataWarehousePath, repoName)
  const repoGit = simpleGit(repoPath)
  return repoGit.branch()
})

// 所有分支
ipcMain.handle('git-branch', async (event, repoName: string) => {
  const repoPath = path.join(userDataWarehousePath, repoName)
  const repoGit = simpleGit(repoPath)
  return repoGit.branch(['-r'])
})

// 切换分支
ipcMain.handle('git-checkout', async (event, repoName: string, branch: string) => {
  const repoPath = path.join(userDataWarehousePath, repoName)
  const repoGit = simpleGit(repoPath)
  return repoGit.checkout(branch)
})

// 所有tags
ipcMain.handle('git-tags', async (event, repoName: string) => {
  const repoPath = path.join(userDataWarehousePath, repoName)
  const repoGit = simpleGit(repoPath)
  return repoGit.tags()
})

// 当前分支下的所有提交
ipcMain.handle('git-log', async (event, repoName: string, branch: string) => {
  const repoPath = path.join(userDataWarehousePath, repoName)
  console.log(repoPath)
  const repoGit = simpleGit(repoPath)
  if (branch === 'origin/main') {
    return repoGit.log({ maxCount: 99 })
  }
  return repoGit.log({ from: branch, maxCount: 99 })
})

// 删除仓库
ipcMain.handle('git-delete', async (event, repoName: string) => {
  const repoPath = path.join(userDataWarehousePath, repoName)
  fs.rmdirSync(repoPath, { recursive: true })
})

// 指定 hash 的 README.md
ipcMain.handle('git-show', async (event, repoName: string, hash: string) => {
  const repoPath = path.join(userDataWarehousePath, repoName)
  const repoGit = simpleGit(repoPath)
  return repoGit.show([`${hash}:README.md`])
})

// 指定 tags 的
ipcMain.handle('git-show-tags', async (event, repoName: string, tag: string) => {
  const repoPath = path.join(userDataWarehousePath, repoName)
  const repoGit = simpleGit(repoPath)
  return repoGit.show([`${tag}:README.md`])
})
