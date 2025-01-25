import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Package {
  name: string
  [key: string]: any
}

interface State {
  runStatus: boolean
  runAt: number
  package: Package[]
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
    /**
     *
     * @param state
     * @param action
     */
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
    /**
     *
     * @param state
     * @param action
     */
    initPackage(state, action: PayloadAction<any[]>) {
      state.package = action.payload
    },
    /**
     *
     * @param state
     * @param action
     */
    addPackage(state, action: PayloadAction<Package>) {
      const item = state.package.find(item => item.name === action.payload.name)
      if (!item) {
        state.package.push(action.payload)
      } else {
        state.package = state.package.map(item => {
          if (item.name === action.payload.name) {
            return {
              ...item,
              ...action.payload
            }
          }
          return item
        })
      }
    },
    /**
     *
     * @param state
     * @param action
     */
    putPackage(state, action: PayloadAction<Package>) {
      const index = state.package.findIndex(item => item.name == action.payload.name)
      if (index !== -1) {
        state.package[index] = {
          ...state.package[index],
          ...action.payload
        }
      }
    },
    /**
     *
     * @param state
     * @param action
     */
    delPackage(state, action: PayloadAction<string>) {
      const index = state.package.findIndex(item => item.name === action.payload)
      if (index !== -1) state.package.splice(index, 1)
    }
  }
})

export const {
  initPackage,
  addPackage,
  delPackage,
  putPackage,
  setExpansionsStatus,
  setExpansionsRunAt
} = notificationSlice.actions
export default notificationSlice.reducer
