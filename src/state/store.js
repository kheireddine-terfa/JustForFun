import { configureStore } from '@reduxjs/toolkit'
import plantReducer from './plants/plantsSlice'
import cartReducer from './cart/cartSlice'

export const store = configureStore({
  reducer: {
    plants: plantReducer,
    cart: cartReducer,
  },
})
