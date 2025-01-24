import { useNotification } from '@src/context/Notification'
import { PrimaryDiv } from '@src/ui/Div'
import { Button, Input } from '@src/ui/Interactive'
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
      <PrimaryDiv className="p-8 rounded-lg   shadow-inner w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">下载模块</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm py-1 font-medium text-secondary-text">
              安装npmjs模块，可了解
              <a href="https://www.npmjs.com/search?q=alemonjs" target="_blank">
                npmjs.com
              </a>
            </label>
            <Input
              type="text"
              name="name"
              placeholder="alemonjs"
              value={fromNameValue}
              onChange={handleChange}
              className="mt-1 block w-full px-2 py-1  border   rounded-md focus:outline-none focus:ring "
            />
          </div>
          <Button
            type="submit"
            // 控制提交
            disabled={submit}
            className="w-full   p-2 rounded-md duration-700 transition-all    "
          >
            开始安装
          </Button>
        </form>
      </PrimaryDiv>
    </div>
  )
}
