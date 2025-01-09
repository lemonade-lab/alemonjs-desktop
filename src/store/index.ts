import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from '@src/store/notificationSlice'
import botReducer from '@src/store/bot'
import logReducer from '@src/store/log'
const store = configureStore({
  reducer: {
    notification: notificationReducer,
    bot: botReducer,
    log: logReducer
  }
})
export type RootState = ReturnType<typeof store.getState>
export default store
