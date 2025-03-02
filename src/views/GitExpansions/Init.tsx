const Init = () => {
  return (
    <div className="flex flex-col flex-1 justify-center items-center p-4">
      <div className="flex flex-col flex-1 justify-center items-center">
        <h1 className="text-2xl font-bold mb-4">仓库管理</h1>
        <p className="text-lg text-center">使用git进行npmjs化管理，以支持扩展机制</p>
        <p className="text-lg text-center">可安装指定分支，并切换至指定纪录</p>
        <p className="text-lg text-center">完成后可在扩展管理查看被npm化的扩展</p>
      </div>
    </div>
  )
}
export default Init
