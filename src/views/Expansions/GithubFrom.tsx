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

export default function GithubFrom() {
  const [fromNameValue, setFromNameValue] = useState('')
  const fromNameRef = useRef('')

  useEffect(() => {
    fromNameRef.current = fromNameValue
  }, [fromNameValue])

  const { showNotification } = useNotification()

  // 控制提交
  const [submit, setSubmit] = useState(false)
  useEffect(() => {
    window.expansions.onMessage(data => {
      if (data.type == 'git-clone') {
        if (data.data == 1) {
          setSubmit(false)
          showNotification('git clone 完成')
          // 加载依赖
          window.yarn.install()
          // 刷新 扩展包
        } else {
          setSubmit(false)
          showNotification('git clone 失败')
        }
      }
    })
  }, [])

  //
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFromNameValue(e.target.value)
  }

  //
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (submit) return
    e.preventDefault()
    if (!fromNameValue || fromNameValue == '') return
    window.expansions.postMessage({ type: 'git-clone', data: fromNameValue })
    setSubmit(true)
  }

  //
  return (
    <div className="flex flex-1 items-center justify-center ">
      <div className=" p-8 rounded-lg bg-[var(--secondary-bg-front)] shadow-inner w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Git</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              需要安装git才能进行交互,
              <span
                className=" cursor-pointer"
                onClick={() => {
                  window.open('https://git-scm.com/')
                }}
              >
                download
              </span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="https://github.com/lemonade-lab/alemonjs.git"
              value={fromNameValue}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-400 text-white p-2 rounded-md duration-700 transition-all  hover:bg-blue-700 "
          >
            下载仓库
          </button>
        </form>
      </div>
    </div>
  )
}
