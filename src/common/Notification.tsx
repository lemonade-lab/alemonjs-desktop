import React, { useEffect, useState } from 'react'
import { CloseIcon } from './Icons'
import classNames from 'classnames'

interface NotificationProps {
  message: string
  visible: boolean
  theme: 'default' | 'error' | 'warning'
  onClose: () => void
}

const Notification: React.FC<NotificationProps> = ({ message, visible, theme, onClose }) => {
  const [progress, setProgress] = useState(100)
  useEffect(() => {
    if (visible) {
      setProgress(100)
      const timer = setTimeout(() => {
        onClose()
      }, 5000)
      const interval = setInterval(() => {
        setProgress(prev => Math.max(prev - 2, 0))
      }, 100)
      return () => {
        clearTimeout(timer)
        clearInterval(interval)
      }
    }
  }, [visible, onClose])
  if (!visible) return null
  return (
    <div
      className={classNames(
        `fixed top-16 left-1/2   px-4 py-2 rounded-lg shadow-lg z-50 transform -translate-x-1/2 min-w-[240px]`,
        {
          'bg-[var(--notification-bg)] text-[var(--secondary-text)]': theme === 'default',
          'bg-red-300 text-slate-700': theme === 'error',
          'bg-yellow-200 text-slate-700': theme === 'warning'
        }
      )}
    >
      <div className="flex items-center gap-3">
        <span className="text-sm flex-1 break-words max-w-[420px]">{message}</span>
        <span
          onClick={onClose}
          className="text-[var(--notification-text)] duration-700 transition-all  hover:text-[--primary-color] cursor-pointer"
        >
          <CloseIcon />
        </span>
      </div>
      <div className="relative mt-2 h-2 bg-gray-300 rounded">
        <div
          className="absolute h-full bg-white rounded"
          style={{ width: `${progress}%`, transition: 'width 0.1s' }}
        />
      </div>
    </div>
  )
}

export default Notification
