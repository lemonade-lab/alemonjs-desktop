import React, { useState } from 'react'
import classNames from 'classnames'
import { PrimaryDiv } from './PrimaryDiv'

interface TooltipProps {
  text: string
  children: React.ReactNode
  position?: 'top' | 'bottom' | 'left' | 'right'
  delay?: number
}

export const Tooltip: React.FC<TooltipProps> = ({
  text,
  children,
  position = 'bottom',
  delay = 300
}) => {
  const [visible, setVisible] = useState(false)
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)

  const handleMouseEnter = () => {
    const id = setTimeout(() => setVisible(true), delay)
    setTimeoutId(id)
  }

  const handleMouseLeave = () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    setVisible(false)
  }

  return (
    <div className="relative inline-block cursor-pointer">
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="cursor-pointer"
        aria-describedby="tooltip"
      >
        {children}
      </div>
      {visible && (
        <PrimaryDiv
          className={classNames('absolute text-sm px-3 py-2 rounded-md shadow-lg z-40', {
            'bottom-full left-1/2 transform -translate-x-1/2 mb-2': position === 'top',
            'top-full left-1/2 transform -translate-x-1/2 mt-2': position === 'bottom',
            'right-full top-1/2 transform -translate-y-1/2 mr-2': position === 'left',
            'left-full top-1/2 transform -translate-y-1/2 ml-2': position === 'right'
          })}
          role="tooltip"
        >
          {text}
        </PrimaryDiv>
      )}
    </div>
  )
}
