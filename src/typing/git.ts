import type { SimpleGit } from 'simple-git'
export type WindowGit = {
  /**
   * 获取仓库
   * @returns
   */
  repos: () => Promise<string[]>
  /**
   * 打开仓库
   * @param repoName
   * @returns
   */
  openRepo: (repoName: string) => Promise<SimpleGit>
  /**
   * clone
   * @param repoUrl
   * @returns
   */
  clone: (repoUrl: string) => Promise<void>
  /**
   * 当前分支
   * @param repoName
   * @returns
   */
  currentBranch: (repoName: string) => Promise<any>
  /**
   * 所有分支
   * @param repoName
   * @returns
   */
  branch: (repoName: string) => Promise<any>
  /**
   * 切换分支
   * @param repoName
   * @param branch
   * @returns
   */
  checkout: (repoName: string, branch: string) => Promise<void>
  /**
   *
   * @param repoName
   * @returns
   */
  tags: (repoName: string) => Promise<any>
  /**
   *
   * @param repoName
   * @param branch
   * @returns
   */
  log: (repoName: string, branch: string) => Promise<any>
  /**
   *
   * @param repoName
   * @returns
   */
  delete: (repoName: string) => Promise<void>
  /**
   *
   * @param repoName
   * @param hash
   * @returns
   */
  show: (repoName: string, hash: string) => Promise<any>
}
