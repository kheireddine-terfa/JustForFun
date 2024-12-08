import { createSlice } from '@reduxjs/toolkit'

// Load cart data from localStorage
const loadCartFromLocalStorage = () => {
  const cart = localStorage.getItem('cart')
  return cart ? JSON.parse(cart) : []
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: loadCartFromLocalStorage(),
  reducers: {
    // Add item to the cart
    addToCart: (state, action) => {
      const plant = action.payload
      const existingPlant = state.find((item) => item.id === plant.id)
      if (existingPlant) {
        existingPlant.quantity += plant.quantity || 1
      } else {
        state.push({ ...plant, quantity: plant.quantity || 1 })
      }
      localStorage.setItem('cart', JSON.stringify(state)) // Save updated cart to localStorage
    },

    // Remove an item from the cart
    removeFromCart: (state, action) => {
      const updatedCart = state.filter((item) => item.id !== action.payload)
      localStorage.setItem('cart', JSON.stringify(updatedCart)) // Update localStorage
      return updatedCart
    },

    // Clear the entire cart
    clearCart: () => {
      localStorage.removeItem('cart') // Remove cart data from localStorage
      return []
    },

    // Validate the cart (e.g., check if all items are available)
    validateCart: (state, action) => {
      const availableProducts = action.payload // This would be a list of available product IDs
      const validCart = state.filter((item) =>
        availableProducts.includes(item.id),
      )
      localStorage.setItem('cart', JSON.stringify(validCart)) // Save valid cart to localStorage
      return validCart
    },
  },
})

export const {
  addToCart,
  removeFromCart,
  clearCart,
  validateCart,
} = cartSlice.actions
export default cartSlice.reducer
