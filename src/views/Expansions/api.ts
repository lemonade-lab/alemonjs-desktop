import axios from 'axios'

//
export const createNPMJSURL = ({
  name,
  version,
  path
}: {
  name: string
  version: string
  path: string
}) => {
  // 可能是  ./xx  /xx
  const pathName = path.replace(/^\./, '').replace(/^\//, '')
  return `https://unpkg.com/${name}@${version}/${pathName}`
}

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
  const version = response['dist-tags'].latest
  const pkgURL = createNPMJSURL({
    name: packageName,
    version: version,
    path: 'package.json'
  })
  const pkg = await axios.get(pkgURL).then(res => res.data)
  let __logo_url = null
  if (pkg?.alemonjs?.desktop?.logo) {
    __logo_url = createNPMJSURL({
      name: packageName,
      version: version,
      path: pkg.alemonjs.desktop.logo
    })
  }
  const versions = Object.keys(response.versions)
  const data = {
    'name': response.name,
    'description': response.description,
    'author': response.author,
    'dist-tags': response['dist-tags'],
    'version': response['dist-tags'].latest,
    'readme': response.readme || '',
    '__logo_url': __logo_url,
    versions
  }
  console.log('response', response)
  return data
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
