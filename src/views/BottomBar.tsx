import { SettingIcon } from '@src/common/Icons'
import { PetalIcon } from '@src/common/MenuIcons'
import { NavigatePath } from '@src/hook/navigate'
import classNames from 'classnames'
import { useLocation } from 'react-router-dom'
export const BottomBar = ({
  centerList,
  onClickLogo,
  onClickSetting
}: {
  centerList: { Icon: any; path: NavigatePath; onClick: (path: NavigatePath) => void }[]
  centerIndex: string
  onClickSetting: () => void
  onClickLogo: () => void
}) => {
  const location = useLocation()
  return (
    <aside className="flex flex-col justify-between items-center p-1 bg-[var(--secondary-bg-front)]">
      <div className=" cursor-pointer" onClick={onClickLogo}>
        <PetalIcon width="28" />
      </div>
      <div className="px-1 py-8 flex-col bg-white text-[var(--secondary-bg)] rounded-full flex gap-4">
        {centerList.map((item, index) => (
          <span
            key={index}
            className={classNames(
              'w-10 h-10 rounded-full flex items-center justify-center cursor-pointer',
              {
                'bg-[var(--secondary-bg)] text-white': item.path == location.pathname,
                'hover:bg-[var(--secondary-bg-front)]': item.path != location.pathname
              }
            )}
            onClick={() => item.onClick(item.path)}
          >
            {item.Icon}
          </span>
        ))}
      </div>
      <div className="p-1 flex-col bg-white text-[var(--secondary-bg)] rounded-full flex gap-4">
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
