import { useNotification } from '@src/context/Notification'
import { useEffect, useRef, useState } from 'react'

// 扩展 window
type API = {
  postMessage: (data: any) => void
  onMessage: (callback: (data: any) => void) => void
}

declare global {
  interface Window {
    createDesktopAPI: () => API
    API: API
  }
}

export default function From() {
  const [fromNameValue, setFromNameValue] = useState('')

  const fromNameRef = useRef('')

  useEffect(() => {
    fromNameRef.current = fromNameValue
  }, [fromNameValue])

  const { showNotification } = useNotification()
  // 控制提交
  const [submit, setSubmit] = useState(false)
  useEffect(() => {
    window.yarn.onAddStatus(value => {
      setSubmit(false)
      if (value == 0) {
        showNotification('add 失败')
      } else {
        showNotification('add 完成')
        // 推送加载。
        window.expansions.postMessage({ type: 'add-expansions', data: fromNameRef.current })
      }
    })
  }, [])
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFromNameValue(e.target.value)
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (submit) return
    e.preventDefault()
    if (!fromNameValue || fromNameValue == '') return
    window.yarn.add(fromNameValue)
    setSubmit(true)
  }
  return (
    <div className="flex flex-1 items-center justify-center ">
      <div className="p-8 rounded-lg bg-[var(--secondary-bg-front)] shadow-inner w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">扩展商城</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">扩展名</label>
            <input
              type="text"
              name="name"
              placeholder="@alemonjs/db"
              value={fromNameValue}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            // 控制提交
            disabled={submit}
            className="w-full bg-blue-400 text-white p-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            开始安装
          </button>
        </form>
      </div>
    </div>
  )
}
