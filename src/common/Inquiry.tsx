import { PropsWithChildren, useEffect, useState } from 'react'
import { useNotification } from '@/context/Notification'
import { Button } from '@alemonjs/react-ui'

type InquiryProps = {
  onClickCancel: () => void
  onClickSuccess: () => void
  title: string
}

/**
 * @param param0
 * @returns
 */
const Inquiry = ({
  onClickCancel,
  onClickSuccess,
  title,
  children
}: PropsWithChildren<InquiryProps>) => {
  const notification = useNotification()
  // 9s  -->  6s
  const [timing, setTiming] = useState(3)
  useEffect(() => {
    if (timing <= 0) return
    const timer = setTimeout(() => setTiming(prev => prev - 1), 1000)
    return () => clearTimeout(timer)
  }, [timing])
  return (
    <div className="px-4 py-2   dark:text-white  flex flex-col gap-4 min-w-36">
      <div className="text-xl ">
        {title} {timing != 0 && <span className="dark:text-red-500">({timing}s)</span>}
      </div>
      {children}
      <div className="flex gap-4 justify-between">
        <Button
          onClick={() => {
            setTiming(0)
            onClickCancel()
          }}
        >
          取消
        </Button>
        <Button
          onClick={() => {
            if (timing > 0) {
              notification('请等待冷却', 'warning')
            } else {
              onClickSuccess && onClickSuccess()
            }
          }}
        >
          确认
        </Button>
      </div>
    </div>
  )
}

//
export default Inquiry
