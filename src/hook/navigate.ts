import { useNotification } from '@src/context/Notification'
import { RootState } from '@src/store'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
export type NavigatePath =
  | '/home'
  | '/bot-log'
  | '/config-edit'
  | '/docs'
  | '/config-code'
  | '/setting'
export default function useGoNavigate() {
  const navigate = useNavigate()
  const modules = useSelector((state: RootState) => state.modules)
  const { showNotification } = useNotification()
  const navigateTo = (path: NavigatePath) => {
    if (path == '/config-edit') {
      if (!modules.nodeModulesStatus) {
        showNotification('依赖未加载完成...')
        return
      }
    }
    navigate(path)
  }
  return navigateTo
}
