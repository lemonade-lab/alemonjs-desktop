import { CloseIcon } from '@src/common/Icons'
import { RootState } from '@src/store'
import { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'

export default function WordBox() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  // 点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current) {
        const target = event.target as HTMLElement
        if (!dropdownRef.current?.contains(target)) {
          setIsDropdownOpen(false)
        }
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

  const [conmond, setCommond] = useState<
    { expansions_name: string; name: string; commond: string }[]
  >([])

  const expansions = useSelector((state: RootState) => state.expansions)

  useEffect(() => {
    const commondItem =
      expansions.package?.flatMap((item: any) => {
        return (
          item.alemonjs?.desktop?.commond?.map((sidebar: any) => ({
            ...sidebar,
            expansions_name: item.name
          })) || []
        )
      }) || []
    setCommond(commondItem)
  }, [expansions.package])

  return (
    <div className="select-none flex-1  flex justify-between items-center">
      {isDropdownOpen ? (
        <div
          ref={dropdownRef}
          className="absolute top-0 p-1 left-1/2 transform -translate-x-1/2 bg-[var(--secondary-bg-front)] border-slate-300 bg-opacity-95 rounded-md  shadow-md z-10"
        >
          <input
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            placeholder="input command ..."
            className="border rounded-md min-w-72 px-2 py-1"
            aria-label="Command Input"
          />
          <div className="py-1 flex flex-col gap-2 ">
            {conmond.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  // setInputValue(item.commond)
                  // setIsDropdownOpen(false)
                }}
                className="flex text-slate-600 justify-between px-2 py-1 cursor-pointer hover:bg-gray-300 hover:bg-opacity-80 rounded-md"
              >
                <div>{item.name}</div>
                <div className="text-slate-400">{item.commond}</div>
              </div>
            ))}
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
            className="w-72 relative text-sm text-slate-400 cursor-pointer border flex justify-center items-center   h-5 rounded-md bg-[var(--primary-bg-front)]"
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
