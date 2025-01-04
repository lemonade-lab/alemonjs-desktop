import ConfigTree from '@src/views/tags/ConfigEdit/ConfigTree'
import Preferences from '@src/views/tags/ConfigEdit/Preferences'
import { useNavigate } from 'react-router-dom'
export default function ConfigEdit() {
  const navigate = useNavigate()
  return (
    <main className="flex-1 flex flex-col gap-2">
      <div className="flex flex-row justify-end ">
        <button onClick={() => navigate('/config-code')} className="px-2 btn-code">
          <span>源码</span>
        </button>
      </div>
      <section className="flex-1 grid grid-cols-4 gap-4">
        <ConfigTree />
        <Preferences />
      </section>
    </main>
  )
}
