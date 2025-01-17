import { memo } from 'react'
import Markdown from '../Markdown'
import logoURL from '@src/assets/logo.jpg'
import { RefreshIcon } from '@src/common/Icons'
import { fetchPackageInfo } from './api'
import { useNotification } from '@src/context/Notification'

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

export default memo(function PackageInfo({
  packageInfo,
  onClickUpdate
}: {
  packageInfo: PackageInfoType
  onClickUpdate: () => void
}) {
  if (!packageInfo) return <div></div>

  return (
    <div>
      <div className="p-2  flex items-center justify-center gap-4 border-b">
        <div className="flex items-center justify-center">
          <img src={logoURL} alt={`${packageInfo.name} logo`} className="size-20 rounded-md" />
        </div>
        <div className="flex-1 flex flex-col gap-1">
          <div className="text-xl flex gap-2  text-gray-800">
            <div className="font-bold">{packageInfo.name}</div>
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
          <div className="flex gap-2 items-center">
            <div>Version: {packageInfo['dist-tags'].latest}</div>
            <div className=" cursor-pointer" onClick={onClickUpdate}>
              <RefreshIcon width={16} height={16} />
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
