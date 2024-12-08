import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Async thunk to fetch plants
export const fetchPlants = createAsyncThunk('plants/fetchPlants', async () => {
  const storedPlants = JSON.parse(localStorage.getItem('plants'))
  return storedPlants || []
})

// Async thunk to like a plant
export const likePlant = createAsyncThunk(
  'plants/likePlant',
  async ({ id, navigate }, { getState }) => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (!user) {
      alert('You must be logged in to perform this action')
      navigate('/login')
      return
    }
    console.log('user', user)
    const response = await fetch(
      `http://localhost:5000/api/plants/like?id=${id}`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id }),
        credentials: 'include',
      },
    )
    if (!response.ok) throw new Error('Failed to like the plant.')

    const { plants } = getState()

    // Update localStorage 'plants'
    const updatedPlants = plants.list.map((plant) =>
      plant.id === id ? { ...plant, liked: !plant.liked } : plant,
    )
    localStorage.setItem('plants', JSON.stringify(updatedPlants))

    // Update localStorage 'userWhoLiked'
    let userWhoLiked = JSON.parse(localStorage.getItem('userWhoLiked')) || {}
    if (!userWhoLiked[id]) {
      userWhoLiked[id] = []
    }

    if (updatedPlants.find((plant) => plant.id === id).liked) {
      if (!userWhoLiked[id].includes(user.id)) {
        userWhoLiked[id].push(user.id)
      }
    } else {
      userWhoLiked[id] = userWhoLiked[id].filter((userId) => userId !== user.id)
    }

    localStorage.setItem('userWhoLiked', JSON.stringify(userWhoLiked))
    console.log('user who liked', userWhoLiked)
    return id
  },
)

// Async thunk to add a plant to the cart
export const addToCart = createAsyncThunk(
  'plants/addToCart',
  async ({ plantId, quantity, navigate }, { getState }) => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (!user) {
      alert('You must be logged in to perform this action')
      navigate('/login')
      return
    }

    const formData = JSON.stringify({ plantId, userId: user.id, quantity })
    const response = await fetch('http://localhost:5000/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: formData,
    })

    if (!response.ok) {
      const data = await response.json()
      throw new Error(data.message || 'Failed to add plant to cart.')
    }
  },
)

const plantsSlice = createSlice({
  name: 'plants',
  initialState: { list: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlants.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchPlants.fulfilled, (state, action) => {
        state.loading = false
        state.list = action.payload
      })
      .addCase(fetchPlants.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(likePlant.fulfilled, (state, action) => {
        const id = action.payload
        const plant = state.list.find((p) => p.id === id)
        if (plant) {
          plant.liked = !plant.liked
        }
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.error = action.error.message
      })
  },
})

export default plantsSlice.reducer
