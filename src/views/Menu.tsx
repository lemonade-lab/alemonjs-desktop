import { HomeIcon, PetalIcon } from '@src/ui/MenuIcons'
import { NavigatePath } from '@src/hook/useGoNavigate'
import { BarDiv } from '@src/ui/BarDiv'
import { NavDiv } from '@src/ui/NavDiv'
import classNames from 'classnames'
import { memo } from 'react'
import { Setting } from '@src/ui/Icons'
import { Tooltip } from '@src/ui/Tooltip'
import { ControlFilled, SettingFilled } from '@ant-design/icons'
// import { useLocation } from 'react-router-dom'
type PropsList = { Icon: any; path: NavigatePath; onClick: (path: NavigatePath) => void }[]
const MenuButton = memo(
  ({
    centerList,
    onClickLogo,
    onClickSetting,
    onClickYarn
  }: {
    centerList: PropsList
    onClickSetting: () => void
    onClickLogo: () => void
    onClickYarn: () => void
  }) => {
    // const location = useLocation()
    return (
      <aside className={classNames('flex flex-col justify-between items-center p-1')}>
        {
          // nav setting
        }

        <NavDiv className="p-1 flex-col rounded-full flex gap-4">
          <BarDiv
            className={classNames(
              'w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all duration-700'
            )}
            onClick={onClickLogo}
          >
            <HomeIcon width="20" height="20" />
          </BarDiv>
        </NavDiv>
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

        <NavDiv className="px-1 py-4 flex-col  rounded-full flex gap-3">
          <BarDiv
            className={classNames(
              'w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all duration-700'
            )}
            onClick={onClickYarn}
          >
            <ControlFilled width={20} height={20} />
          </BarDiv>
          <BarDiv
            className={classNames(
              'w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all duration-700'
            )}
            onClick={onClickSetting}
          >
            <SettingFilled width={20} height={20} />
          </BarDiv>
        </NavDiv>
      </aside>
    )
  }
)

export default MenuButton
