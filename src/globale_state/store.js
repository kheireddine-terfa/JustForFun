import { configureStore } from '@reduxjs/toolkit'
import likedPlantsReducer from './likedPlantsSlice'
import cartReducer from './cartSlice'
import plantsReducer from './plantsSlice'
import userReducer from './userSlice'

const store = configureStore({
  reducer: {
    likedPlants: likedPlantsReducer,
    cart: cartReducer,
    plants: plantsReducer,
    users: userReducer,
  },
})

export default store
