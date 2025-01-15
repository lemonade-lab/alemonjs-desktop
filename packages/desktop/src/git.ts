import simpleGit from 'simple-git'
import { processSend } from './send'
/**
 * @param {*} repoUrl
 */
export async function cloneRepo(repoUrl) {
  // 得到仓库名
  const repoName = repoUrl.split('/').pop().replace('.git', '')
  const git = simpleGit()
  const localPath = './packages/' + repoName
  try {
    await git.clone(repoUrl, localPath, ['--depth', '1'])
    processSend({
      type: 'notification',
      data: `克隆仓库成功: ${repoName}`
    })
  } catch (err) {
    processSend({
      type: 'git-clone',
      data: 0
    })
    processSend({
      type: 'notification',
      data: err.message
    })
    console.error('克隆仓库时出错:', err.message)
  }
}
