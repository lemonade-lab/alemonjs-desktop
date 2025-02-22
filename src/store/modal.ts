import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface State {
  open: boolean
  title: string
  description: string
  buttonText: string
  data: any
  code: number
}

const initialState: State = {
  open: false,
  title: '',
  description: '',
  buttonText: '',
  data: null,
  code: 0
}

const notificationSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModalData(state, action: PayloadAction<State>) {
      state.open = action.payload.open
      state.title = action.payload.title
      state.description = action.payload.description
      state.buttonText = action.payload.buttonText
      state.data = action.payload.data
      state.code = action.payload.code
    }
  }
})

export const { setModalData } = notificationSlice.actions
export default notificationSlice.reducer
