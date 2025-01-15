// NotificationContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react'
import Notification from '@src/common/Notification'

interface NotificationState {
  message: string
  visible: boolean
  theme: 'default' | 'error' | 'warning'
}

interface NotificationContextType {
  notification: (message: string, theme?: 'default' | 'error' | 'warning') => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

interface NotificationProviderProps {
  children: ReactNode
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [value, setValue] = useState<NotificationState>({
    message: '',
    visible: false,
    theme: 'default'
  })

  const notification = (message: string, theme: 'default' | 'error' | 'warning' = 'default') => {
    setValue({ message, visible: true, theme })
  }

  const hideNotification = () => {
    setValue({ ...value, visible: false })
  }

  return (
    <NotificationContext.Provider value={{ notification }}>
      {children}
      <Notification
        message={value.message}
        visible={value.visible}
        theme={value.theme}
        onClose={hideNotification}
      />
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
