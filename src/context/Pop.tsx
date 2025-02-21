import { Button } from '@src/component/Button'
import { Modal } from '@src/component/Modal'
import { createContext, useState, ReactNode, useContext } from 'react'

type DataType = {
  open: boolean
  title: string
  description: string
  buttonText: string
  data: any
  code?: number
  onConfirm?: () => void
}

// 创建上下文类型
type PopContextType = {
  setPopValue: (val: DataType) => void
  closePop: () => void
}
// 创建上下文并提供默认值
const PopContext = createContext<PopContextType | undefined>(undefined)
export { PopContext }
export default function PopProvider({ children }: { children: ReactNode }) {
  const [modalData, setModalData] = useState<DataType>({
    open: false,
    title: '',
    description: '',
    buttonText: '',
    data: {},
    code: 0,
    onConfirm: () => {}
  })
  // 关闭 modal
  const closePop = () =>
    setModalData({
      open: false,
      title: '',
      description: '',
      buttonText: '',
      data: {},
      code: 0,
      onConfirm: () => {}
    })
  // 设置modal
  const setPopValue = (val: DataType) => {
    setModalData(val)
  }
  const onModal = async () => {
    if (!modalData.code) {
      if (modalData?.onConfirm) {
        await modalData.onConfirm()
        // 关闭modal
        closePop()
      }
      return
    }
    // 点击按钮后的操作
    const T = await window.controller.onClick(modalData.code, modalData.data)
    if (T) {
      // 关闭modal
      closePop()
    }
  }
  return (
    <PopContext.Provider value={{ setPopValue: setPopValue, closePop }}>
      {children}
      <Modal isOpen={modalData.open} onClose={closePop}>
        <h2 className="text-xl mb-4">{modalData.title}</h2>
        <p>{modalData.description}</p>
        <div className="flex justify-end">
          <Button onClick={onModal} className="mt-4 px-4 py-2   rounded ">
            {modalData.buttonText}
          </Button>
        </div>
      </Modal>
    </PopContext.Provider>
  )
}

export const usePop = () => {
  const context = useContext(PopContext)
  if (!context) {
    throw new Error('usePop must be used within a PopProvider')
  }
  return context
}
