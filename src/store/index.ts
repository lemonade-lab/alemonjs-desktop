import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from '@src/store/notificationSlice'
import botReducer from '@src/store/bot'
const store = configureStore({
  reducer: {
    notification: notificationReducer,
    bot: botReducer
  }
})
export type RootState = ReturnType<typeof store.getState>
export default store
