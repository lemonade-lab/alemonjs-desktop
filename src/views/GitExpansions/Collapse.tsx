import { useState } from 'react'

const CollapseItem = ({
  label,
  children,
  isOpen,
  onClick
}: {
  label: string
  children: React.ReactNode
  isOpen: boolean
  onClick: () => void
}) => (
  <div className="border-b">
    <div className="flex  justify-between">
      <button className="w-full text-left py-1 text-sm" onClick={onClick}>
        {label}
      </button>
      <div className="text-sm">del</div>
    </div>
    {isOpen && <div>{children}</div>}
  </div>
)

export const Collapse = ({
  items
}: {
  items: {
    key: string
    label: string
    children: React.ReactNode
  }[]
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const handleClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="">
      {items.map((item, index) => (
        <CollapseItem
          key={item.key}
          label={item.label}
          isOpen={openIndex === index}
          onClick={() => handleClick(index)}
        >
          {item.children}
        </CollapseItem>
      ))}
    </div>
  )
}
