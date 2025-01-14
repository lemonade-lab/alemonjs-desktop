import axios from 'axios'

export const fetchPackageInfo = async (packageName: string) => {
  const response = await axios
    .get(`https://registry.npmjs.org/${packageName}`, {
      headers: {
        // 'Cache-Control': 'max-age=3600'
        // 'If-None-Match': ''
      }
    })
    .then(res => res.data)
  console.log(response)
  return {
    name: response.name,
    description: response.description,
    license: response.license,
    time: response.time,
    readme: response.readme || ''
  }
}
