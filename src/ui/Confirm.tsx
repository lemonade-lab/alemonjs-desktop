import { PropsWithChildren } from 'react'
import Button from '@src/ui/Button'

type ConfirmProps = {
  onClickCancel: () => void
  onClickSuccess: () => void
  title: string
}

/**
 * @param param0
 * @returns
 */
const Confirm = ({
  onClickCancel,
  onClickSuccess,
  title,
  children
}: PropsWithChildren<ConfirmProps>) => {
  return (
    <div className="px-4 py-2 dark:text-white  flex flex-col gap-4 min-w-36">
      <div className="text-xl ">{title}</div>
      {children}
      <div className="flex gap-4 justify-between">
        <Button onClick={onClickCancel}>取消</Button>
        <Button typing="error" onClick={onClickSuccess}>
          确认
        </Button>
      </div>
    </div>
  )
}

//
export default Confirm
