import axios from 'axios'

// 判断一个 URL 是否是 Git 仓库 格式
export function isGitRepositoryFormat(url: string) {
  if (!/^(https:\/\/|git@).*\.git$/.test(url)) {
    console.error('Invalid repository URL')
    return false
  }
  return true
}

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
  let __icon = null
  if (pkg?.alemonjs?.desktop?.logo) {
    if (pkg.alemonjs.desktop.logo.startsWith('antd.')) {
      __icon = pkg.alemonjs.desktop.logo
    } else {
      __logo_url = createNPMJSURL({
        name: packageName,
        version: version,
        path: pkg.alemonjs.desktop.logo
      })
    }
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
    '__icon': __icon,
    versions
  }
  console.log('response', response)
  return data
}

export const extractRepoInfo = (url: string) => {
  // 匹配 HTTPS 或 HTTP 格式的 URL
  const httpsRegex = /(?:https?:\/\/)?(?:www\.)?([^\/]+)\/([^\/]+)\/([^\/]+)(?:\.git)?$/
  // 匹配 SSH 格式的 URL
  const sshRegex = /(?:git@)?([^:]+):([^\/]+)\/([^\/]+)(?:\.git)?$/
  let match = url.match(httpsRegex) || url.match(sshRegex)
  if (match) {
    return {
      platform: match[1], // 平台域名（如 github.com、gitlab.com 或自定义域名）
      username: match[2], // 用户名或组织名
      repository: match[3].replace(/\.git$/, '') // 仓库名，去掉 .git 后缀
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
