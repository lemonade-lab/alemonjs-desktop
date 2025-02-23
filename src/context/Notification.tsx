import React, { createContext, useContext, useState, ReactNode, useRef, useEffect } from 'react'
import Notification from '@/common/Notification'
import _ from 'lodash'

interface Notification {
  id: number
  message: string
  theme: 'default' | 'error' | 'warning'
}

type NotificationState = {
  id: number
  message: string
  theme: 'default' | 'error' | 'warning'
}[]

type NotificationContextType = (message: string, theme?: 'default' | 'error' | 'warning') => void

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

interface NotificationProviderProps {
  children: ReactNode
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [state, setState] = useState<NotificationState>()

  const stateRef = useRef(state)

  useEffect(() => {
    stateRef.current = state
  }, [state])

  const MAX_SIZE = 1000 * 5
  const SIZE = 1000 * 1

  // 延迟通知，去掉300ms内的，避免频繁通知
  const notification = _.debounce(
    (message: string, theme: 'default' | 'error' | 'warning' = 'default') => {
      const data = stateRef.current?.[stateRef.current.length - 1]
      // 如果当前通知和上一条通知一样，不新增。
      if (data?.message === message) {
        return
      }
      const id = Date.now()
      if (!stateRef.current) {
        setState([{ id, message, theme }])
      } else {
        setState([...stateRef.current, { id, message, theme }])
      }
      setTimeout(() => {
        hideNotification(id)
      }, MAX_SIZE) // 5秒后自动关闭通知
    },
    SIZE
  )

  const hideNotification = (id: number) => {
    setState(stateRef.current?.filter(notification => notification.id !== id))
  }

  return (
    <NotificationContext.Provider value={notification}>
      {children}
      <div className="fixed top-16 left-1/2 z-50 transform -translate-x-1/2 min-w-[240px]">
        <div className="flex flex-col gap-4">
          {state &&
            state.map(notification => (
              <Notification
                key={notification.id}
                message={notification.message}
                type={notification.theme}
                onClose={() => hideNotification(notification.id)}
              />
            ))}
        </div>
      </div>
    </NotificationContext.Provider>
  )
}

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider')
  }
  return context
}
