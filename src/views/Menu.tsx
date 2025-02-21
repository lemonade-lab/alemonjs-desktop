import { HomeIcon } from '@src/component/MenuIcons'
import useGoNavigate, { NavigatePath } from '@src/hook/useGoNavigate'
import { BarDiv } from '@src/component/BarDiv'
import { NavDiv } from '@src/component/NavDiv'
import classNames from 'classnames'
import { memo } from 'react'
import { SettingFilled } from '@ant-design/icons'
import Dropdown from '@src/component/Dropdown'
type PropsList = { Icon: any; path: NavigatePath; onClick: (path: NavigatePath) => void }[]
const MenuButton = memo(
  ({ centerList, onClickLogo }: { centerList: PropsList; onClickLogo: () => void }) => {
    const navigate = useGoNavigate()
    const buttons = [
      {
        children: '通用',
        onClick: () => {
          navigate('/common')
        }
      },
      {
        children: '主题',
        onClick: () => {
          navigate('/theme')
        }
      },
      {
        children: '记录',
        onClick: () => {
          navigate('/log')
        }
      },
      {
        children: '仓库',
        onClick: () => {
          navigate('/git-expansions')
        }
      },
      {
        children: 'yarn',
        onClick: () => {
          navigate('/yarn-manage')
        }
      },
      {
        children: 'npmrc',
        onClick: () => {
          navigate('/npmrc')
        }
      },
      {
        children: 'about',
        onClick: () => {
          navigate('/about')
        }
      }
    ]
    return (
      <aside className={classNames('flex flex-col justify-between items-center p-1')}>
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
        <NavDiv className="p-1 flex-col  rounded-full flex gap-3">
          <Dropdown placement="topRight" buttons={buttons}>
            <BarDiv
              className={classNames(
                'w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all duration-700'
              )}
            >
              <SettingFilled width={20} height={20} />
            </BarDiv>
          </Dropdown>
        </NavDiv>
      </aside>
    )
  }
)

export default MenuButton
