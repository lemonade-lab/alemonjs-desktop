import { useNotification } from '@/context/Notification'
import { usePop } from '@/context/Pop'
import { RootState } from '@/store'
import { Button } from '@alemonjs/react-ui'
import { PrimaryDiv } from '@alemonjs/react-ui'
import { SecondaryDiv } from '@alemonjs/react-ui'
import { Switch } from '@alemonjs/react-ui'
import _ from 'lodash'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import GuideCommon from '../Guide/Common'

const Common = () => {
  const app = useSelector((state: RootState) => state.app)
  const [desktopCheckeds, setDesktopChecked] = useState({
    autoLaunch: false,
    autoCheck: false,
    autoStart: false
  })
  const notification = useNotification()

  // 初始化更新
  const initUpdate = async () => {
    window.app.getConfig(['AUTO_LAUNCH', 'AUTO_INSTALL', 'AUTO_RUN_EXTENSION']).then(T => {
      setDesktopChecked({
        autoLaunch: T[0],
        autoCheck: T[1],
        autoStart: T[2]
      })
    })
  }

  const update = _.throttle(async (key: string, checked: boolean) => {
    const T = (await window.app.setConfig(key, checked)) as boolean
    if (T) {
      const map: {
        [key: string]: string
      } = {
        AUTO_LAUNCH: 'autoLaunch',
        AUTO_INSTALL: 'autoCheck',
        AUTO_RUN_EXTENSION: 'autoStart'
      }
      const name = map[key]
      setDesktopChecked({
        ...desktopCheckeds,
        [name]: checked
      })
    }
  }, 500)

  /**
   *
   * @param status
   */
  const onChangeDesktop = (key: string, status: boolean) => {
    update(key, status)
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
        window.app.resetTemplate()
      }
    })
  }

  useEffect(() => {
    initUpdate()
  }, [])

  // 按键
  const getKeys = () => {
    return window.versions.platform == 'darwin' ? 'command' : 'ctrl'
  }

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
                children: (
                  <Switch
                    value={desktopCheckeds.autoLaunch}
                    onChange={checked => onChangeDesktop('AUTO_LAUNCH', checked)}
                  />
                )
              },
              {
                title: '依赖自检',
                children: (
                  <Switch
                    value={desktopCheckeds.autoCheck}
                    onChange={checked => onChangeDesktop('AUTO_INSTALL', checked)}
                  />
                )
              },
              {
                title: '扩展自启',
                description: '带依赖自检',
                children: (
                  <div className="steps-common-1">
                    <Switch
                      value={desktopCheckeds.autoStart}
                      onChange={checked => onChangeDesktop('AUTO_RUN_EXTENSION', checked)}
                    />
                  </div>
                )
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
                  <>
                    {/* <Button
                      className="px-2 rounded-md border"
                      onClick={() => {
                        // window.app.selectDirectory().then(dir => {
                        //   const path = dir[0]
                        //   if (typeof path === 'string') {
                        //     window.app.reStart(path)
                        //   }
                        // })
                      }}
                    >
                      恢复默认
                    </Button> */}
                    <Button
                      className="px-2 rounded-md border  steps-common-2"
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
                  </>
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
                <div className="flex gap-2">{item.children}</div>
              </div>
            ))}
            <SecondaryDiv className="flex flex-col gap-2  shadow-inner rounded-md p-2">
              <div className="">快捷键</div>
              {[
                {
                  title: '放大窗口',
                  children: (
                    <div className="flex gap-1">
                      <div className="border px-2 rounded-md">{getKeys()}</div>
                      <div className="border px-2 rounded-md">++</div>
                    </div>
                  )
                },
                {
                  title: '缩小窗口',
                  children: (
                    <div className="flex gap-1">
                      <div className="border px-2 rounded-md">{getKeys()}</div>
                      <div className="border px-2 rounded-md">--</div>
                    </div>
                  )
                },
                {
                  title: '开发者工具',
                  children: (
                    <div className="flex gap-1">
                      <div className="border px-2 rounded-md">{getKeys()}</div>
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
          <GuideCommon />
        </PrimaryDiv>
      </div>
    </div>
  )
}
export default Common
