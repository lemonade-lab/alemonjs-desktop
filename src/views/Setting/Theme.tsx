import Button from '@src/ui/Button'
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
  const onChangeColor = _.debounce((name: string, color: string) => {
    // 找到index
    const index = _.findIndex(data, item => item.name === name)
    if (data[index].coler != color) {
      data[index].coler = color
      setData([...data])
      setUpdate(true)
    }
  }, 300)
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
  }, [])
  return (
    <div className="animate__animated animate__fadeIn flex-1 flex-col flex">
      <div className="flex-col gap-2 flex-1 flex p-6 ">
        <div className="flex flex-col flex-1  p-6 rounded-lg shadow-inner bg-[var(--alemonjs-primary-bg)]  max-w-full">
          <div className="text-2xl flex items-center justify-between font-semibold mb-4 border-b">
            <div className="flex gap-2 items-center">
              <div>主题</div>
              <div
                className="text-xs  cursor-pointer text-[var(--alemonjs-secondary-text)]"
                onClick={() => {
                  window.theme.initVariables()
                }}
              >
                <div>恢复默认</div>
              </div>
            </div>
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
          </div>
          <div className="flex flex-col gap-4 h-[calc(100vh-11rem)] overflow-y-auto scrollba">
            {data.map(item => (
              <div key={item.name} className="flex gap-2 justify-between">
                <div className="">{item.name}</div>

                <div className="flex gap-2 items-center">
                  <div>{item.coler}</div>
                  <input
                    type="color"
                    value={item.coler}
                    onChange={value => {
                      const color = value.target.value
                      const _name = `alemonjs-${item.name}`
                      onChangeColor(item.name, color)
                      // 编辑theme
                      document.documentElement.style.setProperty(`--${_name}`, color)
                    }}
                    className="border-2 bg-white border-gray-300 px-1 rounded"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
export default Theme
