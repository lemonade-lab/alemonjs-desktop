import { memo } from 'react'
import Markdown from '../Markdown'
import logoURL from '@src/assets/logo.jpg'

export type PackageInfoType = {
  'name': string
  'description': string
  'dist-tags': { latest: string }
  'readme': string
} | null

export default memo(function PackageInfo({ packageInfo }: { packageInfo: PackageInfoType }) {
  if (!packageInfo) return <div></div>
  return (
    <div>
      <div className="p-2 bg-white flex items-center justify-center gap-4 border-b">
        <div className="bg-gray-100 flex items-center justify-center">
          <img src={logoURL} alt={`${packageInfo.name} logo`} className="size-20 rounded-md" />
        </div>
        <div className="flex-1 flex flex-col gap-1">
          <div className="text-xl font-bold text-gray-800">{packageInfo.name}</div>
          <div className="text-gray-700">{packageInfo.description}</div>
          <div className="text-sm">
            <span className="text-gray-600">版本:</span> {packageInfo['dist-tags'].latest}
          </div>
        </div>
      </div>
      <div className="bg-white overflow-auto scrollbar h-[calc(100vh-8.2rem)]">
        <Markdown source={packageInfo.readme} />
      </div>
    </div>
  )
})
