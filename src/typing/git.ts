import type { SimpleGit } from 'simple-git'
export type WindowGit = {
  /**
   *
   * @returns
   */
  getWordSbaces: () => Promise<string>
  /**
   *
   * @param select
   * @returns
   */
  setWordSbaces: (select: string) => Promise<void>
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
   *
   * @param repoName
   * @param branch
   * @returns
   */
  fetch: (repoName: string) => Promise<any>
  /**
   * 拉取
   * @param repoName
   * @param remote
   * @param branch
   * @returns
   */
  pull: (repoName: string, remote: string, branch: string) => Promise<any>
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
  /**
   *
   * @param repoName
   * @param hash
   * @returns
   */
  diff: (repoName: string, hash: string) => Promise<any>
}
