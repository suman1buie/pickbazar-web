import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {
      name:'',
      email:'',
      isLoggedIn: false,
    },
  },
  reducers: {
    setUserData: (state, action) => {
      state.user = action.payload
      state.user.isLoggedIn = true
    },
  },
})

export const { setUserData } = userSlice.actions

export default userSlice.reducer