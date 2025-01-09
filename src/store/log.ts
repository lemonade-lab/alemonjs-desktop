import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface State {
  message: string[]
}

const initialState: State = {
  message: []
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    postMessage(state, action: PayloadAction<string>) {
      state.message.push(action.payload)
    }
  }
})

export const { postMessage } = notificationSlice.actions
export default notificationSlice.reducer
