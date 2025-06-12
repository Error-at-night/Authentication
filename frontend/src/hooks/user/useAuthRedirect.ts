import { useNavigate } from "react-router-dom"
import { useGetCurrentUser } from "./useGetCurrentUser"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from '../../store/store';
import { setAuthError, setCurrentUser } from "../../features/auth/authSlice";

export function useAuthRedirect() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { currentUser, isPending, error } = useGetCurrentUser()

  const isRefreshing = useSelector((state: RootState) => state.auth.isRefreshing)
  // const isAuthLoading = useSelector((state: RootState) => state.auth.authLoading)
  // const currentAuthUser = useSelector((state: RootState) => state.auth.currentUser)

  useEffect(() => {
    if (!isPending && !isRefreshing) {
      if (error?.message === "Authentication Invalid") {
        navigate("/login", { replace: true })
      } else if (!currentUser?.user) {
        navigate("/login", { replace: true })
      }
    }
  }, [currentUser, isPending, isRefreshing, error, navigate])

  useEffect(() => {
    if (currentUser?.user) {
      dispatch(setCurrentUser(currentUser))
    }
    if (error) {
      dispatch(setAuthError(error.message))
    }
  }, [currentUser, error, dispatch])

  return { currentUser, isPending, isRefreshing, error }
}