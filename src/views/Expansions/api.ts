import axios from 'axios'

/**
 *
 * @param packageName
 * @returns
 */
export const fetchPackageInfo = async (packageName: string) => {
  const response = await axios
    .get(`https://registry.npmjs.org/${packageName}`, {
      headers: {
        // 'Cache-Control': 'max-age=3600'
        // 'If-None-Match': ''
      }
    })
    .then(res => res.data)
  return {
    'name': response.name,
    'description': response.description,
    'license': response.license,
    'dist-tags': response['dist-tags'],
    'time': response.time,
    'readme': response.readme || ''
  }
}

export const extractRepoInfo = (url: string) => {
  // 正则表达式匹配各种格式的 URL
  const regex = /(?:https?:\/\/)?(?:www\.)?(github\.com|gitlab\.com)\/([^\/]+)\/([^\/]+)(?:\.git)?$/
  const match = url.match(regex)
  if (match) {
    return {
      username: match[2],
      repository: match[3].replace(/\.git$/, '')
    }
  }
  // 如果没有匹配上，上面的方法可能不适用，尝试 SSH 格式
  const sshRegex = /(?:git@(?:www\.)?)?(github\.com|gitlab\.com):([^\/]+)\/([^\/]+)(?:\.git)?$/
  const sshMatch = url.match(sshRegex)
  if (sshMatch) {
    return {
      username: sshMatch[2],
      repository: sshMatch[3].replace(/\.git$/, '')
    }
  }
  throw new Error('Invalid repository URL')
}

export const fetchGitHubBranches = async (username: string, repository: string) => {
  try {
    const response = await axios.get(
      `https://api.github.com/repos/${username}/${repository}/branches`,
      {
        headers: {
          Accept: 'application/vnd.github.v3+json'
        }
      }
    )
    return response.data as {
      name: string
      commit: {
        sha: string
        url: string
      }
      protected: boolean
    }[]
  } catch (error) {
    console.error('Error fetching branches:', error)
  }
}

export const getPackages = async () => {
  return await axios
    .get('https://registry.npmjs.org/-/v1/search', {
      params: {
        text: 'alemonjs',
        size: 50 // 设置要返回的包数量
      }
    })
    .then(res => res.data)
}
