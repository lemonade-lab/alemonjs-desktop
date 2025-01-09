// Common.tsx
import React from 'react'
import { useNotification } from '@src/context/Notification'

const Common: React.FC = () => {
  const { showNotification } = useNotification()

  return (
    <section className="flex-1 bg-gradient-to-r h-full p-2">
      <div className="px-2 py-1">聊天数据</div>
      <div className="flex flex-col gap-2 px-2 py-3 border rounded-md">
        <div className="flex items-center">
          <span className="flex-1 text-sm">记录（删除所有图文数据）</span>
          <button
            type="button"
            onClick={() => showNotification('待更新...')}
            className="cursor-pointer px-2 border rounded-md"
          >
            清理
          </button>
        </div>
        <div className="flex items-center">
          <span className="flex-1 text-sm">图片（清理本机中存在的图片）</span>
          <button
            type="button"
            onClick={() => showNotification('待更新...')}
            className="cursor-pointer px-2 border rounded-md"
          >
            清理
          </button>
        </div>
      </div>
      <div className="px-2 py-1 mt-4">本机数据</div>
      <div className="flex flex-col gap-2 px-2 py-3 border">
        <div className="flex items-center">
          <span className="flex-1 text-sm">所有（待更新。。。。）</span>
          <button
            type="button"
            className="cursor-pointer px-2 border rounded-md"
            onClick={() => showNotification('待更新...')}
          >
            清理
          </button>
        </div>
      </div>
    </section>
  )
}

export default Common
