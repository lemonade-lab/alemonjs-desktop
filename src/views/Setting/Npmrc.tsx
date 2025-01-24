import { useEffect, useState } from 'react'
import { useNotification } from '@src/context/Notification'
import { useSelector } from 'react-redux'
import { RootState } from '@src/store'
import { PrimaryDiv } from '@src/ui/Div'
import Code from '@src/common/CodeMirror'
export default function Npmrc() {
  const app = useSelector((state: RootState) => state.app)
  const [value, setValue] = useState(``)
  const { notification } = useNotification()
  const [initValue, setInitValue] = useState('')
  const onClickSave = async () => {
    const dir = app.userDataTemplatePath + '/.npmrc'
    // 保存数据。
    const T = await window.app.writeFiles(dir, value)
    if (T) {
      setInitValue(value)
    } else {
      notification('保存失败', 'error')
    }
  }
  const initData = async () => {
    const dir = app.userDataTemplatePath + '/.npmrc'
    const data = await window.app.readFiles(dir)
    console.log('data', data)
    if (data && data != '') {
      setValue(data)
      setInitValue(data)
    }
  }
  useEffect(() => {
    initData()
  }, [])
  return (
    <div className="flex-1 flex flex-col h-full">
      <div className=" flex justify-between items-center  px-2">
        <div className="flex gap-2">
          <div className="px-1 py-1">.npmrc</div>
        </div>
        <div className="flex  gap-4 items-center">
          {value != initValue && (
            <>
              <button
                type="button"
                className="border px-2 rounded-md bg-red-500 duration-700 transition-all  hover:bg-red-400"
              >
                <span
                  className="text-white"
                  onClick={() => {
                    setValue(initValue)
                  }}
                >
                  放弃
                </span>
              </button>
              <button
                type="button"
                className="border px-2 rounded-md bg-blue-500 duration-700 transition-all  hover:bg-blue-400"
              >
                <span className="text-white" onClick={onClickSave}>
                  保存
                </span>
              </button>
            </>
          )}
        </div>
      </div>
      <PrimaryDiv className=" flex flex-col h-[calc(100vh-3.6rem)] overflow-y-auto scrollbar">
        <Code
          value={value}
          theme="solarized"
          onChange={(editor, data, value) => {
            setValue(value)
          }}
        />
      </PrimaryDiv>
    </div>
  )
}
