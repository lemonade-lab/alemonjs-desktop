import { ReloadOutlined } from '@ant-design/icons'
import logoURL from '@src/assets/logo.jpg'
import { RootState } from '@src/store'
import { Button } from '@src/ui/Button'
import { Pause, Play } from '@src/ui/Icons'
import { useSelector } from 'react-redux'
const MainView = () => {
  const modules = useSelector((state: RootState) => state.modules)
  const expansions = useSelector((state: RootState) => state.expansions)
  const onInstall = () => {
    // 加载依赖
    window.yarn.cmds({
      type: 'install',
      value: ['install', '--ignore-warnings']
    })
  }
  const onOpen = () => {
    window.app.selectDirectory().then(dir => {
      const path = dir[0]
      if (typeof path === 'string') {
        window.app.reStart(path)
      }
    })
  }
  const onRun = () => {
    window.expansions.run([])
  }
  return (
    <div className="flex-1 flex-col flex justify-center items-center">
      <div className="flex-col flex">
        {
          // 如果没有加载依赖，显示加载依赖按钮
          // 最好能在这里提示用户 如何操作桌面
        }
        <img src={logoURL} alt="logo" className="w-96" />
        {
          // absolute 水平, 垂直，居中
        }
        <div className="absolute right-1/2 top-1/2 transform translate-x-1/2 -translate-y-1/2">
          {!modules.nodeModulesStatus && (
            <div className="flex flex-col gap-4">
              <Button className="px-4 py-2 text-2xl rounded-md" onClick={onInstall}>
                <ReloadOutlined /> 加载依赖
              </Button>
              <Button className="px-4 py-2 text-2xl rounded-md" onClick={onOpen}>
                以指定目录打开
              </Button>
            </div>
          )}
          {modules.nodeModulesStatus && !expansions.runStatus && (
            <div className="flex flex-col gap-4">
              <Button
                className="flex gap-2 items-center px-4 py-2 text-2xl rounded-md"
                onClick={onRun}
              >
                <Play width={22} height={22} />
                运行扩展器
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
export default MainView
