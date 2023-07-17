import { configureStore } from '@reduxjs/toolkit'
import SliceAuth from './redux/S_auth';
import SliceGoals from './redux/S_Goals'
export const store = configureStore({
  reducer: { SliceAuth , SliceGoals },
  devTools:true
})
