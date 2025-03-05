import { useNotification } from '@/context/Notification'
import { RootState } from '@/store'
import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { NavigateOptions, useNavigate } from 'react-router-dom'

export type NavigatePath =
  | '/'
  | '/bot-log'
  | '/application'
  | '/expansions'
  | '/git-expansions'
  | '/common'
  | '/theme'
  | '/log'
  | '/npmrc'
  | '/yarn-manage'
  | '/about'
  | '/pkg'
  | '/template'

// 能放行的路径
const passPath: NavigatePath[] = [
  '/',
  '/yarn-manage',
  '/common',
  '/theme',
  '/log',
  '/npmrc',
  '/about',
  '/git-expansions',
  '/pkg',
  '/template'
]

// 需要启动扩展器的路径
const runPath: NavigatePath[] = ['/expansions', '/application']

/**
 *
 * @returns
 */
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
  const notification = useNotification()
  const navigateTo = (path: string, options?: NavigateOptions) => {
    if (passPath.find(v => v === path)) {
      navigate(path, options)
      return
    }
    if (!statusRef.current.nodeModulesStatus) {
      notification('依赖未加载...', 'warning')
      navigate('/')
      return
    }
    if (runPath.find(v => v === path)) {
      if (!statusRef.current.runStatus) {
        notification('扩展器未运行...', 'warning')
        return
      }
    }
    navigate(path, options)
  }
  return navigateTo
}
