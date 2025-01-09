// NotificationContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react'
import Notification from '@src/common/Notification'

interface NotificationState {
  message: string
  visible: boolean
}

interface NotificationContextType {
  showNotification: (message: string) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

interface NotificationProviderProps {
  children: ReactNode
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [notification, setNotification] = useState<NotificationState>({
    message: '',
    visible: false
  })

  const showNotification = (message: string) => {
    setNotification({ message, visible: true })
  }

  const hideNotification = () => {
    setNotification({ ...notification, visible: false })
  }

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <Notification
        message={notification.message}
        visible={notification.visible}
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
