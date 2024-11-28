import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './notificationSlice'

const store = configureStore({
  reducer: {
    notification: notificationReducer
  }
})

// Define the RootState type
export type RootState = ReturnType<typeof store.getState>

export default store
