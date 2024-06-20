import { configureStore } from '@reduxjs/toolkit'
import userReducer from './store-slices/userSlice'

const store = configureStore({
  reducer: {
    userDetails: userReducer
  },
})

export default store;