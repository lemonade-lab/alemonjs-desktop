import { useNotification } from '@src/context/Notification'
import { useEffect, useRef, useState } from 'react'

export default function From() {
  const [fromNameValue, setFromNameValue] = useState('')
  const fromNameRef = useRef('')
  const { notification } = useNotification()

  //
  useEffect(() => {
    fromNameRef.current = fromNameValue
  }, [fromNameValue])

  // 控制提交
  const [submit, setSubmit] = useState(false)
  useEffect(() => {
    window.yarn.onAddStatus(value => {
      setSubmit(false)
      if (value == 0) {
        notification('add 失败', 'error')
      } else {
        notification('add 完成')
        // 推送加载。
        window.expansions.postMessage({ type: 'add-expansions', data: fromNameRef.current })
      }
    })
  }, [])

  //
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFromNameValue(e.target.value)
  }
  //
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (submit) return
    // if (!/^(alemonjs-|@alemonjs)/.test(fromNameValue)) {
    //   notification('alemonjs 扩展必须以 alemonjs- 或 @alemonjs/ 开头', 'warning')
    //   return
    // }
    if (!fromNameValue || fromNameValue == '') return
    window.yarn.add(fromNameValue)
    setSubmit(true)
  }
  return (
    <div className="flex flex-1 items-center justify-center ">
      <div className="p-8 rounded-lg bg-[var(--secondary-bg-front)] shadow-inner w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">下载模块</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm py-1 font-medium text-gray-700">
              下载非alemonjs相关模块，可了解
              <span
                className="cursor-pointer text-blue-600"
                onClick={() => {
                  window.open('https://www.npmjs.com/search?q=alemonjs')
                }}
              >
                npmjs.com
              </span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="@alemonjs/db"
              value={fromNameValue}
              onChange={handleChange}
              className="mt-1 block w-full px-2 py-1  border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            // 控制提交
            disabled={submit}
            className="w-full bg-blue-400 text-white p-2 rounded-md duration-700 transition-all  hover:bg-blue-700 "
          >
            开始安装
          </button>
        </form>
      </div>
    </div>
  )
}
