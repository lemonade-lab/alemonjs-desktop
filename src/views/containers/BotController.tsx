import { useEffect, useState } from 'react'

/**
 * 无法正常关闭 机器人
 */
export default () => {
  //
  const [status, setStatus] = useState<boolean>(false)
  const [nodeStatus, setNodeStatus] = useState(false)
  //
  const [configText, setConfigText] = useState({
    init: ``,
    value: ``
  })

  //
  useEffect(() => {
    // 询问机器人状态
    window.app.botIsRunning().then(res => {
      console.log('机器人是否在运行：', status, res)
      setStatus(res)
    })
    window.app.isTemplateExists().then(res => {
      console.log('模板是否存在：', status, res)
      setNodeStatus(res)
    })

    window.app.readResourcesFilesAlemonConfigJson().then(res =>
      setConfigText({
        init: res,
        value: res
      })
    )
  }, [])

  /**
   *
   */
  const onClickRun = () => {
    window.app.botRun()
    setTimeout(() => {
      window.app.botIsRunning().then(res => setStatus(res))
    }, 500)
  }

  /**
   *
   * @returns
   */
  const onClickStart = async () => {
    if (nodeStatus) {
      if (!status) onClickRun()
      return
    }
    // 开始加载
    const t = await window.app.yarnInstall()
    if (!t) {
      alert('依赖加载中')
    } else {
      // 定时询问
      alert('未加载依赖,开始加载依赖...')
      const func = () => {
        window.app.isTemplateExists().then(res => {
          if (res) {
            alert('依赖加载完成...')
            setNodeStatus(res)
          } else {
            setTimeout(func, 1000)
          }
        })
      }
      setTimeout(func, 1000)
    }
  }

  return (
    <section className="bg-[#ffffff6b] rounded-xl shadow-content p-2 ">
      <div className="m-auto flex gap-4 py-1 items-center ">
        <div className=" py-1 px-4 rounded-md">机器状态 : {status ? '已启动' : '未启动'}</div>
        {status ? (
          <button
            className="border px-2 rounded-md  hover:bg-blue-400"
            onClick={() => {
              // 点击关闭
              window.app.botClose()
              setStatus(false)
            }}
          >
            <span>关闭</span>
          </button>
        ) : (
          <button className="border px-2 rounded-md  hover:bg-blue-400" onClick={onClickStart}>
            <span>启动</span>
          </button>
        )}
        {!nodeStatus && <div>依赖未加载。。。</div>}
      </div>
    </section>
  )
}
