import { useNotification } from '@src/context/Notification'
import { RootState } from '@src/store'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
export type NavigatePath =
  | '/'
  | '/home'
  | '/bot-log'
  | '/config-edit'
  | '/docs'
  | '/config-code'
  | '/setting'
  | '/expansions'
//
export default function useGoNavigate() {
  const navigate = useNavigate()
  const modules = useSelector((state: RootState) => state.modules)
  const { notification } = useNotification()
  const navigateTo = (path: NavigatePath) => {
    // 加载依赖时，不允许跳转。
    if (!modules.nodeModulesStatus) {
      notification('正在加载依赖，请等待...')
      return
    }
    navigate(path)
  }
  return navigateTo
}
