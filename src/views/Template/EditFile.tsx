import { useEffect, useState } from 'react'
import { useNotification } from '@/context/Notification'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import Code from '@/common/CodeMirror'
import { Button } from '@alemonjs/react-ui'
import { PrimaryDiv } from '@alemonjs/react-ui'
import { SecondaryDiv } from '@alemonjs/react-ui'
import { UnControlled as CodeMirror } from 'react-codemirror2'
type EditFileProps = {
  title: string
  dir: string
  mode?: CodeMirror['props']['options']['mode']
}

/**
 *
 * @returns
 */
export default function EditFile({ title, dir, mode }: EditFileProps) {
  const app = useSelector((state: RootState) => state.app)
  const [value, setValue] = useState(``)
  const notification = useNotification()
  const [initValue, setInitValue] = useState('')
  // 保存
  const onClickSave = async () => {
    const isDir = await window.app.exists(dir)
    if (!isDir) {
      notification(title + '不存在')
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
  // 初始化数据
  const initData = async () => {
    const isDir = await window.app.exists(dir)
    if (!isDir) {
      notification(title + '不存在')
      return
    }
    const data = await window.app.readFiles(dir)
    console.log('data', data)
    if (data && data != '') {
      setValue(data)
      setInitValue(data)
    }
  }
  // 放弃
  const onGiveUp = () => {
    setValue(initValue)
  }
  // 修改
  const onChange = (value: string) => {
    setValue(value)
  }
  useEffect(() => {
    initData()
  }, [])
  return (
    <div className="flex-1 flex flex-col h-full">
      <SecondaryDiv className=" flex justify-between items-center  px-2">
        <div className="flex gap-2">
          <div className="px-1 py-1">{title}</div>
        </div>
        <div className="flex  gap-4 items-center">
          {value != initValue && (
            <>
              <Button
                type="button"
                className="border px-2 rounded-md  duration-700 transition-all  "
              >
                <span onClick={onGiveUp}>放弃</span>
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
      <PrimaryDiv className=" flex flex-col h-[calc(100vh-3.6rem)] w-[calc(100vw-21.7rem)] overflow-auto  ">
        <Code mode={mode} value={value} onChange={(editor, data, value) => onChange(value)} />
      </PrimaryDiv>
    </div>
  )
}
