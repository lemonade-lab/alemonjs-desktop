import { useNotification } from '@src/context/Notification'
import { useEffect, useRef, useState } from 'react'

export default function From() {
  const { notification } = useNotification()
  const fromNameRef = useRef('')
  const [submit, setSubmit] = useState(false)
  const [fromNameValue, setFromNameValue] = useState('')

  /**
   *
   * @param e
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFromNameValue(e.target.value)
  }

  /**
   *
   * @param e
   * @returns
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // 阻止默认行为
    e.preventDefault()

    // 防止重复提交
    if (submit) return

    // 验证
    if (!fromNameValue || fromNameValue == '') return

    notification(`开始安装 ${fromNameValue}`)

    setSubmit(true)

    window.yarn.cmds({
      type: `add`,
      value: ['add', fromNameValue, '-W']
    })
  }

  // 保持引用
  useEffect(() => {
    fromNameRef.current = fromNameValue
  }, [fromNameValue])

  useEffect(() => {
    window.yarn.on(data => {
      if (data.type == `add`) {
        setSubmit(false)
        const value = data.value
        if (value == 0) {
          notification(`add ${fromNameValue} 失败`, 'warning')
        } else {
          notification(`add ${fromNameValue} 完成`)
          // 推送加载。
          window.expansions.postMessage({ type: 'get-expansions', data: {} })
        }
        return
      }
    })
  }, [])

  return (
    <div className="flex flex-1 items-center justify-center ">
      <div className="p-8 rounded-lg bg-[var(--alemonjs-primary-bg)] shadow-inner w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">下载模块</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm py-1 font-medium text-gray-700">
              安装npmjs模块，可了解
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
