import { Button } from '@alemonjs/react-ui'
import { PrimaryDiv } from '@alemonjs/react-ui'
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
      <div className="flex-col gap-2 flex justify-center py-6 items-center">
        <PrimaryDiv className="flex flex-col items-center  justify-center flex-1  p-6 rounded-lg ">
          <h2 className="text-2xl lg:text-4xl  xl:text-6xl font-semibold mb-4">AlemonJS</h2>
          {versions ? (
            <ul className="list-disc pl-5 text-md lg:text-xl  xl:text-2xl">
              <li>Chrome 版本: {versions.chrome}</li>
              <li>Node 版本: {versions.node}</li>
              <li>Electron 版本: {versions.electron}</li>
              {/* <li>平台: {versions.platform}</li> */}
            </ul>
          ) : (
            <div className="text-2xl lg:text-4xl  xl:text-6xl">加载版本信息中...</div>
          )}
          <Button
            onClick={onClickUpdate}
            className="mt-4 px-6 py-1 rounded-lg  duration-700 transition-all text-md lg:text-xl  xl:text-2xl  "
          >
            <div>检查更新</div>
          </Button>
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
        </PrimaryDiv>
      </div>
    </div>
  )
}
export default About
