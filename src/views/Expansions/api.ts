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
