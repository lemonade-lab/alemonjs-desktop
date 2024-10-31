import { configureStore, combineReducers } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
const reducers = combineReducers({
  // login:
})
const persistConfig = {
  key: 'alemonjs',
  storage,
  blacklist: ['update']
}
const persistedReducer = persistReducer(persistConfig, reducers)
// Store
export const store = configureStore({
  reducer: persistedReducer
})
