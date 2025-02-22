import { ReloadOutlined } from '@ant-design/icons'
import logoURL from '@src/assets/logo.jpg'
import { RootState } from '@src/store'
import { Button } from '@src/component/Button'
import { useSelector } from 'react-redux'
const MainView = () => {
  const modules = useSelector((state: RootState) => state.modules)
  const onInstall = () => {
    window.yarn.cmds({
      type: 'install',
      value: ['install', '--ignore-warnings']
    })
  }
  return (
    <div className="flex-1 flex-col flex justify-center items-center">
      <div className="flex-col flex ">
        <img src={logoURL} alt="logo" className="w-96" />
        {!modules.nodeModulesStatus && (
          <div className="absolute  right-1/2 top-1/2 transform translate-x-1/2 -translate-y-1/2">
            <div className="steps-1 flex flex-col gap-4">
              <Button className=" px-4 py-2 text-md rounded-md" onClick={onInstall}>
                <ReloadOutlined /> 加载依赖
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
export default MainView
