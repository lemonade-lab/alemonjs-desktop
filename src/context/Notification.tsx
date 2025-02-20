import React, { createContext, useContext, useState, ReactNode, useRef, useEffect } from 'react'
import Notification from '@src/common/Notification'

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

interface NotificationContextType {
  notification: (message: string, theme?: 'default' | 'error' | 'warning') => void
}

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

  const notification = (message: string, theme: 'default' | 'error' | 'warning' = 'default') => {
    // 和最近的一次相同的通知不再显示
    if (stateRef.current?.[stateRef.current.length - 1]?.message === message) {
      return
    }
    const id = Date.now()
    setState([...(stateRef.current ?? []), { id, message, theme }])
    setTimeout(() => {
      hideNotification(id)
    }, 5000) // 5秒后自动关闭通知
  }

  const hideNotification = (id: number) => {
    setState(stateRef.current?.filter(notification => notification.id !== id))
  }

  return (
    <NotificationContext.Provider value={{ notification }}>
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
