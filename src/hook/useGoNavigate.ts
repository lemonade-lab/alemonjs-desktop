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
  const expansions = useSelector((state: RootState) => state.expansions)
  const statusRef = useRef({
    nodeModulesStatus: modules.nodeModulesStatus,
    runStatus: expansions.runStatus
  })
  useEffect(() => {
    statusRef.current = {
      nodeModulesStatus: modules.nodeModulesStatus,
      runStatus: expansions.runStatus
    }
  }, [modules.nodeModulesStatus, expansions.runStatus])
  const { notification } = useNotification()
  const navigateTo = (path: NavigatePath, options?: NavigateOptions) => {
    if (path === '/setting' || path === '/') {
      navigate(path, options)
      return
    }
    if (!statusRef.current.nodeModulesStatus) {
      notification('依赖未加载...')
      navigate('/')
      return
    }
    if (path === '/expansions' || path === '/application' || path === '/git-expansions') {
      if (!statusRef.current.runStatus) {
        notification('扩展器未运行...')
        return
      }
    }
    navigate(path, options)
  }
  return navigateTo
}
