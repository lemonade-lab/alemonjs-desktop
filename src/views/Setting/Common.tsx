import { useNotification } from '@src/context/Notification'
import { usePop } from '@src/context/Pop'
import { RootState } from '@src/store'
import { Button } from '@src/component/Button'
import { Modal } from '@src/component/Modal'
import { PrimaryDiv } from '@src/component/PrimaryDiv'
import { SecondaryDiv } from '@src/component/SecondaryDiv'
import { Switch } from '@src/component/Switch'
import { Tooltip } from '@src/component/Tooltip'
import _ from 'lodash'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const Common = () => {
  const app = useSelector((state: RootState) => state.app)
  const [desktopCheckeds, setDesktopChecked] = useState({
    autoLaunch: false,
    autoCheck: false,
    autoStart: false
  })
  const { notification } = useNotification()

  // 初始化更新
  const initUpdate = async () => {
    const T = await window.controller.autoLaunchStutas()
    if (T) {
      setDesktopChecked({
        ...desktopCheckeds,
        autoStart: T
      })
    }
  }

  const update = _.throttle(async checked => {
    const T = await window.controller.setAutoLaunch(checked)
    if (T) {
      setDesktopChecked({
        ...desktopCheckeds,
        autoStart: checked
      })
    }
  }, 500)

  /**
   *
   * @param status
   */
  const onChangeDesktop = (status: boolean) => {
    update(status)
  }

  const { setPopValue } = usePop()

  const openModal = () => {
    setPopValue({
      open: true,
      title: '重置扩展与机器人',
      description: '危险！该操作将以当前版本初始内容对所有扩展和机器人进行重置!',
      buttonText: '重置并重启',
      data: {},
      code: 0,
      onConfirm: () => {
        console.log('重置')
        window.app.reIniteTemplate()
      }
    })
  }

  useEffect(() => {
    initUpdate()
  }, [])

  return (
    <div className="animate__animated animate__fadeIn flex-1 flex-col flex">
      <div className="flex-col gap-2 flex-1 flex p-6 ">
        <PrimaryDiv className="flex flex-col flex-1  p-6 rounded-lg shadow-inner  max-w-full">
          <div className="text-2xl font-semibold mb-4 border-b border-secondary-border dark:border-dark-secondary-border">
            通用
          </div>
          <div className="flex flex-col gap-4">
            {[
              {
                title: '开机自启',
                children: <Switch value={desktopCheckeds.autoStart} onChange={onChangeDesktop} />
              },
              {
                title: '依赖自检',
                children: <Switch value={desktopCheckeds.autoCheck} onChange={onChangeDesktop} />
              },
              {
                title: '扩展自启',
                children: <Switch value={desktopCheckeds.autoLaunch} onChange={onChangeDesktop} />
              },
              {
                title: '依赖锁文件',
                description: 'yarn.lock',
                children: (
                  <Button
                    className="px-2 rounded-md border"
                    onClick={async () => {
                      const dir = `${app.userDataTemplatePath}/yarn.lock`
                      const T = await window.app.exists(dir)
                      if (!T) {
                        notification('yarn.lock不存在')
                        return
                      }
                      window.app.downloadFiles(dir)
                    }}
                  >
                    下载
                  </Button>
                )
              },
              {
                title: '进程记录文件',
                description: 'main.log',
                children: (
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
                )
              },
              {
                title: '重置扩展与机器人',
                description: '以当前版本为准',
                children: (
                  <Button
                    className="px-2 rounded-md border"
                    onClick={() => {
                      openModal()
                    }}
                  >
                    重置
                  </Button>
                )
              },
              {
                title: '以指定目录打开应用',
                description: '目录不存在pkg时，将新建机器人',
                children: (
                  <Button
                    className="px-2 rounded-md border"
                    onClick={() => {
                      window.app.selectDirectory().then(dir => {
                        const path = dir[0]
                        if (typeof path === 'string') {
                          window.app.reStart(path)
                        }
                      })
                    }}
                  >
                    选择
                  </Button>
                )
              }
            ].map((item, index) => (
              <div key={index} className="flex gap-2 justify-between">
                <div className="flex flex-row gap-2 items-center">
                  <div>{item.title}</div>
                  {item.description && (
                    <div className="text-sm text-secondary-text">{item.description}</div>
                  )}
                </div>
                {item.children}
              </div>
            ))}
            <SecondaryDiv className="flex flex-col gap-2  shadow-inner rounded-md p-2">
              <div className="">快捷键</div>
              {[
                {
                  title: '放大窗口',
                  children: (
                    <div className="flex gap-1">
                      <div className="border px-2 rounded-md">ctrl/command</div>
                      <div className="border px-2 rounded-md">++</div>
                    </div>
                  )
                },
                {
                  title: '缩小窗口',
                  children: (
                    <div className="flex gap-1">
                      <div className="border px-2 rounded-md">ctrl/command</div>
                      <div className="border px-2 rounded-md">--</div>
                    </div>
                  )
                },
                {
                  title: '开发者工具',
                  children: (
                    <div className="flex gap-1">
                      <div className="border px-2 rounded-md">F12</div>
                    </div>
                  )
                }
              ].map((item, index) => {
                return (
                  <div key={index} className="flex gap-2 justify-between">
                    <div className="flex flex-row gap-2 items-center">
                      <div>{item.title}</div>
                    </div>
                    {item.children}
                  </div>
                )
              })}
            </SecondaryDiv>
          </div>
        </PrimaryDiv>
      </div>
    </div>
  )
}
export default Common
