import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface State {
  name: string
}

const initialState: State = {
  name: ''
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setCommand(state, action: PayloadAction<string>) {
      state.name = action.payload
    }
  }
})

export const { setCommand } = notificationSlice.actions
export default notificationSlice.reducer
