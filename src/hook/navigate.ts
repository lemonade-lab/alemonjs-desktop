import { useNotification } from '@src/context/Notification'
import { RootState } from '@src/store'
import { useSelector } from 'react-redux'
import { NavigateOptions, useNavigate } from 'react-router-dom'
export type NavigatePath =
  | '/'
  | '/home'
  | '/bot-log'
  | '/webviews'
  | '/docs'
  | '/config-code'
  | '/setting'
  | '/expansions'
//
export default function useGoNavigate() {
  const navigate = useNavigate()
  const modules = useSelector((state: RootState) => state.modules)
  const { notification } = useNotification()
  const navigateTo = (path: NavigatePath, options?: NavigateOptions) => {
    if (path == '/setting' || path == '/') {
      navigate(path, options)
      return
    }
    if (modules.nodeModulesStatus) {
      navigate(path, options)
      return
    }
    // 加载依赖时，不允许跳转。
    notification('正在加载依赖，请等待...')
  }
  return navigateTo
}
