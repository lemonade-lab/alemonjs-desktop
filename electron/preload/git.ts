import { contextBridge, ipcRenderer } from 'electron'

// 扩展
contextBridge.exposeInMainWorld('git', {
  // 获取工作区
  getWordSbaces: () => ipcRenderer.invoke('get-workspaces'),
  // 设置工作区
  setWordSbaces: (select: string) => ipcRenderer.invoke('set-workspaces', select),
  // 获取仓库
  repos: () => ipcRenderer.invoke('git-repos'),
  // 打开仓库
  openRepo: (repoName: string) => ipcRenderer.invoke('git-open-repo', repoName),
  // clone
  clone: (repoUrl: string) => ipcRenderer.invoke('git-clone', repoUrl),
  // fetch
  fetch: (repoName: string) => ipcRenderer.invoke('git-fetch', repoName),
  pull: (repoName: string, remote: string, branch: string) =>
    ipcRenderer.invoke('git-pull', repoName, remote, branch),
  // 当前分支
  currentBranch: (repoName: string) => ipcRenderer.invoke('git-current-branch', repoName),
  // 所有分支
  branch: (repoName: string) => ipcRenderer.invoke('git-branch', repoName),
  // 切换分支
  checkout: (repoName: string, branch: string) =>
    ipcRenderer.invoke('git-checkout', repoName, branch),
  // 所有tags
  tags: (repoName: string) => ipcRenderer.invoke('git-tags', repoName),
  // 当前分支下的所有提交
  log: (repoName: string, branch: string) => ipcRenderer.invoke('git-log', repoName, branch),
  // delete
  delete: (repoName: string) => ipcRenderer.invoke('git-delete', repoName),
  // 指定 hash 的提交
  show: (repoName: string, hash: string) => ipcRenderer.invoke('git-show', repoName, hash),
  // 代码差异
  diff: (repoName: string, hash: string) => ipcRenderer.invoke('git-show-diff', repoName, hash)
})
