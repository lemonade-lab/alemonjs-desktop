import { lazy, useEffect, useRef, useState } from 'react'
import Dropdown from './Dropdown'
import { debounce } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@src/store'
import { useNotification } from '@src/context/Notification'
import { PackageInfoType } from './PackageInfo'
import { Init } from './Component'
import { MenuMoreIcon, RefreshIcon, SettingIcon } from '@src/common/Icons'
// import { useModal } from '@src/hook/useModal'
import { fetchPackageInfo, getPackages } from './api'
import ExpansionsCard from './ExpansionsCard'
import { putPackage } from '@src/store/expansions'

// 懒加载
const PackageInfo = lazy(() => import('./PackageInfo'))
const LinkFrom = lazy(() => import('./FromLink'))
const AddFrom = lazy(() => import('./FromAdd'))
const GithubFrom = lazy(() => import('./FromGit'))

export default function Expansions() {
  const app = useSelector((state: RootState) => state.app)
  const [packageInfo, setPackageInfo] = useState<PackageInfoType>(null)

  const packageInfoRef = useRef<PackageInfoType>(null)

  const { notification } = useNotification()
  const dispatch = useDispatch()
  const [select, setSelect] = useState('')
  const expansions = useSelector((state: RootState) => state.expansions)

  const handlePackageClick = debounce(async (packageName: string) => {
    const pkg = expansions.package.find(v => v.name === packageName)
    if (!pkg) {
      notification(`本地没有找到 ${packageName} 的数据。`, 'error')
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

  const handleNpmJSPackageClick = debounce(async (packageName: string) => {
    try {
      const pkg = await fetchPackageInfo(packageName)
      const data = {
        'name': pkg?.name || '',
        'description': pkg?.description || '',
        'author': pkg?.author || null,
        'dist-tags': pkg['dist-tags'],
        'readme': pkg.readme || ''
      }
      setPackageInfo(data)
    } catch (err) {
      console.error(err)
    }
  }, 500)

  useEffect(() => {
    if (packageInfo) setSelect('shoping')
    packageInfoRef.current = packageInfo
  }, [packageInfo])

  const onChangeOption = (value: string) => {
    setSelect(value)
  }

  const onClickRefresh = () => {
    window.expansions.postMessage({ type: 'get-expansions' })
  }

  // const modal = useModal()

  // const [isSubmitting, setIsSubmitting] = useState(false)
  const headleDelete = () => {
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
  const headleDisable = () => {
    notification(`待更新 ...`)
  }

  // 恢复
  const headleRestore = () => {
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
        if (!packageInfoRef.current) return
        console.log('packageInfo', packageInfoRef.current)

        const __version = packageInfoRef.current['__version']
        packageInfoRef.current['dist-tags'].latest = __version

        // 更新数据
        dispatch(
          putPackage({
            name: packageInfoRef.current.name,
            version: __version
          })
        )
        // 推送加载。
        window.expansions.postMessage({ type: 'add-expansions', data: packageInfoRef.current.name })
      }
    })
  }, [])

  const onClickUpdate = async () => {
    if (!packageInfoRef.current) return
    notification(`开始检查${packageInfoRef.current.name}版本`)
    // 获取最新版本
    try {
      const msg = await fetchPackageInfo(packageInfoRef.current.name)
      if (msg['dist-tags']) {
        const version = msg['dist-tags'].latest
        if (packageInfoRef.current['dist-tags'].latest !== version) {
          notification(`检查到最新版本${version}`, 'default')
          packageInfoRef.current['__version'] = version
          window.yarn.add(`${packageInfoRef.current.name}@${version}`)
        } else {
          notification(`当前已是最新版本`, 'default')
        }
      } else {
        notification(`无法从npmjs中获取${packageInfoRef.current.name}最新版本`, 'error')
      }
    } catch (err) {
      notification(`无法从npmjs中获取${packageInfoRef.current.name}最新版本`, 'error')
      console.error(err)
    }
  }

  const headleInstall = (name: string) => {
    notification(`开始安装${name}`)
    window.yarn.add(name)
  }

  return (
    <section className="animate__animated animate__fadeIn flex flex-row flex-1 h-full shadow-md">
      <div className="flex flex-col flex-1 bg-[var(--primary-bg-front)]">
        {select == '' && <Init />}
        {select == 'shoping' && packageInfo && (
          <PackageInfo onClickUpdate={onClickUpdate} packageInfo={packageInfo} />
        )}
        {select == '关联' && <LinkFrom />}
        {select == '模块' && <AddFrom />}
        {select == '仓库' && <GithubFrom />}
      </div>
      <nav className="animate__animated animate__fadeInRight duration-500 flex flex-col  w-72 xl:w-80 border-l  gap-1 h-full p-2">
        <div className="flex justify-between">
          <div className="">扩展列表</div>
          <div className="text-[0.7rem] flex gap-2 items-center justify-center ">
            <div onClick={onClickRefresh} className=" cursor-pointer">
              <RefreshIcon width={18} height={18} />
            </div>
            <Dropdown
              Icon={<MenuMoreIcon width={18} height={18} />}
              options={['仓库', '关联', '模块']}
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
                    handlePackageClick={name => handleNpmJSPackageClick(name)}
                    options={['安装']}
                    onChangeOption={name => {
                      if (name == '安装') headleInstall(item.name)
                    }}
                  />
                ))
              : expansions.package.map(item => (
                  <ExpansionsCard
                    item={item}
                    key={item.name}
                    handlePackageClick={name => handlePackageClick(name)}
                    options={['卸载', '禁用', '恢复']}
                    onChangeOption={name => {
                      if (name == '卸载') headleDelete()
                      if (name == '禁用') headleDisable()
                      if (name == '恢复') headleRestore()
                    }}
                  />
                ))}
          </div>
        </div>
      </nav>
    </section>
  )
}
