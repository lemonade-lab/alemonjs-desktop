import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface State {
  [key: string]: string
  userDataTemplatePath: string
  userDataNodeModulesPath: string
  userDataPackagePath: string
  preloadPath: string
  logMainPath: string
}

const initialState: State = {
  userDataTemplatePath: '',
  userDataNodeModulesPath: '',
  userDataPackagePath: '',
  preloadPath: '',
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
