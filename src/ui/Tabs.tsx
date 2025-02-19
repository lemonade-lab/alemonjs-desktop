import { classNameBorder as classNameBorderPrimaryDiv } from '@src/ui/PrimaryDiv'
import { TagDiv } from '@src/ui/TagDiv'
import classNames from 'classnames'
import { useState } from 'react'
export const Tabs = ({
  items
}: {
  items: {
    key: string
    label: string | React.ReactNode
    children: React.ReactNode
  }[]
}) => {
  const [activeTab, setActiveTab] = useState(items[0].key)
  return (
    <div>
      <div className={classNames('border-b flex ', classNameBorderPrimaryDiv)}>
        {items.map(item => (
          <TagDiv
            key={item.key}
            className={classNames(`px-2 py-1 text-sm  cursor-pointer`, {
              ' hover': activeTab === item.key
            })}
            onClick={() => setActiveTab(item.key)}
          >
            {item.label}
          </TagDiv>
        ))}
      </div>
      <div>{items.find(item => item.key === activeTab)?.children}</div>
    </div>
  )
}
