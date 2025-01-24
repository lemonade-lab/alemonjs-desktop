import { MenuMoreIcon } from '@src/common/Icons'
import { SecondaryDiv } from '@src/ui/Div'
import React, { useState, useRef, memo } from 'react'

interface DropdownProps<T> {
  options: T[]
  onChangeOption: (value: T) => void
  Icon: React.ReactNode
}

const Dropdown = memo(<T extends string>({ options, onChangeOption, Icon }: DropdownProps<T>) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  const toggleDropdown = () => {
    // 禁止冒泡
    setIsOpen(prev => !prev)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false)
    }
  }

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="relative inline-block " ref={dropdownRef}>
      <button
        onClick={e => {
          e.stopPropagation()
          toggleDropdown()
        }}
        className="flex items-center px-2 justify-center"
      >
        {Icon}
      </button>
      {isOpen && (
        <SecondaryDiv className="absolute  z-10 bg-opacity-90 right-0 w-20 mt-2 border rounded-md shadow-md">
          <ul>
            {options.map((option, index) => (
              <li
                key={index}
                onClick={e => {
                  e.stopPropagation()
                  setIsOpen(false)
                  onChangeOption(option)
                }}
                className="px-2 py-1 duration-700 transition-all cursor-pointer"
              >
                {option}
              </li>
            ))}
          </ul>
        </SecondaryDiv>
      )}
    </div>
  )
})

export default Dropdown
