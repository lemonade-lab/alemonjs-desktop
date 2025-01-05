import ConfigTree from '@src/views/Config/ConfigEdit/App'
import Preferences from '@src/views/Config/ConfigEdit/Preferences'
export default function ConfigEdit() {
  return (
    <main className="flex-1 flex flex-col gap-2">
      <section className="flex-1 grid grid-cols-4 gap-4">
        <ConfigTree />
        <Preferences />
      </section>
    </main>
  )
}
