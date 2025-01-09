import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface State {
  message: string
  visible: boolean
}

const initialState: State = {
  message: '',
  visible: false
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(state, action: PayloadAction<string>) {
      state.message = action.payload
      state.visible = true
    },
    hideNotification(state) {
      state.visible = false
    }
  }
})

export const { showNotification, hideNotification } = notificationSlice.actions
export default notificationSlice.reducer
