import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface State {
  [key: string]: string
  resourcesPath: string
  templatePath: string
  nodeModulesPath: string
  corePath: string
  logMainPath: string
}

const initialState: State = {
  resourcesPath: '',
  templatePath: '',
  nodeModulesPath: '',
  corePath: '',
  logMainPath: ''
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setPath(state, action: PayloadAction<State>) {
      for (const key in action.payload) {
        state[key] = action.payload[key]
      }
    }
  }
})

export const { setPath } = notificationSlice.actions
export default notificationSlice.reducer
