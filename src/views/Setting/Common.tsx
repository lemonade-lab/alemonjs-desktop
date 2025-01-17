import ToggleSwitch from '@src/ui/Switch'
import _ from 'lodash'
import { useEffect, useState } from 'react'
const Common = () => {
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    const update = async () => {
      const T = await window.controller.autoLaunchStutas()
      if (T) setChecked(true)
    }
    update()
  }, [])

  const update = _.throttle(async checked => {
    const T = await window.controller.setAutoLaunch(checked)
    if (T) {
      setChecked(checked)
    }
  }, 500)

  const onChange = (status: boolean) => {
    update(status)
  }

  return (
    <div className="animate__animated animate__fadeIn flex-1 flex-col flex justify-center items-center">
      <div className="flex-col gap-2 flex-1 flex justify-center py-6">
        <div className="flex flex-col items-center  justify-center flex-1  p-6 rounded-lg shadow-inner bg-[var(--secondary-bg-front)] w-96 max-w-full">
          <h2 className="text-2xl font-semibold mb-4">AlemonJS</h2>
          <div>
            <div className="flex gap-2">
              <div>开机自启</div>
              <ToggleSwitch value={checked} onChange={onChange} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Common
