import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type User = {
  user: {
    fullName: string;
    userId: string;
    email: string;
  }
}

type AuthState = {
  currentUser: User | null;
  accessToken: string | null;
  isRefreshing: boolean;
}

const initialState: AuthState = {
  currentUser: null,
  accessToken: null,
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
    setAuthData(state, action: PayloadAction<{ user: User; accessToken: string }>) {
      state.currentUser = action.payload.user
      state.accessToken = action.payload.accessToken
    },
    clearAuthData(state) {
      state.currentUser = null
      state.accessToken = null
    },
  },
})

export const { startRefresh, endRefresh, setAuthData, clearAuthData } = authSlice.actions

export default authSlice.reducer