import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface State {
  nodeModulesStatus: boolean
}

const initialState: State = {
  nodeModulesStatus: false
}

const notificationSlice = createSlice({
  name: 'modules',
  initialState,
  reducers: {
    setModulesStatus(
      state,
      action: PayloadAction<{
        runStatus?: boolean
        nodeModulesStatus?: boolean
      }>
    ) {
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

export const { setModulesStatus } = notificationSlice.actions
export default notificationSlice.reducer
