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
  isRefreshing: boolean;
  authLoading: boolean;
  authError: string | null;
}

const getUserFromLocalStorage = (): User | null => {
  const user = localStorage.getItem("user")
  if(!user) return null
  return JSON.parse(user)
}

const initialState: AuthState = {
  currentUser: getUserFromLocalStorage(),
  isRefreshing: false,
  authLoading: false,
  authError: null,
};

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
    setCurrentUser: (state, action: PayloadAction<User>) => {
      const user = action.payload
      state.currentUser = user
      state.authLoading = false
      localStorage.setItem('user', JSON.stringify(user))
    },
    clearUser: (state) => {
      state.currentUser = null
      localStorage.removeItem('user')
    },
    setAuthLoading: (state, action: PayloadAction<boolean>) => {
      state.authLoading = action.payload
    },
    setAuthError: (state, action: PayloadAction<string | null>) => {
      state.authError = action.payload
    },
  },
})

export const {
  startRefresh,
  endRefresh,
  setCurrentUser,
  clearUser,
  setAuthLoading,
  setAuthError,
} = authSlice.actions

export default authSlice.reducer