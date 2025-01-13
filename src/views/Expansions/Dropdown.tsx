import React, { useState, useRef } from 'react'

const Dropdown = ({
  options,
  onChangeOption
}: {
  options: string[]
  onChangeOption: (value: string) => void
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement | null>(null)
  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }
  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as any)) {
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
    <div className="relative inline-block z-10" ref={dropdownRef}>
      <button onClick={toggleDropdown} className="flex items-center px-2 justify-center">
        ...
      </button>
      {isOpen && (
        <ul className="absolute bg-white bg-opacity-90 right-0 w-20 mt-2 border rounded-md shadow-md">
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => {
                setIsOpen(false)
                onChangeOption(option)
              }}
              className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Dropdown
