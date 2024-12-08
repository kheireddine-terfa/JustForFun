import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'users',
  initialState: {}, // { userId: [likedPlantIds] }
  reducers: {
    likePlantForUser: (state, action) => {
      const { userId, plantId } = action.payload
      if (!state[userId]) state[userId] = []
      if (!state[userId].includes(plantId)) {
        state[userId].push(plantId)
      }
    },
    unlikePlantForUser: (state, action) => {
      const { userId, plantId } = action.payload
      if (state[userId]) {
        state[userId] = state[userId].filter((id) => id !== plantId)
      }
    },
  },
})

export const { likePlantForUser, unlikePlantForUser } = userSlice.actions
export default userSlice.reducer
