import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface State {
  rolu: 'post' | 'del'
  message: string[]
}

const initialState: State = {
  rolu: 'post',
  message: []
}

const notificationSlice = createSlice({
  name: 'log',
  initialState,
  reducers: {
    postMessage(state, action: PayloadAction<string>) {
      state.rolu = 'post'
      state.message.push(action.payload)
    },
    delMessate(state, action: PayloadAction<number>) {
      const start = state.message.length - action.payload + 1
      state.rolu = 'del'
      state.message.splice(start < 0 ? 0 : start, action.payload)
    }
  }
})

export const { postMessage, delMessate } = notificationSlice.actions
export default notificationSlice.reducer
