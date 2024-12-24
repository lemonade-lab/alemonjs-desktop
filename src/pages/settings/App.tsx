import JSON5 from 'json5'
export default () => {
  return (
    <section className=" h-full flex flex-col ">
      <section className="flex-1 shadow-content  flex  items-center ">
        <section className="w-28  h-full  p-2 border ">
          <div className="px-2 py-1 hcursor-pointer text-sm">通用</div>
        </section>
        <section className="flex-1 bg-gradient-to-r  h-full  p-2 border ">
          <div className="px-2 py-1">聊天数据</div>
          <div className="w-full flex flex-col gap-2  px-2 py-3   border rounded-md ">
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
                className="cursor-pointer  px-2  border rounded-md  "
              >
                清理
              </button>
            </div>
            <div className="flex">
              <span className="flex-1 text-sm">图片（清理本机中存在的图片）</span>
              <button
                onClick={() => {
                  window.app.rmTemplateFiles().then(res => {
                    alert('清理成功')
                  })
                }}
                className="cursor-pointer  px-2  ext-slate-600  border rounded-md "
              >
                清理
              </button>
            </div>
          </div>
          <div className="px-2 py-1 mt-4">本机数据</div>
          <div className="w-full flex flex-col gap-2  px-2 py-3  border">
            <div className="flex">
              <span className="flex-1 text-sm">所有（待更新。。。。）</span>
              <button className="cursor-pointer  px-2  border rounded-md ">清理</button>
            </div>
          </div>
        </section>
      </section>
    </section>
  )
}
