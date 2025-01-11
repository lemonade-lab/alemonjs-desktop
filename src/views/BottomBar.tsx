import { SettingIcon } from '@src/common/Icons'
import { PetalIcon } from '@src/common/MenuIcons'
import classNames from 'classnames'
export const BottomBar = ({
  centerList,
  centerIndex,
  onClickSetting
}: {
  centerList: { Icon: any; path: string; onClick: (path: string) => void }[]
  centerIndex: string
  onClickSetting: () => void
}) => {
  return (
    <aside className="flex flex-col justify-between items-center px-2 py-4 bg-[var(--secondary-bg-front)]">
      <div>
        <PetalIcon width="28" />
      </div>
      <div className="px-2 py-1 flex-col bg-white text-[var(--secondary-bg)] rounded-full flex gap-4">
        {centerList.map((item, index) => (
          <span
            key={index}
            className={classNames(
              'w-10 h-10 rounded-full flex items-center justify-center cursor-pointer',
              {
                'bg-[var(--secondary-bg)] text-white': item.path == centerIndex,
                'hover:bg-[var(--secondary-bg-front)]': item.path != centerIndex
              }
            )}
            onClick={() => item.onClick(item.path)}
          >
            {item.Icon}
          </span>
        ))}
      </div>
      <div className="px-2 py-1 flex-col bg-white text-[var(--secondary-bg)] rounded-full flex gap-4">
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
