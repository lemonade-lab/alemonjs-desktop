import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface State {
  runStatus: boolean
  runAt: number
}

const initialState: State = {
  runStatus: false,
  runAt: 0
}

const notificationSlice = createSlice({
  name: 'bot',
  initialState,
  reducers: {
    setBotStatus(
      state,
      action: PayloadAction<{
        runStatus?: boolean
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
    },
    /**
     * 设置启动时间
     * @param state
     * @param action
     */
    setBotRunAt(state, action: PayloadAction<number>) {
      state.runAt = action.payload
    }
  }
})

export const { setBotStatus, setBotRunAt } = notificationSlice.actions
export default notificationSlice.reducer
