import { ReloadOutlined } from '@ant-design/icons'
import logoURL from '@/assets/logo.jpg'
import { RootState } from '@/store'
import { Button } from '@alemonjs/react-ui'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
const MainView = () => {
  const modules = useSelector((state: RootState) => state.modules)
  const onInstall = () => {
    window.yarn.cmds({
      type: 'install',
      value: ['install', '--ignore-warnings']
    })
  }
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (count == 0) {
      setCount(count + 1)
    }
  }, [modules.nodeModulesStatus])
  return (
    <div className="flex-1 flex-col flex justify-center items-center">
      <div className="flex-col flex ">
        <img src={logoURL} alt="logo" className="w-96" />
        {!modules.nodeModulesStatus && (
          <div className="absolute  right-1/2 top-1/2 transform translate-x-1/2 -translate-y-1/2">
            <Button className="px-4 py-2 text-md rounded-md steps-1" onClick={onInstall}>
              <ReloadOutlined /> 加载依赖
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
export default MainView
