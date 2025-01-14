import axios from 'axios'

export const fetchPackageInfo = async (packageName: string) => {
  const response = await axios.get(`https://registry.npmjs.org/${packageName}`, {
    headers: {
      // 'Cache-Control': 'max-age=3600'
      // 'If-None-Match': ''
    }
  })
  const data = response.data
  return {
    'name': data.name,
    'description': data.description,
    'license': data.license,
    'dist-tags': data['dist-tags'],
    'downloads': 'N/A', // 可替换为具体下载统计接口
    'time': data.time,
    'readme': data.readme || ''
  }
}
