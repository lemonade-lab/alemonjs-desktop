import { configureStore } from '@reduxjs/toolkit'
import botReducer from '@src/store/bot'
import logReducer from '@src/store/log'
import expansionsReducer from '@src/store/expansions'
import commandReducer from '@src/store/command'
import modulesReducer from '@src/store/modules'
const store = configureStore({
  reducer: {
    bot: botReducer,
    log: logReducer,
    expansions: expansionsReducer,
    command: commandReducer,
    modules: modulesReducer
  }
})
export type RootState = ReturnType<typeof store.getState>
export default store
