import simpleGit from 'simple-git'
import { processSend } from './send'
/**
 * @param {*} repoUrl
 */
export async function cloneRepo(repoUrl: string) {
  const url = repoUrl.split('/').pop()
  if (!url) return
  // 得到仓库名
  const repoName = url.replace('.git', '')
  const git = simpleGit()
  const localPath = './packages/' + repoName
  try {
    await git.clone(repoUrl, localPath, ['--depth', '1'])
    processSend({
      type: 'notification',
      data: `克隆仓库成功: ${repoName}`
    })
  } catch (err) {
    if (!err) return
    processSend({
      type: 'git-clone',
      data: 0
    })
    if (!err['message']) return
    processSend({
      type: 'notification',
      data: err['message']
    })
    console.error('克隆仓库时出错:', err['message'])
  }
}
