import logoURL from '@src/assets/logo.jpg'
export function Init() {
  return (
    <div className="select-none flex-1 flex-col flex justify-center items-center">
      <div className="flex-col flex  relative">
        <img src={logoURL} alt="logo" className="w-96" />
        <div className="absolute bottom-0">
          <div className="flex-col flex justify-center items-center">
            可选择左侧导航栏中的选项进行查看
          </div>
        </div>
      </div>
    </div>
  )
}
