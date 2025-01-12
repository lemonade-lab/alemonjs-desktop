import { CloseIcon } from '@src/common/Icons'
import { useState, useRef, useEffect } from 'react'

export default function WordBox() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const dropdownRef = useRef(null)

  // 点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // 公共样式常量

  const onClose = () => {
    setIsDropdownOpen(false)
  }

  return (
    <div className="flex-1 flex justify-between items-center">
      {isDropdownOpen ? (
        <div
          ref={dropdownRef}
          className="absolute top-0 p-1 left-1/2 transform -translate-x-1/2 bg-white  border-slate-300 rounded-md  shadow-md z-10"
        >
          <input
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            placeholder="input command 。。。"
            className="border rounded-md min-w-72 px-2 py-1"
            aria-label="Command Input"
          />
          <div className="py-1 flex flex-col gap-2">
            <div className="flex text-slate-600 justify-between px-2 py-1 cursor-pointer hover:bg-slate-100 rounded-md">
              <div>打开redis侧边栏</div>
              <div className="text-slate-400">redis.open</div>
            </div>
            <div className="flex text-slate-600 justify-between px-2 py-1 cursor-pointer hover:bg-slate-100 rounded-md">
              <div>打开redis侧边栏</div>
              <div className="text-slate-400">redis.open</div>
            </div>
            <div className="flex text-slate-600 justify-between px-2 py-1 cursor-pointer hover:bg-slate-100 rounded-md">
              <div>打开redis侧边栏</div>
              <div className="text-slate-400">redis.open</div>
            </div>
          </div>
          <div className="flex justify-end">
            <span
              onClick={onClose}
              className="text-[var(--notification-text)] hover:text-[--primary-color] cursor-pointer"
            >
              <CloseIcon />
            </span>
          </div>
        </div>
      ) : (
        <>
          <div className="drag-area flex-1"></div>
          <div
            ref={dropdownRef}
            className="w-72 relative text-sm text-slate-400 cursor-pointer border flex justify-center items-center border-slate-400 h-5 rounded-md bg-[var(--primary-bg-front)]"
            onClick={() => setIsDropdownOpen(prev => !prev)}
            aria-expanded={isDropdownOpen}
            role="button"
          >
            <span className="">input command</span>
          </div>
          <div className="drag-area flex-1"></div>
        </>
      )}
    </div>
  )
}
