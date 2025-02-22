import { HomeIcon, PizzaIcon } from '@src/component/MenuIcons'
import useGoNavigate, { NavigatePath } from '@src/hook/useGoNavigate'
import { BarDiv } from '@src/component/BarDiv'
import { NavDiv } from '@src/component/NavDiv'
import classNames from 'classnames'
import { AppstoreFilled, RobotFilled, SettingFilled } from '@ant-design/icons'
import Dropdown from '@src/component/Dropdown'
const MenuButton = () => {
  const navigate = useGoNavigate()

  // 导航列表
  const navList: {
    Icon: React.ReactNode
    path: NavigatePath
    className: string
    onClick: (path: NavigatePath) => void
  }[] = [
    {
      Icon: <RobotFilled width={20} height={20} />,
      path: '/bot-log',
      className: 'steps-5',
      onClick: path => navigate(path)
    },
    {
      Icon: <PizzaIcon width="20" height="20" />,
      path: '/expansions',
      className: 'steps-6',
      onClick: path => navigate(path)
    },
    {
      Icon: <AppstoreFilled size={20} />,
      path: '/application',
      className: 'steps-7',
      onClick: path => navigate(path)
    }
  ]

  // 按钮列表
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
    <aside className={classNames('flex flex-col justify-between items-center px-1 py-4')}>
      <NavDiv className="p-1 flex-col rounded-full flex gap-4">
        <BarDiv
          className={classNames(
            'steps-4 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all duration-700'
          )}
          onClick={() => navigate('/')}
        >
          <HomeIcon width="20" height="20" />
        </BarDiv>
      </NavDiv>
      <NavDiv className="px-1 py-8 flex-col  rounded-full flex gap-4">
        {navList.map((item, index) => (
          <BarDiv
            key={item.path}
            className={classNames(
              'w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all duration-700',
              item.className
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
              'steps-8 w-10 h-10 rounded-full  flex items-center justify-center cursor-pointer transition-all duration-700'
            )}
          >
            <SettingFilled width={20} height={20} />
          </BarDiv>
        </Dropdown>
      </NavDiv>
    </aside>
  )
}

export default MenuButton
