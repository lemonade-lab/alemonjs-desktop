import { memo, useEffect, useRef } from 'react'
import Markdown from '../Markdown'
import logoURL from '@src/assets/logo.jpg'
import { Download, RefreshIcon, Upload } from '@src/common/Icons'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@src/store'
import { useNotification } from '@src/context/Notification'
import { fetchPackageInfo } from './api'
import { putPackage } from '@src/store/expansions'

export type PackageInfoType = {
  [key: string]: any
  'name': string
  'description': string
  'author':
    | string
    | {
        name: string
        email: string
        url: string
      }
    | null
  'dist-tags': { latest: string }
  'readme': string
} | null

export default memo(function PackageInfo({ packageInfo }: { packageInfo: PackageInfoType }) {
  if (!packageInfo) return <div></div>
  const packageInfoRef = useRef<PackageInfoType>(null)
  const { notification } = useNotification()
  const expansions = useSelector((state: RootState) => state.expansions)
  const dispatch = useDispatch()

  const headleInstall = (name: string) => {
    notification(`开始安装${name}`)
    window.yarn.add(name)
  }

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

  const headleDelete = (item: { name: string; [key: string]: any }) => {
    if (!item) return
    if (item.isLink) {
      window.yarn.unLink(item.name)
      notification(`开始卸载${item.name}`)
    } else if (item.isGit) {
      //
    } else {
      // yarn remove
      notification(`待更新 ...`)
    }
  }

  // 控制提交
  useEffect(() => {
    // 初始化请求得到商场数据
    window.yarn.onAddStatus(value => {
      if (value == 0) {
        notification('add 失败', 'error')
      } else {
        notification('add 完成')
        if (!packageInfoRef.current) return
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
    // 初始化请求得到商场数据
    window.yarn.onUnLinkStatus(value => {
      if (value == 0) {
        notification('unlink 失败', 'error')
      } else {
        notification('unlink 完成')
        if (!packageInfoRef.current) return
        // 推送加载。
        window.expansions.postMessage({ type: 'add-expansions', data: packageInfoRef.current.name })
      }
    })
  }, [])

  return (
    <div>
      <div className="p-2  flex items-center justify-center gap-4 border-b">
        <div className="flex items-center justify-center">
          <img src={logoURL} alt={`${packageInfo.name} logo`} className="size-20 rounded-md" />
        </div>
        <div className="flex-1 flex flex-col gap-1">
          <div className="text-xl flex gap-2  text-gray-800">
            <div className="font-bold">{packageInfo.name}</div>
            {packageInfo['isLink'] && (
              <div className="text-xs text-[var(--alemonjs-secondary-text)]">link</div>
            )}
            {packageInfo['isGit'] && (
              <div className="text-xs text-[var(--alemonjs-secondary-text)]">git</div>
            )}
          </div>
          <div className="flex gap-2 items-center">
            {typeof packageInfo.author === 'string' ? (
              <div>{packageInfo.author}</div>
            ) : (
              <div className="flex gap-2 items-center">
                {packageInfo.author?.url ? (
                  <div>
                    <a target="_blank" rel="noreferrer" href={packageInfo.author?.url}>
                      {packageInfo.author?.name ?? '未知'}
                    </a>
                  </div>
                ) : (
                  <div>{packageInfo.author?.name ?? '未知'}</div>
                )}
                <div> {packageInfo.author?.email ? `| ${packageInfo.author?.email}` : ' '}</div>
              </div>
            )}
          </div>
          <div className="text-gray-700">{packageInfo.description}</div>
          <div className="flex gap-2 items-center justify-between">
            <div className="flex gap-2 items-center">
              <div>Version: {packageInfo['dist-tags'].latest}</div>
              {expansions.package.find(item => item.name == packageInfo.name) ? (
                <>
                  <div className="flex items-center gap-1 cursor-pointer" onClick={onClickUpdate}>
                    <RefreshIcon width={16} height={16} /> 更新
                  </div>
                  <div
                    className="flex items-center gap-1 cursor-pointer"
                    onClick={() => headleDelete(packageInfo)}
                  >
                    <Upload width={16} height={16} /> 卸载
                  </div>
                </>
              ) : (
                <div
                  className="flex items-center gap-1 cursor-pointer"
                  onClick={() => headleInstall(packageInfo.name)}
                >
                  <Download width={16} height={16} /> 下载
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className=" overflow-auto scrollbar h-[calc(100vh-9.7rem)]">
        <Markdown source={packageInfo.readme} />
      </div>
    </div>
  )
})
