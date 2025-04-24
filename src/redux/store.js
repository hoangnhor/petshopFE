import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slides/counterSlide'
import userReducer from './slides/userSlider'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer
  },
})