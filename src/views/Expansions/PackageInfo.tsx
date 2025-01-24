import { memo, useEffect, useRef } from 'react'
import Markdown from '../../common/Markdown'
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
  const pkgInfo = packageInfo
  const { notification } = useNotification()
  const expansions = useSelector((state: RootState) => state.expansions)
  const dispatch = useDispatch()

  /**
   *
   * @param name
   */
  const headleInstall = (name: string) => {
    notification(`开始安装${name}`)
    if (pkgInfo['isLink']) {
      window.yarn.cmds({
        type: `link`,
        value: ['link', name]
      })
    } else {
      window.yarn.cmds({
        type: `add`,
        value: ['add', name, '-W']
      })
    }
  }

  /**
   *
   * @returns
   */
  const onClickUpdate = async () => {
    if (!pkgInfo) return
    let t = true
    setTimeout(() => {
      if (!t) return
      notification(`开始检查${pkgInfo.name}版本`)
    }, 1300)
    // 获取最新版本
    try {
      const msg = await fetchPackageInfo(pkgInfo.name)
      t = false
      if (msg['dist-tags']) {
        const version = msg['dist-tags'].latest
        if (pkgInfo['dist-tags'].latest !== version) {
          notification(`检查到最新版本${version}`, 'default')
          pkgInfo['__version'] = version
          //
          window.yarn.cmds({
            type: `upgrade`,
            value: ['upgrade', `${pkgInfo.name}@${version}`, '-W']
          })
        } else {
          notification(`当前已是最新版本`, 'default')
        }
      } else {
        notification(`无法从npmjs中获取${pkgInfo.name}最新版本`, 'error')
      }
    } catch (err) {
      t = false
      notification(`无法从npmjs中获取${pkgInfo.name}最新版本`, 'error')
      console.error(err)
    }
  }

  /**
   *
   * @param item
   * @returns
   */
  const headleDelete = (item: { name: string; [key: string]: any }) => {
    if (!item) return
    if (item.isLink) {
      window.yarn.cmds({
        type: `unlink`,
        value: ['unlink', item.name]
      })
      notification(`开始卸载${item.name}`)
    } else if (item.isGit) {
      notification(`待功能更新...`)
    } else {
      notification(`开始卸载${item.name}`)
      window.yarn.cmds({
        type: `remove`,
        value: ['remove', item.name, '-W']
      })
    }
  }

  // 控制提交
  useEffect(() => {
    window.yarn.on(data => {
      console.log('yarn on', data)
      const type = data.type
      const value = data.value
      //
      if (type == `upgrade`) {
        if (value == 0) {
          notification(`upgrade ${pkgInfo?.name} 失败`, 'warning')
        } else {
          notification(`upgrade ${pkgInfo?.name} 完成`)
          if (!pkgInfo) return
          const __version = pkgInfo['__version']
          pkgInfo['dist-tags'].latest = __version
          // 更新数据
          dispatch(
            putPackage({
              name: pkgInfo.name,
              version: __version
            })
          )
          // 推送加载。
          window.expansions.postMessage({
            type: 'add-expansions',
            data: pkgInfo.name
          })
        }
        return
      } else if (type == `unlink`) {
        if (value == 0) {
          notification(`unlink ${pkgInfo?.name} 失败`, 'warning')
        } else {
          notification(`unlink ${pkgInfo?.name} 完成`)
          if (!pkgInfo) return
          // 推送加载。
          window.expansions.postMessage({
            type: 'get-expansions',
            data: {}
          })
        }
        return
      } else if (type == `remove`) {
        if (value == 0) {
          notification(`remove ${pkgInfo?.name} 失败`, 'warning')
        } else {
          notification(`remove ${pkgInfo?.name} 完成`)
          if (!pkgInfo) return
          // 推送加载。
          window.expansions.postMessage({
            type: 'get-expansions',
            data: {}
          })
        }
        return
      }
      if (type == 'link') {
        if (value == 0) {
          notification(`link ${pkgInfo?.name} 失败`, 'warning')
        } else {
          notification(`link ${pkgInfo?.name} 完成`)
          // 推送加载。
          window.expansions.postMessage({
            type: 'get-expansions',
            data: {}
          })
        }
        return
      }
    })
  }, [])

  return (
    <div className=" select-text">
      <div className="p-2  flex items-center justify-center gap-4 border-b border-secondary-border">
        <div className="flex items-center justify-center">
          <img src={logoURL} alt={`${packageInfo.name} logo`} className="size-20 rounded-md" />
        </div>
        <div className="flex-1 flex flex-col gap-1">
          <div className="text-xl flex gap-2 text-secondary-text">
            <div className="font-bold">{packageInfo.name}</div>
            {packageInfo['isLink'] && <div className="text-xs text-secondary-text">link</div>}
            {packageInfo['isGit'] && <div className="text-xs text-secondary-text">git</div>}
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
          <div className="text-secondary-text">{packageInfo.description}</div>
          <div className="flex gap-2 items-center justify-between">
            <div className="flex gap-2 items-center">
              <div>Version: {packageInfo['dist-tags'].latest}</div>
              {expansions.package.find(item => item.name == packageInfo.name) ? (
                <>
                  {!packageInfo['isLink'] && (
                    <div className="flex items-center gap-1 cursor-pointer" onClick={onClickUpdate}>
                      <RefreshIcon width={16} height={16} /> 更新
                    </div>
                  )}
                  {packageInfo.name != '@alemonjs/process' && (
                    <div
                      className="flex items-center gap-1 cursor-pointer"
                      onClick={() => headleDelete(packageInfo)}
                    >
                      <Upload width={16} height={16} /> 卸载
                    </div>
                  )}
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
