import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface State {
  runStatus: boolean
  nodeModulesStatus: boolean
  runAt: number
}

const initialState: State = {
  runStatus: false,
  nodeModulesStatus: false,
  runAt: 0
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setStatus(
      state,
      action: PayloadAction<{
        runStatus?: boolean
        nodeModulesStatus?: boolean
      }>
    ) {
      if ('runStatus' in action.payload) {
        if (
          typeof action.payload.runStatus == 'boolean' &&
          action.payload.runStatus != state.runStatus
        ) {
          state.runStatus = action.payload.runStatus
        }
      }
      if ('nodeModulesStatus' in action.payload) {
        if (
          typeof action.payload.nodeModulesStatus == 'boolean' &&
          action.payload.nodeModulesStatus != state.nodeModulesStatus
        ) {
          state.nodeModulesStatus = action.payload.nodeModulesStatus
        }
      }
    },
    /**
     * 设置启动时间
     * @param state
     * @param action
     */
    setRunAt(state, action: PayloadAction<number>) {
      state.runAt = action.payload
    }
  }
})

export const { setStatus, setRunAt } = notificationSlice.actions
export default notificationSlice.reducer
