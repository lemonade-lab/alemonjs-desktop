import { useNotification } from '@src/context/Notification'
import { Button } from '@src/component/Button'
import { Input } from '@src/component/Input'
import { PrimaryDiv } from '@src/component/PrimaryDiv'
import { Select } from '@src/component/Select'
import { useEffect, useRef, useState } from 'react'

export default function YarnManage() {
  const [inputValue, setIputValue] = useState('')
  const { notification } = useNotification()
  const [submit, setSubmit] = useState(false)
  const fromNameRef = useRef('')

  const noValueSelect = ['install', 'list']

  const selects = [
    'add',
    'remove',
    'link',
    'unlink',
    // 'upgrade',
    // 'global add',
    // 'global remove',
    // 'info',
    ...noValueSelect
  ]

  const [value, setValue] = useState(selects[0])

  /**
   *
   * @param e
   * @returns
   */
  const onSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // 选择版本,立即切换到该版本
    const value = e.target.value
    setValue(value)
  }

  /**
   *
   * @param e
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIputValue(e.target.value)
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

    if (!value) return

    if (noValueSelect.includes(value)) {
      setSubmit(true)
      window.yarn.cmds({
        type: `cmd`,
        value: [value]
      })
      return
    }

    if (!inputValue || inputValue == '') return

    const inputValues = inputValue.split(' ')

    setSubmit(true)

    if (value == 'add') {
      // 没有参数的时候，自动添加 -W
      if (!inputValues.includes('-W')) {
        inputValues.push('-W')
      }
    }

    const cmd = [value].concat(inputValues)

    window.yarn.cmds({
      type: `cmd`,
      value: cmd
    })
  }

  useEffect(() => {
    fromNameRef.current = `${value} ${inputValue}`
  }, [value, inputValue])

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
            <label className="block text-sm py-1 font-medium text-secondary-text">
              调用内置的Yarn包管理器对包进行操作
            </label>
            <div className="flex gap-2">
              <Select onChange={onSelect} className="rounded-md px-2">
                {selects.map((v, i) => (
                  <option key={i} value={v}>
                    {v}
                  </option>
                ))}
              </Select>
              <Input
                type="text"
                name="name"
                placeholder="alemonjs"
                value={inputValue}
                onChange={handleChange}
                className="mt-1 block w-full px-2 py-1  border  rounded-md focus:outline-none focus:ring  "
              />
            </div>
          </div>
          <Button
            type="submit"
            // 控制提交
            disabled={submit}
            className="w-full p-2 rounded-md duration-700 transition-all   "
          >
            执行
          </Button>
        </form>
      </PrimaryDiv>
    </div>
  )
}
