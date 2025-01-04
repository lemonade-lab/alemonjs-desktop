import { CirclePlusIcon } from '@src/common/Icons'
import { useState } from 'react'

type PreferencesType = {
  key: string
  value: string
}

/* 预设标题 */
export default () => {
  const [preferences, setPreferences] = useState<PreferencesType[]>([
    {
      key: '',
      value: ''
    },
    {
      key: '预留Key',
      value: '预留Value'
    }
  ])

  // 添加预设
  const handleAddPreference = () => {
    setPreferences([...preferences, { key: '', value: '' }])
  }
  // 修改预设
  const handleChangePreference = (index: number, key: string, value: string) => {
    const newPreferences = [...preferences]
    newPreferences[index].key = key
    newPreferences[index].value = value
    setPreferences(newPreferences)
  }

  return (
    <div className="col-span-3 px-8 box-card bg-[#ffffff6b] rounded-xl shadow-content p-2">
      <div className="flex justify-between">
        <div className="card-title">预设标题</div>
        <div
          className="cursor-pointer hover:text-[--primary-color] text-[#B2B2B2]"
          onClick={handleAddPreference}
        >
          <CirclePlusIcon width="20" height="20" />
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-4 mt-3">
        {preferences.map((item, index) => (
          <div className="flex gap-4 items-center" key={index}>
            <span className="text-sm text-[--primary-color]">{index + 1}</span>

            <div className="preference-content flex-1 gap-2 flex items-center">
              <label className="preference-label" htmlFor={`key-${index}`}>
                Key
              </label>
              <input
                id={`key-${index}`}
                className="text-sm px-4 py-2 w-full preference-input rounded-full"
                value={item.key}
                onChange={e => handleChangePreference(index, e.target.value, item.value)}
              />
            </div>

            <div className="preference-content gap-2 flex-1 flex items-center">
              <label className="preference-label" htmlFor={`value-${index}`}>
                Value
              </label>
              <input
                id={`value-${index}`}
                className="text-sm px-4 py-2 w-full preference-input rounded-full"
                value={item.value}
                onChange={e => handleChangePreference(index, item.key, e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
