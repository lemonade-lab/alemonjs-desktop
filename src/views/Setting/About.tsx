import _ from 'lodash'
import { useEffect, useState } from 'react'
const About = () => {
  const [versions, setVersions] = useState<{
    chrome: string
    node: string
    electron: string
    platform: string
  } | null>(null)

  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // 确保 window.versions 存在
    if (window.versions) {
      setVersions(window.versions)
    }
    window.controller.onDownloadProgress((value: number) => {
      setProgress(value)
    })
  }, [])

  const onClickUpdate = _.throttle(() => {
    window.controller.updateVersion()
  }, 500)

  return (
    <div className="animate__animated animate__fadeIn flex-1 flex-col flex justify-center items-center">
      <div className="flex-col gap-2 flex-1 flex justify-center py-6">
        <div className="flex flex-col items-center  justify-center flex-1  p-6 rounded-lg shadow-inner bg-[var(--alemonjs-primary-bg)] w-96 max-w-full">
          <h2 className="text-2xl font-semibold mb-4">AlemonJS</h2>
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
          <button
            onClick={onClickUpdate}
            className="mt-4 px-6   py-2 bg-blue-500 rounded-lg text-white duration-700 transition-all  hover:bg-blue-700 "
          >
            <div>检查更新</div>
          </button>
          <div className="h-10 w-full">
            {progress > 0 && (
              <div className="relative mt-2 h-2 bg-gray-300 rounded">
                <div
                  className="absolute h-full bg-white rounded"
                  style={{ width: `${progress > 100 ? 100 : progress}%` }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
export default About
