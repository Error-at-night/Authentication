import { createSlice } from '@reduxjs/toolkit';


type AuthState = {
  isRefreshing: boolean;
}

const initialState: AuthState = {
  isRefreshing: false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    startRefresh: (state) => {
      state.isRefreshing = true
    },
    endRefresh: (state) => {
      state.isRefreshing = false
    },
  },
})

export const { startRefresh, endRefresh } = authSlice.actions

export default authSlice.reducer