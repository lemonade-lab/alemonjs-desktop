import { useEffect, useState } from 'react'
import { useNotification } from '@src/context/Notification'
import { useSelector } from 'react-redux'
import { RootState } from '@src/store'
import Code from '@src/common/CodeMirror'
import { Button } from '@src/component/Button'
import { PrimaryDiv } from '@src/component/PrimaryDiv'
import { SecondaryDiv } from '@src/component/SecondaryDiv'
export default function Npmrc() {
  const app = useSelector((state: RootState) => state.app)
  const [value, setValue] = useState(``)
  const { notification } = useNotification()
  const [initValue, setInitValue] = useState('')
  const onClickSave = async () => {
    const dir = app.userDataTemplatePath + '/.npmrc'
    const isDir = await window.app.exists(dir)
    if (!isDir) {
      notification('.npmrc不存在')
      return
    }
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
    const isDir = await window.app.exists(dir)
    if (!isDir) {
      notification('.npmrc不存在')
      return
    }
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
      {/* <PrimaryDiv> */}

      {/* </PrimaryDiv> */}
      <SecondaryDiv className=" flex justify-between items-center  px-2">
        <div className="flex gap-2">
          <div className="px-1 py-1">.npmrc</div>
        </div>
        <div className="flex  gap-4 items-center">
          {value != initValue && (
            <>
              <Button
                type="button"
                className="border px-2 rounded-md  duration-700 transition-all  "
              >
                <span
                  onClick={() => {
                    setValue(initValue)
                  }}
                >
                  放弃
                </span>
              </Button>
              <Button
                type="button"
                className="border px-2 rounded-md  duration-700 transition-all  "
              >
                <span onClick={onClickSave}>保存</span>
              </Button>
            </>
          )}
        </div>
      </SecondaryDiv>
      <PrimaryDiv className=" flex flex-col h-[calc(100vh-3.6rem)] overflow-y-auto ">
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
