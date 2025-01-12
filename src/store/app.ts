import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface State {
  path: string
}

const initialState: State = {
  path: ''
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setPath(state, action: PayloadAction<string>) {
      state.path = action.payload
    }
  }
})

export const { setPath } = notificationSlice.actions
export default notificationSlice.reducer
