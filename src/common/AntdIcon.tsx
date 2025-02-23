import * as icons from '@ant-design/icons'
import React from 'react'
type IconType = keyof typeof icons
// 去掉 非非图标的key
type IconTypeExclude = Exclude<
  IconType,
  'default' | 'getTwoToneColor' | 'setTwoToneColor' | 'createFromIconfontCN' | 'IconProvider'
>
const NotIconKey = [
  'default',
  'getTwoToneColor',
  'setTwoToneColor',
  'createFromIconfontCN',
  'IconProvider'
]

export const AntdIcon = (props: {
  defaultIcon: React.ReactNode
  icon: string
  className: string
}) => {
  const { icon, defaultIcon } = props as {
    icon: IconTypeExclude
    defaultIcon: string | React.ReactNode
  }
  if (!NotIconKey.includes(icon) && icons[icon]) {
    const Icon = icons[icon]
    return <Icon className={props?.className} />
  }
  if (typeof defaultIcon === 'string') {
    return <span>{defaultIcon}</span>
  } else {
    return defaultIcon
  }
}
