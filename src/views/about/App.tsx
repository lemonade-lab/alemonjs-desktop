import img_logo from '@src/assets/logo.jpg'
import { useEffect, useState } from 'react'
import Header from '@src/views/common/Header'
export default () => {
  const [version, setVersion] = useState({
    node: '16.14.0',
    electron: '17.0.1',
    chrome: '100.0.4896.127'
  })
  useEffect(() => {
    setVersion({
      chrome: window.versions.chrome,
      electron: window.versions.electron,
      node: window.versions.node
    })
  }, [])
  return (
    <section className="bg-white h-full flex flex-col">
      <Header>
        <div className="flex-1  drag-area flex justify-center items-center"></div>
      </Header>
      <section className="flex-1 px-2 flex flex-col  items-center bg-zinc-50">
        <div className="">
          <img className="max-w-80 pointer-events-none select-none" src={img_logo}></img>
        </div>
        <div>
          Chrome (v{version.chrome}), Node.js (v{version.node}
          ), 和 Electron (v{version.electron})
        </div>
      </section>
    </section>
  )
}
