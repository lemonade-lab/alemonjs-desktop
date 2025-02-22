import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface State {
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
  name: 'app',
  initialState,
  reducers: {
    setPath(state, action: PayloadAction<State>) {
      for (const key in action.payload) {
        const KEY = key as keyof State
        state[KEY] = action.payload[KEY]
      }
    }
  }
})

export const { setPath } = notificationSlice.actions
export default notificationSlice.reducer
