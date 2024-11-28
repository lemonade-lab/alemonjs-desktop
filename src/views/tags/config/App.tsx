import ConfigTree from '@src/views/containers/ConfigTree'
import Preferences from '@src/views/containers/Preferences'
import { useNavigate } from 'react-router-dom'

export default () => {
  const navigate = useNavigate()

  return (
    <main className="flex-1 flex flex-col pt-4">
      <div className="flex flex-row justify-end pb-2">
        <button onClick={() => navigate('/config-code')} className="px-2 btn-code">
          <span>源码</span>
        </button>
      </div>

      <section className="flex-1 grid grid-cols-4 gap-4">
        {/* 配置树 */}
        <ConfigTree />

        {/* 预设标题 */}
        <Preferences />
      </section>
    </main>
  )
}
