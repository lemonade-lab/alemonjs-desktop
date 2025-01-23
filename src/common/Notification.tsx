import { memo, useEffect, useState } from 'react'
import { CloseIcon } from './Icons'
import classNames from 'classnames'
import { NotificationDiv } from '@src/ui/Div'

interface NotificationProps {
  message: string
  theme: 'default' | 'error' | 'warning'
  onClose: () => void
}

const Notification = memo(({ message, theme, onClose }: NotificationProps) => {
  const [visible, setVisible] = useState(true)
  const [progress, setProgress] = useState(100)

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        setVisible(false)
        onClose() // 关闭时执行父组件传递的关闭函数
      }, 5000)

      const interval = setInterval(() => {
        setProgress(prev => Math.max(prev - 2, 0)) // 每100ms减少2%的进度
      }, 100)

      return () => {
        clearTimeout(timer)
        clearInterval(interval)
      }
    }
  }, [visible, onClose])

  if (!visible) return null // 如果不可见则返回 null

  return (
    <NotificationDiv type={theme} className={classNames(`px-4 py-2 rounded-lg shadow-lg`)}>
      <div className="flex items-center gap-3">
        <span className="text-sm flex-1 break-words max-w-[420px]">{message}</span>
        <span onClick={onClose} className=" duration-700 transition-all  cursor-pointer">
          <CloseIcon />
        </span>
      </div>
      <div className="relative mt-2 h-2 bg-gray-300 rounded">
        <div
          className="absolute h-full bg-white rounded"
          style={{ width: `${progress}%`, transition: 'width 0.1s' }}
        />
      </div>
    </NotificationDiv>
  )
})

export default Notification
