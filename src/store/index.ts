import { configureStore } from '@reduxjs/toolkit'
import botReducer from '@/store/bot'
import logReducer from '@/store/log'
import expansionsReducer from '@/store/expansions'
import commandReducer from '@/store/command'
import modulesReducer from '@/store/modules'
import appReducer from '@/store/app'
const store = configureStore({
  reducer: {
    bot: botReducer,
    log: logReducer,
    expansions: expansionsReducer,
    command: commandReducer,
    modules: modulesReducer,
    app: appReducer
  }
})
export type RootState = ReturnType<typeof store.getState>
export default store
