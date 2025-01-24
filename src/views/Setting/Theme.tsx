import { updateTheme } from '@src/core/theme'
import { PrimaryDiv } from '@src/ui/Div'
import { Button, Input } from '@src/ui/Interactive'
import ToggleSwitch from '@src/ui/Switch'
import _ from 'lodash'
import { useEffect, useState } from 'react'
const Theme = () => {
  const [data, setData] = useState<
    {
      name: string
      coler: string
    }[]
  >([])
  const [update, setUpdate] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const saveColor = () => {
    // 转为 object 存储起来。
    // data
    const _data: {
      [key: string]: string
    } = {}
    for (const item of data) {
      _data[`alemonjs-${item.name}`] = item.coler
    }
    // 存储
    window.theme.save(_data)
  }

  /**
   *
   * @param name
   * @param color
   */
  const onChangeColor = (name: string, color: string) => {
    // 找到index
    const index = _.findIndex(data, item => item.name === name)
    if (data[index].coler != color) {
      data[index].coler = color
      setData([...data])
      setUpdate(true)
    }
  }

  const setColor = (name: string, color: string) => {
    const _name = `alemonjs-${name}`
    document.documentElement.style.setProperty(`--${_name}`, color)
  }

  useEffect(() => {
    // 加载css变量
    window.theme.variables()

    // 监听 css 变量
    window.theme.on(cssVariables => {
      const arr = Object.keys(cssVariables).map(key => ({
        name: key.replace(/^alemonjs-/g, ''),
        coler: cssVariables[key]
      }))
      setData(arr)
    })

    window.theme.mode().then(res => {
      if (res === 'dark') {
        setIsDark(true)
      } else {
        setIsDark(false)
      }
    })
  }, [])

  /**
   *
   * @param status
   */
  const onChangeDesktop = (status: boolean) => {
    setIsDark(status)
    updateTheme(status)
  }
  return (
    <div className="animate__animated animate__fadeIn flex-1 flex-col flex">
      <div className="flex-col gap-2 flex-1 flex p-6 ">
        <PrimaryDiv className="flex flex-col flex-1  p-6 rounded-lg shadow-inner    max-w-full">
          <div
            className="text-2xl flex items-center justify-between font-semibold mb-4 border-b
            border-secondary-border
           dark:border-dark-secondary-border
          "
          >
            <div className="flex gap-2 items-center">
              <div>主题</div>
              <div
                className="text-xs  cursor-pointer  text-secondary-text"
                onClick={() => {
                  window.theme.initVariables()
                }}
              >
                <div>恢复默认</div>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              {update && (
                <Button
                  onClick={() => {
                    saveColor()
                    setUpdate(false)
                  }}
                >
                  <div>保存</div>
                </Button>
              )}
              <ToggleSwitch value={isDark} onChange={onChangeDesktop} />
            </div>
          </div>
          <div className="flex flex-col gap-4 h-[calc(100vh-11rem)] overflow-y-auto scrollba">
            {isDark
              ? data
                  .filter(item => /dark/.test(item.name))
                  .map(item => (
                    <div key={item.name} className="flex gap-2 justify-between">
                      <div className="">{item.name}</div>

                      <div className="flex gap-2 items-center">
                        <Input
                          type="text"
                          value={item.coler}
                          className="rounded px-1"
                          onChange={value => {
                            const color = value.target.value
                            // #开头。且只能是数字和字母。最多6位
                            const reg = /^#[0-9a-zA-Z]$/
                            if (!reg.test(color)) return
                            onChangeColor(item.name, color)
                            setColor(item.name, color)
                          }}
                        />
                        <Input
                          type="color"
                          value={item.coler}
                          onChange={value => {
                            const color = value.target.value
                            onChangeColor(item.name, color)
                            setColor(item.name, color)
                          }}
                          className="border-2  rounded"
                        />
                      </div>
                    </div>
                  ))
              : data
                  .filter(item => !/dark/.test(item.name))
                  .map(item => (
                    <div key={item.name} className="flex gap-2 justify-between">
                      <div className="">{item.name}</div>
                      <div className="flex gap-2 items-center">
                        <Input
                          type="text"
                          value={item.coler}
                          className="rounded px-1"
                          onChange={value => {
                            const color = value.target.value
                            // #开头。且只能是数字和字母。最多12位
                            const reg = /^(#[0-9a-zA-Z]{1,12}|#)$/
                            if (!reg.test(color)) return
                            onChangeColor(item.name, color)
                            setColor(item.name, color)
                          }}
                        />
                        <Input
                          type="color"
                          value={item.coler}
                          onChange={value => {
                            const color = value.target.value
                            onChangeColor(item.name, color)
                            setColor(item.name, color)
                          }}
                          className="border-2  rounded"
                        />
                      </div>
                    </div>
                  ))}
          </div>
        </PrimaryDiv>
      </div>
    </div>
  )
}
export default Theme
