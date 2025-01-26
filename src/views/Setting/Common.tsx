import { RootState } from '@src/store'
import { Button } from '@src/ui/Button'
import { Modal } from '@src/ui/Modal'
import { PrimaryDiv } from '@src/ui/PrimaryDiv'
import { SecondaryDiv } from '@src/ui/SecondaryDiv'
import { Switch } from '@src/ui/Switch'
import _ from 'lodash'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
const Common = () => {
  const app = useSelector((state: RootState) => state.app)
  const [desktopChecked, setDesktopChecked] = useState(false)

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
  }

  /**
   *
   * @param status
   */
  const onChangeDesktop = (status: boolean) => {
    update(status)
  }

  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  useEffect(() => {
    initUpdate()
  }, [])

  return (
    <div className="animate__animated animate__fadeIn flex-1 flex-col flex">
      <div className="flex-col gap-2 flex-1 flex p-6 ">
        <PrimaryDiv className="flex flex-col flex-1  p-6 rounded-lg shadow-inner  max-w-full">
          <div
            className="text-2xl font-semibold mb-4 border-b 
            border-secondary-border
           dark:border-dark-secondary-border
          "
          >
            通用
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex gap-2 justify-between">
              <div className="">开机自启</div>
              <Switch value={desktopChecked} onChange={onChangeDesktop} />
            </div>
            {/* <div className="flex gap-2 justify-between">
              <div className="">机器人自启</div>
              <ToggleSwitch value={botChecked} onChange={onChangeBot} />
            </div> */}
            <div className="flex gap-2 justify-between">
              <div className="flex flex-row gap-2 items-center">
                <div>依赖锁文件</div>
                <div className="text-sm text-secondary-text">yarn.lock</div>
              </div>
              <Button
                className="px-2 rounded-md border"
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
                <div className="text-sm text-secondary-text">main.log</div>
              </div>
              <Button
                className="px-2 rounded-md border"
                onClick={() => {
                  const dir = app.logMainPath
                  console.log('dir', app)
                  window.app.downloadFiles(dir)
                }}
              >
                下载
              </Button>
            </div>
            <div className="flex gap-2 justify-between">
              <div className="flex flex-row gap-2 items-center">
                <div>重置扩展与机器人</div>
                <div className="text-sm text-secondary-text">以当前版本为准</div>
              </div>
              <Button
                className="px-2 rounded-md border"
                onClick={() => {
                  openModal()
                }}
              >
                重置
              </Button>
            </div>
            <SecondaryDiv className="flex flex-col gap-2  shadow-inner rounded-md p-2">
              <div className="">快捷键</div>
              <div className="flex gap-2 justify-between">
                <div className="flex flex-row gap-2 items-center">
                  <div>放大窗口</div>
                </div>
                <div>
                  <div>
                    ctrl/command <span className="text-secondary-text">+</span> ++
                  </div>
                </div>
              </div>
              <div className="flex gap-2 justify-between">
                <div className="flex flex-row gap-2 items-center">
                  <div>缩小窗口</div>
                </div>
                <div>
                  <div>
                    ctrl/command <span className="text-secondary-text">+</span> --
                  </div>
                </div>
              </div>
              <div className="flex gap-2 justify-between">
                <div className="flex flex-row gap-2 items-center">
                  <div>开发者工具</div>
                </div>
                <div>
                  <div>F12</div>
                </div>
              </div>
            </SecondaryDiv>
          </div>
        </PrimaryDiv>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="text-xl mb-4">重置扩展与机器人</h2>
        <p>危险！该操作将以当前版本初始内容对所有扩展和机器人进行重置!</p>
        <div className="flex justify-end">
          <Button
            onClick={() => {
              window.app.reIniteTemplate()
              closeModal()
            }}
            className="mt-4 px-4 py-2   rounded "
          >
            重置并重启
          </Button>
        </div>
      </Modal>
    </div>
  )
}
export default Common
