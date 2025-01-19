import { RootState } from '@src/store'
import ToggleSwitch from '@src/ui/Switch'
import _ from 'lodash'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
const Common = () => {
  const app = useSelector((state: RootState) => state.app)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    const update = async () => {
      const T = await window.controller.autoLaunchStutas()
      if (T) setChecked(true)
    }
    update()
  }, [])

  const update = _.throttle(async checked => {
    const T = await window.controller.setAutoLaunch(checked)
    if (T) {
      setChecked(checked)
    }
  }, 500)

  const onChange = (status: boolean) => {
    update(status)
  }

  return (
    <div className="animate__animated animate__fadeIn flex-1 flex-col flex justify-center items-center">
      <div className="flex-col gap-2 flex-1 flex justify-center py-6">
        <div className="flex flex-col items-center  justify-center flex-1  p-6 rounded-lg shadow-inner bg-[var(--alemonjs-primary-bg)] w-96 max-w-full">
          <h2 className="text-2xl font-semibold mb-4">AlemonJS</h2>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <div className="p-2">开机自启</div>
              <ToggleSwitch value={checked} onChange={onChange} />
            </div>
            <div className="border  rounded-md">
              <div className="p-2">快捷键</div>
              <div className=" ">
                <div className="flex gap-2 border p-2">
                  <div>Ctrol/Command ++</div>
                  <div>放大窗口</div>
                </div>
                <div className="flex gap-2 border p-2">
                  <div>Ctrol/Command --</div>
                  <div>缩小窗口</div>
                </div>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <div className="p-2">lock.yml</div>
              <div
                className=" cursor-pointer"
                onClick={() => {
                  const dir = `${app.templatePath}/yarn.lock`
                  window.app.downloadFiles(dir)
                }}
              >
                下载依赖锁
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <div className="p-2">main.log</div>
              <div
                onClick={() => {
                  //
                }}
              >
                下载记录文件
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Common
