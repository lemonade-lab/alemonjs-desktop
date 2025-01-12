import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { init } from 'echarts'

interface State {
  package: {
    [key: string]: any
    name: string
  }[]
}

const initialState: State = {
  package: []
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
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

export const { initPackage, addPackage, delPackage } = notificationSlice.actions
export default notificationSlice.reducer
