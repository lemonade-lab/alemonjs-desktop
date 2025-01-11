import { useNavigate } from 'react-router-dom'
/**
 *
 * @returns
 */
export default function ConfigEdit() {
  const navigate = useNavigate()

  /**
   * 从@alemonjs/gui依赖中。
   * 读取配置树信息。
   */

  const views = [
    {
      name: '@alemonjs/gui',
      from: [
        {
          value: '17127',
          component: 'input',
          placeholder: '端口',
          type: 'text'
        }
      ]
    },
    {
      name: '@alemonjs/qq-bot',
      from: [
        {
          value: '',
          component: 'input',
          placeholder: 'app_id',
          type: 'text'
        },
        {
          value: '',
          component: 'input',
          placeholder: 'token',
          type: 'text'
        },
        {
          value: '',
          component: 'input',
          placeholder: 'secret',
          type: 'text'
        },
        {
          value: '17157',
          component: 'input',
          placeholder: 'port',
          type: 'text'
        },
        {
          value: '/webhook',
          component: 'input',
          placeholder: 'route',
          type: 'text'
        },
        {
          value: '',
          component: 'input',
          placeholder: 'ws接收地址',
          type: 'text'
        },
        {
          value: 'false',
          component: 'input',
          placeholder: '频道沙盒',
          type: 'text'
        }
      ]
    },
    {
      name: '@alemonjs/discord',
      from: [
        {
          value: '',
          component: 'input',
          placeholder: 'token',
          type: 'text'
        },
        {
          value: '',
          component: 'input',
          placeholder: 'intent',
          type: 'text'
        },
        {
          value: '',
          component: 'input',
          placeholder: 'shard',
          type: 'text'
        }
      ]
    }
  ]

  return (
    <section className="flex-1 flex flex-col bg-[var(--secondary-bg-front)] ">
      <div className="flex-1 flex flex-col shadow-content rounded-md bg-[var(--primary-bg-front)]">
        <div className="flex justify-between items-center min-h-10 px-2">
          <div className="flex gap-2">
            <div className="px-1">配置图表</div>
            <div
              className="px-1 bg-slate-50 rounded-full border cursor-pointer"
              onClick={() => {
                navigate('/config-code')
              }}
            >
              TABLE
            </div>
          </div>
          <div className="flex  gap-4 items-center"></div>
        </div>
        <div className="flex flex-col gap-2 h-[calc(100vh-6rem)] overflow-y-auto scrollbar p-2">
          {views.map((view, index) => {
            return (
              <div key={index} className="flex flex-col border rounded-md">
                <div className="flex border-b py-2 px-1">
                  <div className="px-1">{view.name}</div>
                </div>
                <form className="flex flex-col gap-2  px-2 py-1">
                  {view.from.map((item, index) => {
                    return (
                      <input
                        key={index}
                        type={item.type}
                        value={item.value}
                        placeholder={item.placeholder}
                        className="flex-1 px-2 py-1 border rounded-md bg-[var(--primary-bg-back)]"
                      />
                    )
                  })}
                </form>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
