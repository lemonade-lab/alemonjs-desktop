import { configureStore } from '@reduxjs/toolkit'
import botReducer from '@src/store/bot'
import logReducer from '@src/store/log'
const store = configureStore({
  reducer: {
    bot: botReducer,
    log: logReducer
  }
})
export type RootState = ReturnType<typeof store.getState>
export default store
