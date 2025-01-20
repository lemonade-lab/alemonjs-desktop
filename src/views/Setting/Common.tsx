import { RootState } from '@src/store'
import Button from '@src/ui/Button'
import ToggleSwitch from '@src/ui/Switch'
import _ from 'lodash'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
const Common = () => {
  const app = useSelector((state: RootState) => state.app)
  const [desktopChecked, setDesktopChecked] = useState(false)
  const [botChecked, setBotChecked] = useState(false)

  const update = _.throttle(async checked => {
    const T = await window.controller.setAutoLaunch(checked)
    if (T) setDesktopChecked(checked)
  }, 500)

  /**
   *
   */
  const initUpdate = async () => {
    const T = await window.controller.autoLaunchStutas()
    if (T) setDesktopChecked(true)
    // window.bot.automatically().then(res => {
    //   setBotChecked(res)
    // })
  }

  /**
   *
   * @param status
   */
  const onChangeDesktop = (status: boolean) => {
    update(status)
  }

  /**
   *
   * @param status
   */
  const onChangeBot = (status: boolean) => {
    // window.bot.setAutomatically(status)
  }

  useEffect(() => {
    initUpdate()
  }, [])

  return (
    <div className="animate__animated animate__fadeIn flex-1 flex-col flex">
      <div className="flex-col gap-2 flex-1 flex p-6 ">
        <div className="flex flex-col flex-1  p-6 rounded-lg shadow-inner bg-[var(--alemonjs-primary-bg)]  max-w-full">
          <div className="text-2xl font-semibold mb-4 border-b">通用</div>
          <div className="flex flex-col gap-4">
            <div className="flex gap-2 justify-between">
              <div className="">开机自启</div>
              <ToggleSwitch value={desktopChecked} onChange={onChangeDesktop} />
            </div>
            {/* <div className="flex gap-2 justify-between">
              <div className="">机器人自启</div>
              <ToggleSwitch value={botChecked} onChange={onChangeBot} />
            </div> */}
            <div className="flex gap-2 justify-between">
              <div className="flex flex-row gap-2 items-center">
                <div>依赖锁文件</div>
                <div className="text-sm text-[var(--alemonjs-secondary-text)]">yarn.lock</div>
              </div>
              <Button
                onClick={() => {
                  const dir = `${app.userDataTemplatePath}/yarn.lock`
                  window.app.downloadFiles(dir)
                }}
              >
                下载
              </Button>
            </div>
            <div className="flex gap-2 justify-between">
              <div className="flex flex-row gap-2 items-center">
                <div>进程记录文件</div>
                <div className="text-sm text-[var(--alemonjs-secondary-text)]">main.log</div>
              </div>
              <Button
                onClick={() => {
                  const dir = app.logMainPath
                  console.log('dir', app)
                  window.app.downloadFiles(dir)
                }}
              >
                下载
              </Button>
            </div>
            <div className="flex flex-col gap-2 border rounded-md p-1">
              <div className="">快捷键</div>
              <div className="flex gap-2 justify-between">
                <div className="flex flex-row gap-2 items-center">
                  <div>放大窗口</div>
                </div>
                <div>
                  <div>ctrl/command ++</div>
                </div>
              </div>
              <div className="flex gap-2 justify-between">
                <div className="flex flex-row gap-2 items-center">
                  <div>缩小窗口</div>
                </div>
                <div>
                  <div>ctrl/command --</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Common
