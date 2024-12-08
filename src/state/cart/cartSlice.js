import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Async thunk to fetch cart data
export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const userId = user.id
  const response = await fetch(`http://localhost:5000/api/cart?id=${userId}`)
  if (!response.ok) throw new Error('Failed to fetch cart')
  const data = await response.json()
  return data
})

// Async thunk to clear the cart
export const clearCart = createAsyncThunk('cart/clearCart', async () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const userId = user.id
  const response = await fetch(`http://localhost:5000/api/cart?id=${userId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  if (!response.ok) throw new Error('Failed to clear cart')
  return { cartDetails: [], totalPrice: 0, message: '' } // Return cleared cart state
})
// Async thunk for validating the cart and clearing it
export const validateCart = createAsyncThunk('cart/validateCart', async () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const userId = user.id
  const response = await fetch(
    `http://localhost:5000/api/cart/validate?id=${userId}`,
    {
      method: 'POST',
    },
  )
  if (!response.ok) throw new Error('Cart validation failed')

  // Optionally, you can return a confirmation message or any other data
  alert('cart validated successfully')
  return { cartDetails: [], totalPrice: 0, message: '' } // Return cleared cart state
})
// Slice definition
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: {
      cartDetails: [],
      totalPrice: 0,
      message: '',
    }, // Cart data
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        if (state.cart !== action.payload) {
          state.cart = action.payload // Only update if the cart has changed
        }
        state.loading = false
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(clearCart.fulfilled, (state, action) => {
        state.cart = action.payload // Set cleared cart state
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.error = action.error.message
      })
      .addCase(validateCart.fulfilled, (state, action) => {
        state.cart = action.payload
      })
      .addCase(validateCart.rejected, (state, action) => {
        state.error = action.error.message
      })
  },
})

// Export actions and reducer
export default cartSlice.reducer
