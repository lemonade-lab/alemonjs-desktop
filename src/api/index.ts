import axios from 'axios'

const KEY = 'alemonjs'

// https://registry.npmmirror.com
// https://registry.npmjs.org
const BASE_URL = 'https://registry.npmmirror.com'
const BASE_URL2 = 'https://registry.npmjs.org'

// `https://cdn.npmmirror.com/packages/${name}/${version}/${pathName}`
//`https://unpkg.com/${name}@${version}/${pathName}`
const FILE_URL = 'https://cdn.npmmirror.com/packages'

const HUB_URL = 'https://api.github.com/repos'

// 判断一个 URL 是否是 Git 仓库 格式
export function isGitRepositoryFormat(url: string) {
  if (!/^(https:\/\/|git@).*\.git$/.test(url)) {
    console.error('Invalid repository URL')
    return false
  }
  return true
}

// 创建 npmjs的链接
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
  return `${FILE_URL}/${name}/${version}/${pathName}`
}

/**
 * 获取包信息
 * @param packageName
 * @returns
 */
export const fetchPackageInfo = async (packageName: string) => {
  const response = await axios.get(`${BASE_URL}/${packageName}`).then(res => res.data)
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

// 获取包的版本信息
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

// 获取仓库的分支信息
export const fetchGitHubBranches = async (username: string, repository: string) => {
  try {
    const response = await axios.get(`${HUB_URL}/${username}/${repository}/branches`, {
      headers: {
        Accept: 'application/vnd.github.v3+json'
      }
    })
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

// 获取仓库的标签信息
export const getPackages = async () => {
  return await axios
    .get(`${BASE_URL2}/-/v1/search`, {
      params: {
        text: KEY
        // size: 50
      }
    })
    .then(res => res.data)
}
