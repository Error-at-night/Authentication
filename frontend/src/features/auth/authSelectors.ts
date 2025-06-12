import type { RootState } from '../../store/store';

export const selectCurrentUser = (state: RootState) => state.auth.currentUser
export const selectIsRefreshing = (state: RootState) => state.auth.isRefreshing
export const selectAuthLoading = (state: RootState) => state.auth.authLoading
export const selectAuthError = (state: RootState) => state.auth.authError
