import Header from '../Header'
import JSON5 from 'json5'

export default () => {
  return (
    <section className="bg-white h-full flex flex-col">
      <Header>
        <div className="flex-1 drag-area flex justify-center items-center"></div>
      </Header>

      <section className="flex-1 mx-2 my-2 shadow-centent border rounded-md flex  items-center ">
        <section className="w-28 bg-blue-300 to-blue-200 h-full rounded-l-md p-2">
          <div className="bg-slate-50 rounded-md px-2 py-1 hover:bg-slate-100 cursor-pointer text-sm">
            通用
          </div>
        </section>

        <section className="flex-1 bg-gradient-to-r from-blue-100 via-blue-300 to-blue-300 h-full rounded-r-md p-2">
          <div className="px-2 py-1">聊天数据</div>
          <div className="w-full flex flex-col gap-2 bg-white px-2 py-3 rounded-md">
            <div className="flex">
              <span className="flex-1 text-sm">记录（删除所有图文数据）</span>
              <button
                onClick={() => {
                  window.app.writeResourcesFilesTestMessageJson(JSON5.stringify([])).then(res => {
                    if (res) {
                      alert('清理成功')
                    } else {
                      alert('清理失败')
                    }
                  })
                }}
                className="cursor-pointer border px-2 rounded-md bg-blue-300 text-white hover:bg-blue-400"
              >
                清理
              </button>
            </div>

            <div className="border border-1 border-slate-100"></div>

            <div className="flex">
              <span className="flex-1 text-sm">图片（清理本机中存在的图片）</span>
              <button
                onClick={() => {
                  window.app.rmTemplateFiles().then(res => {
                    alert('清理成功')
                  })
                }}
                className="cursor-pointer border px-2 rounded-md bg-blue-300 text-white hover:bg-blue-400"
              >
                清理
              </button>
            </div>
          </div>

          <div className="px-2 py-1 mt-4">本机数据</div>
          <div className="w-full flex flex-col gap-2 bg-white px-2 py-3 rounded-md">
            <div className="flex">
              <span className="flex-1 text-sm">所有（待更新。。。。）</span>
              <button className="cursor-pointer border px-2 rounded-md bg-blue-300 text-white hover:bg-blue-400">
                清理
              </button>
            </div>
          </div>
        </section>
      </section>
    </section>
  )
}
