import { useNotification } from '@src/context/Notification'
import { PrimaryDiv } from '@src/ui/Div'
import { Button, Input } from '@src/ui/Interactive'
import { useEffect, useRef, useState } from 'react'

export default function From() {
  const [fromNameValue, setFromNameValue] = useState('')
  const { notification } = useNotification()
  const [submit, setSubmit] = useState(false)
  const fromNameRef = useRef('')

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
    e.preventDefault()
    //
    if (submit) return

    //
    if (!fromNameValue || fromNameValue == '') return

    setSubmit(true)

    window.yarn.cmds({
      type: `cmd`,
      value: fromNameValue.split(' ')
    })
  }

  useEffect(() => {
    fromNameRef.current = fromNameValue
  }, [fromNameValue])

  useEffect(() => {
    window.yarn.on(data => {
      if (!data || !data.type || data.type != 'cmd') return
      //  结束加载状态
      setSubmit(false)
      const value = data.value
      if (value == 0) {
        notification(`yarn ${fromNameRef.current} 失败`, 'warning')
      } else {
        notification(`yarn ${fromNameRef.current} 完成`)
        // 匹配到有关更改包的都重新获取扩展列表。
        if (fromNameRef.current.match(/(add|remove|link|unlink)/)) {
          window.expansions.postMessage({
            type: 'get-expansions',
            data: {}
          })
        }
      }
    })
  }, [])

  return (
    <div className="flex flex-1 items-center justify-center ">
      <PrimaryDiv className="p-8 rounded-lg  shadow-inner w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">包管理器</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block py-1 text-sm font-medium text-gray-700">
              调用内置的Yarn包管理器对包进行操作
            </label>
            <Input
              type="text"
              name="name"
              placeholder="link @alemonjs/db"
              value={fromNameValue}
              onChange={handleChange}
              className="mt-1 block w-full px-2 py-1  border  rounded-md focus:outline-none focus:ring  "
            />
          </div>
          <Button
            type="submit"
            // 控制提交
            disabled={submit}
            className="w-full      p-2 rounded-md duration-700 transition-all   "
          >
            开始关联
          </Button>
        </form>
      </PrimaryDiv>
    </div>
  )
}
