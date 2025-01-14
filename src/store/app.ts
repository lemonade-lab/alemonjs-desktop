import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface State {
  resourcesPath: string
  templatePath: string
  nodeModulesPath: string
  corePath: string
}

const initialState: State = {
  resourcesPath: '',
  templatePath: '',
  nodeModulesPath: '',
  corePath: ''
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setPath(state, action: PayloadAction<State>) {
      state.resourcesPath = action.payload.resourcesPath
      state.templatePath = action.payload.templatePath
      state.nodeModulesPath = action.payload.nodeModulesPath
      state.corePath = action.payload.corePath
    }
  }
})

export const { setPath } = notificationSlice.actions
export default notificationSlice.reducer
