import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface State {
  runStatus: boolean
  runAt: number
  package: {
    [key: string]: any
    name: string
  }[]
}

const initialState: State = {
  runStatus: false,
  runAt: 0,
  package: []
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setExpansionsStatus(
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
    setExpansionsRunAt(state, action: PayloadAction<number>) {
      state.runAt = action.payload
    },

    initPackage(state, action: PayloadAction<any[]>) {
      state.package = action.payload
    },
    addPackage(state, action: PayloadAction<any>) {
      state.package.push(action.payload)
    },
    delPackage(state, action: PayloadAction<string>) {
      const index = state.package.findIndex(item => item.name === action.payload)
      if (index !== -1) state.package.splice(index, 1)
    }
  }
})

export const { initPackage, addPackage, delPackage, setExpansionsStatus, setExpansionsRunAt } =
  notificationSlice.actions
export default notificationSlice.reducer
