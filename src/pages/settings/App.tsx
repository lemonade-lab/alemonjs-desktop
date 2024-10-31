import Header from '../Header'
export default () => {
  return (
    <section className="bg-white h-full flex flex-col">
      <Header>
        <div className="flex-1  drag-area flex justify-center items-center"></div>
      </Header>
      <section className="flex-1 px-2 py-1 flex  items-center ">
        <section className="w-28 bg-blue-100 bg-opacity-90 h-full rounded-l-md p-2">
          <div className="bg-slate-50 rounded-md px-2 py-1 hover:bg-slate-100 cursor-pointer">
            通用
          </div>
        </section>
        <section className="flex-1 bg-blue-200 bg-opacity-70 h-full rounded-r-md p-2 ">
          <section>
            <div className="px-2 py-1 text-xl">聊天数据</div>
            <div className=" w-full flex flex-col gap-2 bg-white px-2 py-3 rounded-md">
              <div className="flex">
                <div className="flex-1">文本</div>
                <div className="cursor-pointer border px-2 rounded-md bg-blue-300 text-white hover:bg-blue-400">
                  清理
                </div>
              </div>
              <div className="flex">
                <div className="flex-1">图片</div>
                <div className="cursor-pointer border px-2 rounded-md bg-blue-300 text-white hover:bg-blue-400">
                  清理
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="px-2 py-1 text-xl">本机数据</div>
            <div className=" w-full flex flex-col gap-2 bg-white px-2 py-3 rounded-md">
              <div className="flex">
                <div className="flex-1">所有</div>
                <div className="cursor-pointer border px-2 rounded-md bg-blue-300 text-white hover:bg-blue-400">
                  清理
                </div>
              </div>
            </div>
          </section>
        </section>
      </section>
    </section>
  )
}
