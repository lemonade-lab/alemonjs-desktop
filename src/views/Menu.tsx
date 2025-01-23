import { SettingIcon } from '@src/common/Icons'
import { PetalIcon } from '@src/common/MenuIcons'
import { NavigatePath } from '@src/hook/navigate'
import { BarDiv, NavDiv } from '@src/ui/Div'
import classNames from 'classnames'
import { memo } from 'react'
// import { useLocation } from 'react-router-dom'
type PropsList = { Icon: any; path: NavigatePath; onClick: (path: NavigatePath) => void }[]
const MenuButton = memo(
  ({
    centerList,
    onClickLogo,
    onClickSetting
  }: {
    centerList: PropsList
    onClickSetting: () => void
    onClickLogo: () => void
  }) => {
    // const location = useLocation()
    return (
      <aside className={classNames('flex flex-col justify-between items-center p-1')}>
        {
          // icon
        }
        <nav>
          <span className=" cursor-pointer" onClick={onClickLogo}>
            <PetalIcon width="28" />
          </span>
        </nav>
        {
          // nav
        }
        <NavDiv className="px-1 py-8 flex-col  rounded-full flex gap-4">
          {centerList.map((item, index) => (
            <BarDiv
              key={item.path}
              className={classNames(
                'w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all duration-700'
              )}
              onClick={() => item.onClick(item.path)}
            >
              {item.Icon}
            </BarDiv>
          ))}
        </NavDiv>
        {
          // nav setting
        }
        <NavDiv className="p-1 flex-col rounded-full flex gap-4">
          <BarDiv
            className={classNames(
              'w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all duration-700'
            )}
            onClick={onClickSetting}
          >
            <SettingIcon width="28" height="28" />
          </BarDiv>
        </NavDiv>
      </aside>
    )
  }
)

export default MenuButton
