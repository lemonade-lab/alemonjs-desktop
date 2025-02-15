import { useNotification } from '@src/context/Notification'
import { RootState } from '@src/store'
import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { NavigateOptions, useNavigate } from 'react-router-dom'
export type NavigatePath =
  | '/'
  | '/bot-log'
  | '/application'
  | '/docs'
  | '/config-code'
  | '/setting'
  | '/expansions'
  | '/git-expansions'
//
export default function useGoNavigate() {
  const navigate = useNavigate()
  const modules = useSelector((state: RootState) => state.modules)
  const statusRef = useRef(modules.nodeModulesStatus)
  // Update the ref whenever notification changes
  useEffect(() => {
    statusRef.current = modules.nodeModulesStatus
  }, [modules.nodeModulesStatus])
  const { notification } = useNotification()
  const navigateTo = (path: NavigatePath, options?: NavigateOptions) => {
    if (path == '/setting' || path == '/') {
      navigate(path, options)
      return
    }
    if (statusRef.current) {
      navigate(path, options)
      return
    }
    // 加载依赖时，不允许跳转。
    notification('正在加载依赖，请等待...')
  }
  return navigateTo
}
