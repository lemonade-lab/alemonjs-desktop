import { showNotification } from '@src/store/notificationSlice'
import { useDispatch } from 'react-redux'

export default () => {
  const dispatch = useDispatch()
  return (
    <section className=" h-full flex flex-col bg-[#ffffff6b] shadow-content rounded-xl">
      <section className="flex-1 flex  items-center ">
        <section className="w-28  h-full  p-2   ">
          {['通用', '关于'].map((item, index) => {
            return (
              <div
                key={index}
                className="px-2 py-1 hcursor-pointer text-sm hover:bg-gray-100 rounded-md cursor-pointer"
              >
                {item}
              </div>
            )
          })}
        </section>
        <section className="flex-1 bg-gradient-to-r  h-full  p-2   ">
          <div className="px-2 py-1">聊天数据</div>
          <div className="w-full flex flex-col gap-2  px-2 py-3   border rounded-md ">
            <div className="flex">
              <span className="flex-1 text-sm">记录（删除所有图文数据）</span>
              <button
                onClick={e => {
                  e.stopPropagation()
                  dispatch(showNotification('待更新...'))
                }}
                className="cursor-pointer  px-2  border rounded-md  "
              >
                清理
              </button>
            </div>
            <div className="flex">
              <span className="flex-1 text-sm">图片（清理本机中存在的图片）</span>
              <button
                onClick={e => {
                  e.stopPropagation()
                  dispatch(showNotification('待更新...'))
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
              <button
                className="cursor-pointer  px-2  border rounded-md "
                onClick={e => {
                  // 阻止冒泡
                  e.stopPropagation()
                  dispatch(showNotification('待更新...'))
                }}
              >
                清理
              </button>
            </div>
          </div>
        </section>
      </section>
    </section>
  )
}
