import { createSlice } from '@reduxjs/toolkit'

// Load plants from localStorage
const loadPlantsFromLocalStorage = () => {
  const plants = localStorage.getItem('plants')
  return plants ? JSON.parse(plants) : []
}

const plantsSlice = createSlice({
  name: 'plants',
  initialState: {
    plants: loadPlantsFromLocalStorage(),
    loading: false,
    error: null,
  },
  reducers: {
    setPlants: (state, action) => {
      state.plants = action.payload
      localStorage.setItem('plants', JSON.stringify(state.plants))
    },
  },
})

export const { setPlants } = plantsSlice.actions
export default plantsSlice.reducer
