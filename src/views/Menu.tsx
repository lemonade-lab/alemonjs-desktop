import { NavigatePath } from '@/hook/useGoNavigate'
import { BarDiv } from '@alemonjs/react-ui'
import { NavDiv } from '@alemonjs/react-ui'
import classNames from 'classnames'
import {
  AppstoreFilled,
  HomeFilled,
  RobotFilled,
  SettingFilled,
  ShoppingFilled
} from '@ant-design/icons'
import { Dropdown } from '@alemonjs/react-ui'
import { setCommand } from '@/store/command'
import { useDispatch } from 'react-redux'
const MenuButton = () => {
  const dispatch = useDispatch()
  // 导航列表
  const navList: {
    Icon: React.ReactNode
    path: NavigatePath
    className: string
    onClick: (path: NavigatePath) => void
  }[] = [
    {
      Icon: <RobotFilled size={20} />,
      path: '/bot-log',
      className: 'steps-5',
      onClick: path => {
        dispatch(setCommand(`view.${path}`))
      }
    },
    {
      Icon: <ShoppingFilled size={20} />,
      path: '/expansions',
      className: 'steps-6',
      onClick: path => {
        dispatch(setCommand(`view.${path}`))
      }
    },
    {
      Icon: <AppstoreFilled size={20} />,
      path: '/application',
      className: 'steps-7',
      onClick: path => {
        dispatch(setCommand(`view.${path}`))
      }
    }
  ]

  // 按钮列表
  const buttons = [
    {
      children: '通用',
      onClick: () => {
        const path = '/common'
        dispatch(setCommand(`view.${path}`))
      }
    },
    {
      children: '主题',
      onClick: () => {
        // navigate('/theme')
        const path = '/theme'
        dispatch(setCommand(`view.${path}`))
      }
    },
    {
      children: '记录',
      onClick: () => {
        // navigate('/log')
        const path = '/log'
        dispatch(setCommand(`view.${path}`))
      }
    },
    {
      children: '仓库',
      onClick: () => {
        // navigate('/git-expansions')
        const path = '/git-expansions'
        dispatch(setCommand(`view.${path}`))
      }
    },
    {
      children: '模板',
      onClick: () => {
        // navigate('/template')
        const path = '/template'
        dispatch(setCommand(`view.${path}`))
      }
    },
    {
      children: '关于',
      onClick: () => {
        // navigate('/about')
        const path = '/about'
        dispatch(setCommand(`view.${path}`))
      }
    }
  ]
  const goHome = () => {
    const path = '/'
    dispatch(setCommand(`view.${path}`))
  }
  return (
    <aside className={classNames('flex flex-col justify-between items-center px-1 py-4')}>
      <NavDiv className="p-1 flex-col rounded-full flex gap-4">
        <BarDiv
          className={classNames(
            'steps-4 size-8 rounded-full flex items-center justify-center cursor-pointer transition-all duration-700'
          )}
          onClick={goHome}
        >
          <HomeFilled size={20} />
        </BarDiv>
      </NavDiv>
      <NavDiv className="px-1 py-4 flex-col  rounded-full flex gap-4">
        {navList.map((item, index) => (
          <BarDiv
            key={item.path}
            className={classNames(
              'size-8 rounded-full flex items-center justify-center cursor-pointer transition-all duration-700',
              item.className
            )}
            onClick={() => item.onClick(item.path)}
          >
            <div>{item.Icon}</div>
          </BarDiv>
        ))}
      </NavDiv>
      <NavDiv className="p-1 flex-col  rounded-full flex gap-3">
        <Dropdown placement="topRight" buttons={buttons}>
          <BarDiv
            className={classNames(
              'steps-4 size-8 rounded-full  flex items-center justify-center cursor-pointer transition-all duration-700'
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
