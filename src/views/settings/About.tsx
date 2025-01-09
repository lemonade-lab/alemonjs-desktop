import React, { useEffect, useState } from 'react'

const About: React.FC = () => {
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
    <div className="p-4 flex-1 ">
      <h2 className="text-lg font-bold mb-2">关于应用</h2>
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
  )
}

export default About
