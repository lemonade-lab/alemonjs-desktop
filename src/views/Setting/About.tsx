import { useEffect, useState } from 'react'
import logoURL from '@src/assets/logo.jpg'
const About = () => {
  const [versions, setVersions] = useState<{
    chrome: string
    node: string
    electron: string
    platform: string
  } | null>(null)

  useEffect(() => {
    // 确保 window.versions 存在
    if (window.versions) {
      setVersions(window.versions)
    }
  }, [])

  return (
    <div className="select-none flex-1 flex-col flex justify-center items-center">
      <div className="flex-col flex  relative">
        <img src={logoURL} alt="logo" className="w-96" />
        <div className="absolute bottom-0">
          {versions ? (
            <ul className="list-disc pl-5">
              <li>Chrome 版本: {versions.chrome}</li>
              <li>Node 版本: {versions.node}</li>
              <li>Electron 版本: {versions.electron}</li>
              <li>平台: {versions.platform}</li>
            </ul>
          ) : (
            <p>加载版本信息...</p>
          )}
        </div>
      </div>
    </div>
  )
}
export default About
