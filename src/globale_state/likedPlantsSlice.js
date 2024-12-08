import { createSlice } from '@reduxjs/toolkit'

const likedPlantsSlice = createSlice({
  name: 'likedPlants',
  initialState: [], // Array of plant IDs that are liked
  reducers: {
    likePlant: (state, action) => {
      const plantId = action.payload
      if (!state.includes(plantId)) {
        state.push(plantId)
      }
    },
    unlikePlant: (state, action) => {
      const plantId = action.payload
      return state.filter((id) => id !== plantId)
    },
  },
})

export const { likePlant, unlikePlant } = likedPlantsSlice.actions
export default likedPlantsSlice.reducer
