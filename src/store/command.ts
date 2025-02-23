import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface State {
  name: string
  // 类型
  data: [
    {
      // 命令
      command: string
      // 是否是给主进程发送的
      isMainProcess: boolean
    }
  ]
}

// 初始状态
const initialState: State = {
  name: '',
  data: [
    {
      command: 'open.devTools',
      isMainProcess: true
    }
  ]
}

const notificationSlice = createSlice({
  name: 'command',
  initialState,
  reducers: {
    setCommand(state, action: PayloadAction<string>) {
      state.name = action.payload
    }
  }
})

export const { setCommand } = notificationSlice.actions
export default notificationSlice.reducer
