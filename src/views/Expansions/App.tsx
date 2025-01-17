import { lazy, useEffect, useState } from 'react'
import logoURL from '@src/assets/logo.jpg'
import Dropdown from './Dropdown'
import { debounce } from 'lodash'
import { useSelector } from 'react-redux'
import { RootState } from '@src/store'
import { useNotification } from '@src/context/Notification'
import { PackageInfoType } from './PackageInfo'
import { Init } from './Component'
import { MenuMoreIcon, RefreshIcon, SettingIcon } from '@src/common/Icons'
// import { useModal } from '@src/hook/useModal'
import { fetchPackageInfo, getPackages } from './api'

// 懒加载
const PackageInfo = lazy(() => import('./PackageInfo'))
const LinkFrom = lazy(() => import('./FromLink'))
const AddFrom = lazy(() => import('./FromAdd'))
const GithubFrom = lazy(() => import('./FromGit'))

const ExpansionsCard = ({
  item,
  handlePackageClick,
  onChangeOption,
  options
}: {
  item: any
  handlePackageClick: (name: string) => void
  onChangeOption: (name: string) => void
  options?: string[]
}) => {
  return (
    <div
      onClick={() => handlePackageClick(item.name)}
      className="cursor-pointer rounded-sm relative flex gap-1  p-1 flex-row h-14 justify-between items-center duration-700 transition-all  hover:bg-gray-100"
    >
      <div className="size-10 rounded-sm">
        <img
          src={logoURL}
          alt={`${item.name} logo`}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="flex flex-1 flex-col">
        <div className="">{item.name}</div>
        <div className="text-[0.6rem]">{item.description}</div>
      </div>
      <div className="absolute  bottom-1 right-1 text-[0.6rem]">
        <Dropdown
          Icon={<SettingIcon width={18} height={18} />}
          options={options ?? []}
          onChangeOption={value => {
            onChangeOption(value)
          }}
        />
      </div>
    </div>
  )
}

export default function Expansions() {
  const app = useSelector((state: RootState) => state.app)
  const [packageInfo, setPackageInfo] = useState<PackageInfoType>(null)
  const { notification } = useNotification()
  const [select, setSelect] = useState('')
  const expansions = useSelector((state: RootState) => state.expansions)

  const handlePackageClick = debounce(async (packageName: string) => {
    const pkg = expansions.package.find(v => v.name === packageName)
    if (!pkg) {
      notification(`没有找到 ${packageName} 的数据。`, 'error')
      return
    }
    const dir = app.nodeModulesPath + '/' + packageName + '/README.md'
    const data = {
      'name': pkg?.name || '',
      'description': pkg?.description || '',
      'author': pkg?.author || null,
      'dist-tags': { latest: pkg?.version || '' },
      'readme': ''
    }
    try {
      const readme = await window.app.readFiles(dir)
      data.readme = readme
    } catch (err) {
      console.error(err)
    }
    setPackageInfo(data)
  }, 500)

  useEffect(() => {
    if (packageInfo) setSelect('shoping')
  }, [packageInfo])

  const onChangeOption = (value: string) => {
    setSelect(value)
  }

  const onClickRefresh = () => {
    window.expansions.postMessage({ type: 'get-expansions' })
  }

  // const modal = useModal()

  // const [isSubmitting, setIsSubmitting] = useState(false)
  const headleDelete = (name: string) => {
    // if (modal.isActive()) {
    //   console.log('active')
    //   return
    // }
    // modal.set(
    //   <Inquiry
    //     title="提示"
    //     onClickCancel={() => {
    //       // if (isSubmitting) return
    //       modal.close()
    //     }}
    //     onClickSuccess={() => {
    //       if (isSubmitting) return
    //       // 卸载
    //       setIsSubmitting(true)
    //       console.log('卸载')
    //       // 卸载
    //       notification(`待更新 ...`)
    //     }}
    //   >
    //     <div>是否确认卸载</div>
    //   </Inquiry>,
    //   // 强制刷新
    //   true
    // )

    notification(`待更新 ...`)
  }

  // 禁用
  const headleDisable = (name: string) => {
    notification(`待更新 ...`)
  }

  // 恢复
  const headleRestore = (name: string) => {
    notification(`待更新 ...`)
  }

  const [npms, setNpms] = useState<typeof expansions.package>([])
  const [packages, setPackages] = useState<typeof expansions.package>([])
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    if (searchValue === '') {
      setPackages([])
      return
    }
    const reg = new RegExp(searchValue, 'i')
    const data = npms.filter(v => reg.test(v.name))
    console.log('server data', data)
    setPackages(data)
  }, [searchValue])

  // 控制提交
  useEffect(() => {
    getPackages().then(data => {
      console.log('data', data)
      if (data.objects) {
        setNpms(data.objects.map((v: any) => v.package))
      }
    })

    // 初始化请求得到商场数据
    window.yarn.onAddStatus(value => {
      if (value == 0) {
        notification('add 失败', 'error')
      } else {
        notification('add 完成')
        if (!packageInfo) return
        // 推送加载。
        window.expansions.postMessage({ type: 'add-expansions', data: packageInfo.name })
      }
    })
  }, [])

  const onClickUpdate = async () => {
    if (!packageInfo) return
    // 获取最新版本
    try {
      const msg = await fetchPackageInfo(packageInfo.name)
      if (msg['dist-tags']) {
        if (packageInfo['dist-tags'].latest !== msg['dist-tags'].latest) {
          notification(`检查到最新版本${msg['dist-tags'].latest}`, 'default')
          window.yarn.add(`${packageInfo.name}@${msg['dist-tags'].latest}`)
        } else {
          notification(`当前已是最新版本`, 'default')
        }
      } else {
        notification(`无法从npmjs中获取${packageInfo.name}最新版本`, 'error')
      }
    } catch (err) {
      notification(`无法从npmjs中获取${packageInfo.name}最新版本`, 'error')
      console.error(err)
    }
  }

  return (
    <section className="flex flex-row flex-1 h-full shadow-md">
      <div className="flex flex-col flex-1 bg-[var(--primary-bg-front)]">
        {select == '' && <Init />}
        {select == 'shoping' && packageInfo && (
          <PackageInfo onClickUpdate={onClickUpdate} packageInfo={packageInfo} />
        )}
        {select == '关联' && <LinkFrom />}
        {select == '添加' && <AddFrom />}
        {select == '仓库' && <GithubFrom />}
      </div>
      <nav className="flex flex-col  w-72 xl:w-80 border-l  gap-1 h-full p-2">
        <div className="flex justify-between">
          <div className="">扩展列表</div>
          <div className="text-[0.7rem] flex gap-2 items-center justify-center ">
            <div onClick={onClickRefresh} className=" cursor-pointer">
              <RefreshIcon width={18} height={18} />
            </div>
            <Dropdown
              Icon={<MenuMoreIcon width={18} height={18} />}
              options={['仓库', '关联', '添加']}
              onChangeOption={onChangeOption}
            />
          </div>
        </div>
        <div className="">
          <input
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
            placeholder="在应用商店中搜索扩展"
            className="w-full px-2 py-1 text-[0.7rem] rounded-sm"
          />
        </div>
        <div className="flex-1">
          <div className="flex flex-col gap-1 scrollbar overflow-auto h-[calc(100vh-6.5rem)]">
            {packages.length > 0
              ? packages.map(item => (
                  <ExpansionsCard
                    item={item}
                    key={item.name}
                    handlePackageClick={handlePackageClick}
                    options={['安装']}
                    onChangeOption={name => {
                      if (name === '安装') {
                        // yarn add packageName
                      }
                    }}
                  />
                ))
              : expansions.package.map(item => (
                  <ExpansionsCard
                    item={item}
                    key={item.name}
                    handlePackageClick={handlePackageClick}
                    options={['卸载', '禁用', '恢复']}
                    onChangeOption={name => {
                      if (name === '卸载') headleDelete(name)
                      if (name === '禁用') headleDisable(name)
                      if (name === '恢复') headleRestore(name)
                    }}
                  />
                ))}
          </div>
        </div>
      </nav>
    </section>
  )
}
