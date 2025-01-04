import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface State {
  runStatus: boolean
  nodeModulesStatus: boolean
}

const initialState: State = {
  runStatus: false,
  nodeModulesStatus: false
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
    }
  }
})

export const { setStatus } = notificationSlice.actions
export default notificationSlice.reducer
