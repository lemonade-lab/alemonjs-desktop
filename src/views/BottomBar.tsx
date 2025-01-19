import { SettingIcon } from '@src/common/Icons'
import { PetalIcon } from '@src/common/MenuIcons'
import { NavigatePath } from '@src/hook/navigate'
import classNames from 'classnames'
import { memo } from 'react'
import { useLocation } from 'react-router-dom'
type PropsList = { Icon: any; path: NavigatePath; onClick: (path: NavigatePath) => void }[]
export const BottomBar = memo(
  ({
    centerList,
    onClickLogo,
    onClickSetting
  }: {
    centerList: PropsList
    onClickSetting: () => void
    onClickLogo: () => void
  }) => {
    const location = useLocation()
    return (
      <aside className="flex flex-col justify-between items-center p-1 bg-[var(--alemonjs-primary-bg)]">
        <div className=" cursor-pointer" onClick={onClickLogo}>
          <PetalIcon width="28" />
        </div>
        <div className="px-1 py-8 flex-col bg-white text-[var(--alemonjs-menu-text)] rounded-full flex gap-4">
          {centerList.map((item, index) => (
            <span
              key={item.path}
              className={classNames(
                'w-10 h-10 rounded-full flex items-center justify-center cursor-pointer',
                {
                  'bg-[var(--alemonjs-menu-bg)] text-white': item.path == location.pathname,
                  'hover:bg-[var(--alemonjs-primary-bg)]': item.path != location.pathname
                }
              )}
              onClick={() => item.onClick(item.path)}
              // aria-label={`Navigate to ${item.path}`} // 添加可访问性标签
            >
              {item.Icon}
            </span>
          ))}
        </div>
        <div className="p-1 flex-col bg-white text-[var(--alemonjs-menu-text)] rounded-full flex gap-4">
          <span
            className={classNames(
              'w-10 h-10 rounded-full flex items-center justify-center cursor-pointer'
            )}
            onClick={onClickSetting}
          >
            <SettingIcon width="28" height="28" />
          </span>
        </div>
      </aside>
    )
  }
)
